"use client";

import { useState, useCallback, useRef } from "react";
import { OTPInputRef } from "@/components/ui/OTPInput";

export interface UseOTPInputOptions {
  length: 4 | 6;
  onComplete?: (code: string) => Promise<void> | void;
  onResend?: () => Promise<void> | void;
}

export function useOTPInput({
  length,
  onComplete,
  onResend,
}: UseOTPInputOptions) {
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string>("");
  const [canResend, setCanResend] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const otpRef = useRef<OTPInputRef>(null);

  const handleComplete = useCallback(
    async (completedCode: string) => {
      if (onComplete && !isVerifying) {
        setIsVerifying(true);
        setError("");
        try {
          await onComplete(completedCode);
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : "Verification failed. Please try again.",
          );
          // Clear the OTP on error
          setTimeout(() => {
            otpRef.current?.clear();
          }, 1000);
        } finally {
          setIsVerifying(false);
        }
      }
    },
    [onComplete, isVerifying],
  );

  const handleResend = useCallback(async () => {
    if (!canResend || !onResend) return;

    setCanResend(false);
    setError("");
    setCode(Array(length).fill(""));

    try {
      await onResend();
      // Start 60 second countdown
      setCountdown(60);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to resend code. Please try again.",
      );
      setCanResend(true);
    }
  }, [canResend, onResend, length]);

  const reset = useCallback(() => {
    setCode(Array(length).fill(""));
    setError("");
    setIsVerifying(false);
    otpRef.current?.focus();
  }, [length]);

  return {
    code,
    setCode,
    isVerifying,
    error,
    setError,
    canResend,
    countdown,
    handleComplete,
    handleResend,
    reset,
    otpRef,
  };
}
