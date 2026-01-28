"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  registerSchema,
  type RegisterFormData,
  type AuthStep,
} from "@/types/auth";
import { useOTPInput } from "@/hooks/useOTPInput";
import { usePasswordValidation } from "@/hooks/usePasswordValidation";
import AuthLayout from "@/components/layout/AuthLayout";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { Button } from "@/components/ui/Button";
import { OTPInput } from "@/components/ui/OTPInput";
import {
  AuthHeader,
  AuthDivider,
  SocialButton,
  PasswordRequirements,
} from "@/components/auth/AuthComponents";

export default function Register() {
  const [currentStep, setCurrentStep] = useState<AuthStep>("form");
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const password = watch("password") || "";
  const confirmPassword = watch("confirmPassword") || "";
  const email = watch("email") || "";
  const validation = usePasswordValidation(password);

  // Email OTP
  const emailOTP = useOTPInput({
    length: 4,
    onComplete: handleEmailVerification,
    onResend: handleResendEmailCode,
  });

  // Phone OTP
  const phoneOTP = useOTPInput({
    length: 6,
    onComplete: handlePhoneVerification,
    onResend: handleResendPhoneCode,
  });

  const maskEmail = (email: string) => {
    const [username, domain] = email.split("@");
    if (!domain || username.length <= 3) return email;
    return `${username.substring(0, 3)}${"*".repeat(username.length - 3)}@${domain}`;
  };

  async function handleEmailVerification(code: string) {
    // TODO: Implement API call
    console.log("Email verification code:", code);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setCurrentStep("phoneVerify");
  }

  async function handlePhoneVerification(code: string) {
    // TODO: Implement API call
    console.log("Phone verification code:", code);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setCurrentStep("success");
    // Redirect after a short delay
    setTimeout(() => {
      window.location.href = "/auth/login?registered=true";
    }, 2000);
  }

  async function handleResendEmailCode() {
    // TODO: Implement API call
    console.log("Resending email code to:", userEmail);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  async function handleResendPhoneCode() {
    // TODO: Implement API call
    console.log("Resending phone code");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setGlobalError("");

    try {
      // TODO: Implement actual API call
      console.log("Register data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setUserEmail(data.email);
      setCurrentStep("emailVerify");
    } catch (error) {
      setGlobalError("Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    console.log("Google sign up clicked");
    // TODO: Implement Google OAuth
  };

  return (
    <AuthLayout
      showLogo={currentStep === "form"}
      showBackButton={currentStep !== "form"}
      onBack={() => {
        if (currentStep === "emailVerify") setCurrentStep("form");
        if (currentStep === "phoneVerify") setCurrentStep("emailVerify");
      }}
    >
      <AnimatePresence mode="wait">
        {currentStep === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <AuthHeader
              title="Create an account"
              subtitle="Your trusted way to better health"
              className="mb-6"
            />

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              {globalError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-sm text-red-600">{globalError}</p>
                </motion.div>
              )}

              <Input
                label="Email"
                type="email"
                placeholder="your.email@example.com"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
              />

              <PasswordInput
                label="Password"
                placeholder="Create a strong password"
                autoComplete="new-password"
                showStrength
                error={errors.password?.message}
                value={password}
                {...register("password")}
              />

              {password && !errors.password && (
                <PasswordRequirements
                  requirements={[
                    {
                      label: "At least 8 characters",
                      met: validation.minLength,
                    },
                    {
                      label: "One uppercase letter",
                      met: validation.hasUppercase,
                    },
                    { label: "One number", met: validation.hasNumber },
                    {
                      label: "One special character",
                      met: validation.hasSpecialChar,
                    },
                  ]}
                />
              )}

              <PasswordInput
                label="Confirm Password"
                placeholder="Re-enter your password"
                autoComplete="new-password"
                error={errors.confirmPassword?.message}
                value={confirmPassword}
                {...register("confirmPassword")}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    label="Phone Number"
                    placeholder="+1 (555) 123-4567"
                    error={errors.phone?.message}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    locale="en"
                  />
                )}
              />

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-5 h-5 mt-0.5 rounded border-gray-300 text-black focus:ring-black focus:ring-offset-0"
                  {...register("agreedToTerms")}
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link href="/terms" className="text-black hover:underline">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-black hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreedToTerms && (
                <p className="text-xs text-red-500 -mt-4">
                  {errors.agreedToTerms.message}
                </p>
              )}

              <Button type="submit" loading={isLoading} disabled={isLoading}>
                Sign up
              </Button>

              <AuthDivider />

              <SocialButton
                provider="google"
                onClick={handleGoogleSignUp}
                disabled={isLoading}
              />

              <p className="text-sm text-center mt-2">
                <span className="text-gray-600">Already have an account? </span>
                <Link
                  href="/auth/login"
                  className="text-gray-900 font-medium hover:underline transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </motion.div>
        )}

        {currentStep === "emailVerify" && (
          <motion.div
            key="emailVerify"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="flex flex-col gap-10 items-center">
              <div className="flex flex-col gap-3 items-center">
                <h2 className="text-3xl font-semibold text-black text-center">
                  Verify your email
                </h2>
                <p className="text-sm text-center text-gray-500 max-w-sm">
                  Enter the 4-digit code sent to{" "}
                  <span className="font-medium text-gray-900">
                    {userEmail ? maskEmail(userEmail) : maskEmail(email)}
                  </span>
                </p>
              </div>

              <OTPInput
                ref={emailOTP.otpRef}
                length={4}
                value={emailOTP.code}
                onChange={emailOTP.setCode}
                onComplete={emailOTP.handleComplete}
                error={emailOTP.error}
                disabled={emailOTP.isVerifying}
                autoFocus
              />

              {emailOTP.isVerifying && (
                <p className="text-sm text-gray-600">Verifying code...</p>
              )}

              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={emailOTP.handleResend}
                  disabled={!emailOTP.canResend}
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
                >
                  {emailOTP.canResend
                    ? "Resend code"
                    : `Resend code in ${emailOTP.countdown}s`}
                </button>
                <p className="text-xs text-gray-400">
                  Didn't receive the code? Check your spam folder
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === "phoneVerify" && (
          <motion.div
            key="phoneVerify"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="flex flex-col gap-10 items-center">
              <div className="flex flex-col gap-3 items-center">
                <h2 className="text-3xl font-semibold text-black text-center">
                  Verify your phone
                </h2>
                <p className="text-sm text-center text-gray-500 max-w-sm">
                  Enter the 6-digit code sent to your phone number
                </p>
              </div>

              <OTPInput
                ref={phoneOTP.otpRef}
                length={6}
                value={phoneOTP.code}
                onChange={phoneOTP.setCode}
                onComplete={phoneOTP.handleComplete}
                error={phoneOTP.error}
                disabled={phoneOTP.isVerifying}
                autoFocus
              />

              {phoneOTP.isVerifying && (
                <p className="text-sm text-gray-600">Verifying code...</p>
              )}

              <button
                type="button"
                onClick={phoneOTP.handleResend}
                disabled={!phoneOTP.canResend}
                className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
              >
                {phoneOTP.canResend
                  ? "Resend code"
                  : `Resend code in ${phoneOTP.countdown}s`}
              </button>
            </div>
          </motion.div>
        )}

        {currentStep === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center gap-6 py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center"
            >
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>

            <div className="flex flex-col gap-2 items-center">
              <h2 className="text-3xl font-semibold text-black text-center">
                Welcome to CureWay!
              </h2>
              <p className="text-sm text-center text-gray-500 max-w-md">
                Your account has been successfully created. Redirecting to
                login...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
