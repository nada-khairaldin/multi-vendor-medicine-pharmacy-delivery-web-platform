"use client";

import { InputHTMLAttributes, forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export interface PasswordInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  error?: string;
  helperText?: string;
  showStrength?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label = "Password",
      error,
      helperText,
      showStrength = false,
      className = "",
      value,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const calculateStrength = (password: string): number => {
      if (!password) return 0;
      let strength = 0;
      if (password.length >= 8) strength += 25;
      if (/[a-z]/.test(password)) strength += 25;
      if (/[A-Z]/.test(password)) strength += 25;
      if (/[0-9]/.test(password)) strength += 15;
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 10;
      return Math.min(strength, 100);
    };

    const strength = showStrength
      ? calculateStrength((value as string) || "")
      : 0;
    const strengthColor =
      strength < 40
        ? "bg-red-500"
        : strength < 70
          ? "bg-yellow-500"
          : "bg-green-500";
    const strengthLabel =
      strength < 40 ? "Weak" : strength < 70 ? "Medium" : "Strong";

    return (
      <div className="flex flex-col gap-1">
        <div
          className={`flex flex-col h-15.25 justify-center gap-2 px-4 py-2 bg-white rounded-md border transition-colors ${
            error
              ? "border-red-500 focus-within:border-red-600"
              : "border-black focus-within:border-gray-600"
          } ${className}`}
        >
          {label && (
            <label className="text-sm font-medium text-black">{label}</label>
          )}
          <div className="flex items-center justify-between gap-2">
            <input
              ref={ref}
              type={showPassword ? "text" : "password"}
              value={value || ""}
              className="flex-1 text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
              {...props}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {showStrength && value && !error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-1"
          >
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${strength}%` }}
                transition={{ duration: 0.3 }}
                className={`h-full ${strengthColor} rounded-full`}
              />
            </div>
            <span className="text-xs text-gray-600 min-w-16">
              {strengthLabel}
            </span>
          </motion.div>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs text-red-500 px-1"
          >
            {error}
          </motion.p>
        )}
        {helperText && !error && (
          <p className="text-xs text-gray-500 px-1">{helperText}</p>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
