"use client";

import { useMemo } from "react";

export interface PasswordValidation {
  minLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  isValid: boolean;
}

export function usePasswordValidation(password: string): PasswordValidation {
  return useMemo(() => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValid = minLength && hasUppercase && hasNumber && hasSpecialChar;

    return {
      minLength,
      hasUppercase,
      hasNumber,
      hasSpecialChar,
      isValid,
    };
  }, [password]);
}
