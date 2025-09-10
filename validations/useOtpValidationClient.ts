import * as z from "zod/v4";

const otpSchema = z
  .string()
  .trim()
  .length(4, "le code doit contenir 4 chiffres");

export const useOtpValidationClient = (otp: string) => {
  const { success: isValidOtp, error: otpError } = otpSchema.safeParse(otp);
  return {
    isValidOtp,
    otpError: otpError?.issues?.[0]?.message,
  };
};
