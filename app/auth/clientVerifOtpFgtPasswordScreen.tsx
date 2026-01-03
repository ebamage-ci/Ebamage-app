import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";

import OtpInputs from "@/components/auth/OtpInputs";
import { CustomButton } from "@/components/global/CustomButton";

import { useOtpValidationClient } from "@/validations/useOtpValidationClient";

//
import useForgotPassword from "@/hooks/useForgotPassword";
import useVerifyOtpForgotPassword from "@/hooks/useVerifyOtpForgotPassword";

export default function ClientVerifOtpFgtPasswordScreen() {
  // verify otp
  const { mutate: verifyOtpForgotPassword, isPending: isVerifyOtpPending } =
    useVerifyOtpForgotPassword();

  const { mutate: resentOtp, isPending: isResentOtpPending } =
    useForgotPassword();

  const [otpValue, setOtpValue] = useState("");
  const { isValidOtp, otpError } = useOtpValidationClient(otpValue);

  // params
  const { email } = useLocalSearchParams() as { email: string };

  // Timer state
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Start timer on component mount
  useEffect(() => {
    startTimer();

    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Timer function
  const startTimer = () => {
    setCanResend(false);
    setTimeLeft(300); // Reset to 5 minutes

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // Timer finished
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          setCanResend(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  // Handle resend OTP
  const handleResendOtp = () => {
    if (!canResend || isResentOtpPending) return;
    if (canResend) {
      // resend otp
      resentOtp(
        { email },
        {
          onSuccess: () => {
            // restart the timer
            startTimer();
          },
          onError: (error) => {
            Alert.alert(
              "Erreur d'envoi",
              error?.message || "une erreur est survenue coté serveur",
              [
                {
                  text: "Retour",
                  style: "cancel",
                },
              ]
            );
          },
        }
      );
    }
  };

  const handleVerifOtp = () => {
    //--- invalidation
    if (!isValidOtp) {
      Alert.alert("Erreur de format", otpError, [
        {
          text: "Retour",
          // onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]);

      return;
    }

    // verify otp
    verifyOtpForgotPassword(
      {
        email: email,
        otp: otpValue,
      },
      {
        onSuccess: () => {
          setOtpValue("");
          router.push({
            pathname: "/auth/clientNewFgtPasswordScreen",
            params: {
              email,
            },
          });
        },

        onError: (error) => {
          Alert.alert(error?.message || "Erreur lors de la vérification");
        },
      }
    );
  };

  return (
    <View className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          className="flex-1 bg-white"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
          }}>
          <View className="bg-white flex-1 h-screen  p-4">
            <View className="justify-center items-center">
              <Text className="font-raleway-bold text-[30px]  leading-[43px]">
                Nous vous avons envoyé un code de vérification
              </Text>
            </View>

            {/** inputs form */}
            <View className="flex justify-center items-center">
              <View className="my-10">
                <OtpInputs onTextChange={setOtpValue} />
              </View>

              <View className="w-full items-center mt-2">
                <Text className="text-[18px] font-raleway-medium text-gray-300">
                  Vous pouvez demander un nouveau code de vérification dans{" "}
                  {formatTime(timeLeft)}
                </Text>

                <View className="flex-row  flex-wrap my-5">
                  <Text className="text-[14px] text-gray-500 font-raleway-regular mr-2">
                    Vous n&apos;avez rien reçu?
                  </Text>
                  <TouchableOpacity
                    onPress={handleResendOtp}
                    disabled={!canResend || isResentOtpPending}>
                    <Text
                      className={`text-[14px] underline font-raleway-bold ${
                        canResend ? "text-primary" : "text-gray-400"
                      }`}>
                      {isResentOtpPending ? "Renvoi..." : " Renvoyer le code"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="my-10">
              <CustomButton
                label={isVerifyOtpPending ? "Verification..." : "Verifier"}
                onPress={handleVerifOtp}
                disabled={isVerifyOtpPending}
              />
            </View>

            <View className="flex-row  flex-wrap">
              <Text className="text-[18px] text-gray-500 font-raleway-medium ">
                Ne communiquez ce code à personne pour la sécurité de votre
                compte.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
