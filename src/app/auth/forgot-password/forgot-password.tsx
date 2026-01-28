"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/types/auth";
import AuthLayout from "@/components/layout/AuthLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);

    try {
      // TODO: Implement actual API call
      console.log("Forgot password data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmittedEmail(data.email);
      setEmailSent(true);
    } catch (error) {
      console.error("Forgot password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAgain = () => {
    setEmailSent(false);
    setSubmittedEmail("");
    reset();
  };

  return (
    <AuthLayout showLogo showBackButton backHref="/auth/login">
      <div className="flex flex-col items-center gap-6">
        <AnimatePresence mode="wait">
          {!emailSent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="flex flex-col gap-2 items-center mb-8">
                <h1 className="text-4xl text-center font-semibold text-black">
                  Forgot Password?
                </h1>
                <p className="text-sm text-center text-gray-500 max-w-md mt-2">
                  No worries! Enter your email address and we'll send you a link
                  to reset your password.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <Input
                  label="Email"
                  type="email"
                  placeholder="your.email@example.com"
                  autoComplete="email"
                  error={errors.email?.message}
                  {...register("email")}
                />

                <Button type="submit" loading={isLoading} disabled={isLoading}>
                  Send Reset Link
                </Button>

                <Link
                  href="/auth/login"
                  className="text-sm text-center text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                >
                  ← Back to Sign in
                </Link>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center gap-6 py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
              >
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </motion.div>

              <div className="flex flex-col gap-2 items-center">
                <h2 className="text-3xl font-semibold text-black text-center">
                  Check your email
                </h2>
                <p className="text-sm text-center text-gray-500 max-w-md px-4">
                  We've sent a password reset link to{" "}
                  <span className="font-medium text-gray-900">
                    {submittedEmail}
                  </span>
                  . Please check your inbox and follow the instructions.
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full mt-4">
                <Button onClick={handleTryAgain} variant="outline">
                  Didn't receive the email?
                </Button>

                <Link
                  href="/auth/login"
                  className="text-sm text-center text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                >
                  ← Back to Sign in
                </Link>
              </div>

              <p className="text-xs text-center text-gray-400 max-w-sm mt-4">
                If you don't see the email, check your spam folder or try again
                with a different email address.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AuthLayout>
  );
}
