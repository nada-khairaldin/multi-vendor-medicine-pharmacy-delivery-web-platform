"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export interface PasswordRequirement {
  label: string;
  met: boolean;
}

export interface PasswordRequirementsProps {
  requirements: PasswordRequirement[];
}

export function PasswordRequirements({
  requirements,
}: PasswordRequirementsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg"
    >
      <p className="text-xs font-medium text-gray-700 mb-1">
        Password must contain:
      </p>
      {requirements.map((req, index) => (
        <motion.div
          key={req.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex items-center gap-2"
        >
          <div
            className={`flex items-center justify-center w-4 h-4 rounded-full transition-colors ${
              req.met ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            {req.met && <Check className="w-3 h-3 text-white" />}
          </div>
          <span
            className={`text-xs ${req.met ? "text-green-700" : "text-gray-600"}`}
          >
            {req.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

export interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function AuthHeader({
  title,
  subtitle,
  className = "",
}: AuthHeaderProps) {
  return (
    <div className={`flex flex-col gap-2 items-center ${className}`}>
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl text-center font-semibold text-black"
      >
        Welcome To <span className="font-bold">CureWay</span>
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-center text-gray-500"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-medium text-gray-600 text-center mt-2"
      >
        {title}
      </motion.h2>
    </div>
  );
}

export interface AuthDividerProps {
  text?: string;
}

export function AuthDivider({ text = "or" }: AuthDividerProps) {
  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex-1 h-px bg-gray-300" />
      <span className="text-sm text-gray-500 uppercase">{text}</span>
      <div className="flex-1 h-px bg-gray-300" />
    </div>
  );
}

export interface SocialButtonProps {
  provider: "google" | "facebook" | "apple";
  onClick?: () => void;
  disabled?: boolean;
}

export function SocialButton({
  provider,
  onClick,
  disabled = false,
}: SocialButtonProps) {
  const icons = {
    google: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    ),
    facebook: <div className="w-5 h-5 bg-blue-600 rounded" />,
    apple: <div className="w-5 h-5 bg-black rounded" />,
  };

  const labels = {
    google: "Continue with Google",
    facebook: "Continue with Facebook",
    apple: "Continue with Apple",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center gap-3 w-full h-12 px-6 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {icons[provider]}
      <span className="text-sm font-medium text-gray-900">
        {labels[provider]}
      </span>
    </button>
  );
}
