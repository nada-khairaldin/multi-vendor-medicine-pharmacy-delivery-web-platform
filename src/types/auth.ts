import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

// ===========================
// Form Validation Schemas
// ===========================

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .refine(
        (value) => {
          try {
            return isValidPhoneNumber(value);
          } catch {
            return false;
          }
        },
        { message: "Please enter a valid phone number" },
      ),
    agreedToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const otpSchema = z.object({
  code: z
    .string()
    .min(4, "Code must be at least 4 digits")
    .max(6, "Code must be at most 6 digits")
    .regex(/^\d+$/, "Code must contain only numbers"),
});

// ===========================
// TypeScript Types
// ===========================

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type OTPFormData = z.infer<typeof otpSchema>;

// ===========================
// Auth State Types
// ===========================

export type AuthStep = "form" | "emailVerify" | "phoneVerify" | "success";

export interface PasswordValidation {
  minLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export interface AuthError {
  field?: string;
  message: string;
  code?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    token?: string;
    user?: User;
  };
  error?: AuthError;
}

export interface User {
  id: string;
  email: string;
  phone?: string;
  name?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}

// ===========================
// OTP Types
// ===========================

export interface OTPConfig {
  length: 4 | 6;
  type: "email" | "phone";
  recipient: string;
}

export interface OTPState {
  code: string[];
  isComplete: boolean;
  isVerifying: boolean;
  error?: string;
}
