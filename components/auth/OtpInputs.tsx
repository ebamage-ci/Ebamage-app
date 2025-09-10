import { StyleSheet } from "react-native";
import { OtpInput } from "react-native-otp-entry";

type OtpInputsProps = {
  onTextChange: (text: string) => void;
  onFilled?: (text: string) => void;
};

export default function OtpInputs({ onTextChange, onFilled }: OtpInputsProps) {
  return (
    <OtpInput
      numberOfDigits={4}
      focusColor="#F83758"
      autoFocus={false}
      hideStick={true}
      // placeholder="******"
      blurOnFilled={true}
      disabled={false}
      type="numeric"
      secureTextEntry={false}
      focusStickBlinkingDuration={500}
      // onFocus={() => console.log("Focused")}
      // onBlur={() => console.log("Blurred")}
      onTextChange={onTextChange}
      onFilled={onFilled}
      textInputProps={{
        accessibilityLabel: "One-Time Password",
      }}
      textProps={{
        accessibilityRole: "text",
        accessibilityLabel: "OTP digit",
        allowFontScaling: false,
      }}
      theme={{
        // containerStyle: styles.container,
        pinCodeContainerStyle: styles.pinCodeContainer,
        pinCodeTextStyle: styles.pinCodeText,
        // focusStickStyle: styles.focusStick,
        // focusedPinCodeContainerStyle: styles.activePinCodeContainer,
        // placeholderTextStyle: styles.placeholderText,
        // filledPinCodeContainerStyle: styles.filledPinCodeContainer,
        // disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
      }}
    />
  );
}

const styles = StyleSheet.create({
  pinCodeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#757575",
  },

  pinCodeContainer: {
    width: 63,
    height: 65,
    borderRadius: 15,
    borderWidth: 1.8,
    borderColor: "#DDDDDD",
  },
});
