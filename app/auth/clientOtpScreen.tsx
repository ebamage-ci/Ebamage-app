import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";

import OtpInputs from "@/components/auth/OtpInputs";
import { CustomButton } from "@/components/global/CustomButton";

import { useClientResendOtp } from "@/hooks/useClientResendOtp";
import { useClientVerifOtp } from "@/hooks/useClientVerifOtp";
import { useOtpValidationClient } from "@/validations/useOtpValidationClient";

//
import { useAuthClientStore } from "@/stores/useAuthClient.store";

export default function ClientOtpScreen() {
  const [otpValue, setOtpValue] = useState("");
  const { isValidOtp, otpError } = useOtpValidationClient(otpValue);

  const { setIsConnected, setUser } = useAuthClientStore();

  // params
  const { email } = useLocalSearchParams() as { email: string };

  const { mutate, isPending } = useClientVerifOtp();
  const { mutate: mutateResendOtp, isPending: isResending } =
    useClientResendOtp();

  // Timer state
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | number | null>(null);

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
    if (canResend) {
      // resend otp
      mutateResendOtp(email, {
        onSuccess: () => {
          // restart the timer
          startTimer();
        },
        onError: (error) => {
          Alert.alert(
            "Erreur d'envoie",
            error?.message || "une erreur est survenue coté serveur",
            [
              {
                text: "Retour",
                style: "cancel",
              },
            ]
          );
        },
      });
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

    const data = {
      email_clt: email,
      code_otp: otpValue,
    };

    //--- validation
    mutate(data, {
      onSuccess: (data) => {
        // storage store
        setIsConnected(true);
        setUser({
          email_clt: data.data.email_clt,
          hashid_clt: data.data.hashid_clt,
          nom_clt: data.data.nom_clt,
          solde_tdl: data.data.solde_tdl,
          tel_clt: data.data.tel_clt,
          token: data?.token,
        });
      },

      onError: (error) => {
        Alert.alert(
          "Erreur de code",
          error?.message || "une erreur est survenue coté serveur",
          [
            {
              text: "Retour",
              style: "cancel",
            },
          ]
        );
      },
    });
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
                    disabled={!canResend}>
                    <Text
                      className={`text-[14px] underline font-raleway-bold ${
                        canResend ? "text-primary" : "text-gray-400"
                      }`}>
                      {isResending ? "Renvoi..." : " Renvoyer le code"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="my-10">
              <CustomButton
                label={isPending ? "Verification..." : "Verifier"}
                onPress={handleVerifOtp}
                disabled={isPending}
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
