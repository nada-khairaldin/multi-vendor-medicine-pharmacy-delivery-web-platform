"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { loginSchema, type LoginFormData } from "@/types/auth";
import AuthLayout from "@/components/layout/AuthLayout";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import {
  AuthHeader,
  AuthDivider,
  SocialButton,
} from "@/components/auth/AuthComponents";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const password = watch("password");

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setGlobalError("");

    try {
      // TODO: Implement actual API call
      console.log("Login data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Simulate success - redirect to dashboard
      // router.push("/dashboard");
    } catch (error) {
      setGlobalError("Invalid email or password. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // TODO: Implement Google OAuth
  };

  return (
    <AuthLayout showLogo showBackButton={false}>
      <AuthHeader
        title="Sign in to your account"
        subtitle="Your trusted way to better health"
        className="mb-6"
      />

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
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

        <div className="flex flex-col gap-2">
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
            error={errors.password?.message}
            value={password}
            {...register("password")}
          />

          <div className="flex justify-end">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button type="submit" loading={isLoading} disabled={isLoading}>
          Sign in
        </Button>

        <AuthDivider />

        <SocialButton
          provider="google"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        />

        <p className="text-sm text-center mt-2">
          <span className="text-gray-600">Don't have an account? </span>
          <Link
            href="/auth/register"
            className="text-gray-900 font-medium hover:underline transition-colors"
          >
            Sign up
          </Link>
        </p>
      </motion.form>
    </AuthLayout>
  );
}
