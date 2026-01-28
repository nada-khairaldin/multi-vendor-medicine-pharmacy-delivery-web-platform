"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { resetPasswordSchema, type ResetPasswordFormData } from "@/types/auth";
import { usePasswordValidation } from "@/hooks/usePasswordValidation";
import AuthLayout from "@/components/layout/AuthLayout";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { PasswordRequirements } from "@/components/auth/AuthComponents";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const password = watch("password") || "";
  const confirmPassword = watch("confirmPassword") || "";
  const validation = usePasswordValidation(password);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setGlobalError(
        "Invalid or missing reset token. Please request a new password reset link.",
      );
      return;
    }

    setIsLoading(true);
    setGlobalError("");

    try {
      // TODO: Implement actual API call with token
      console.log("Reset password data:", { ...data, token });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Redirect to login on success
      router.push("/auth/login?reset=success");
    } catch (error) {
      setGlobalError(
        "Failed to reset password. Please try again or request a new reset link.",
      );
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show error if no token
  if (!token) {
    return (
      <AuthLayout showLogo showBackButton backHref="/auth/forgot-password">
        <div className="flex flex-col items-center gap-6 py-8">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-black text-center">
            Invalid Reset Link
          </h2>
          <p className="text-sm text-center text-gray-500 max-w-md">
            This password reset link is invalid or has expired. Please request a
            new one.
          </p>
          <Button onClick={() => router.push("/auth/forgot-password")}>
            Request New Link
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      showLogo={false}
      showBackButton
      backHref="/auth/forgot-password"
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 items-center">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold text-black text-center"
          >
            Reset Password
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-center text-gray-500 max-w-md"
          >
            Please enter your new password below
          </motion.p>
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
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

          <PasswordInput
            label="New Password"
            placeholder="Enter your new password"
            autoComplete="new-password"
            showStrength
            error={errors.password?.message}
            value={password}
            {...register("password")}
          />

          {password && !errors.password && (
            <PasswordRequirements
              requirements={[
                { label: "At least 8 characters", met: validation.minLength },
                { label: "One uppercase letter", met: validation.hasUppercase },
                { label: "One number", met: validation.hasNumber },
                {
                  label: "One special character",
                  met: validation.hasSpecialChar,
                },
              ]}
            />
          )}

          <PasswordInput
            label="Confirm New Password"
            placeholder="Re-enter your new password"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            value={confirmPassword}
            {...register("confirmPassword")}
          />

          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading || !validation.isValid}
            className="mt-2"
          >
            Reset Password
          </Button>
        </motion.form>
      </div>
    </AuthLayout>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
