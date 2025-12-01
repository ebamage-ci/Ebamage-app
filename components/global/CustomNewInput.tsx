import React, { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  containerClassName?: string;
  inputClassName?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  placeholder?: string;
  isError?: boolean;
  onRightPress?: () => void;
  onLeftPress?: () => void;
  errorMessage?: string;
  onBlur?: (e: any) => void;
  onFocus?: (e: any) => void;
  disabled?: boolean;
  mode?: TextInputProps["inputMode"];
  value?: string;
  onChangeText?: (text: string) => void;
};

export default function CustomNewInput({
  containerClassName,
  left,
  right,
  onRightPress,
  onLeftPress,
  placeholder,
  isError = false, // Changé à false par défaut
  errorMessage,
  onBlur,
  onFocus,
  disabled = false,
  mode = "text",
  value,
  onChangeText,
  inputClassName,
  ...props
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const borderColorClass = isError
    ? "border-[#EF4444]"
    : isFocused
    ? "border-[#108036]"
    : "border-[#E5E7EB]";

  return (
    <View className="w-full max-w-[400px]">
      {/* Container principal de l'input */}
      <View
        className={`bg-white flex-row w-full h-[62px] rounded-[16px] border-[1.2px] ${borderColorClass} px-[18px] items-center ${containerClassName}`}>
        {/* Icône gauche */}
        {left &&
          (onLeftPress ? (
            <Pressable
              onPress={onLeftPress}
              className="w-[24px] h-[24px] rounded-[4px] mr-3 justify-center items-center">
              {left}
            </Pressable>
          ) : (
            <View className="w-[24px] h-[24px] rounded-[4px] mr-3 justify-center items-center">
              {left}
            </View>
          ))}

        {/* Input */}
        <TextInput
          className={`flex-1 text-[16px]  text-black h-[52px] w-full ${inputClassName}`}
          style={{
            fontFamily: "Raleway-SemiBold",
          }}
          placeholder={placeholder}
          placeholderTextColor={"#999EA7"}
          multiline={false}
          numberOfLines={1}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          editable={!disabled}
          inputMode={mode}
          value={value}
          onChangeText={onChangeText}
          cursorColor={isError ? "#EF4444" : "#000"}
          {...props}
        />

        {/* Icône droite */}
        {right &&
          (onRightPress ? (
            <Pressable
              onPress={onRightPress}
              className="w-[24px] h-[24px] rounded-[4px] ml-3 justify-center items-center">
              {right}
            </Pressable>
          ) : (
            <View className="w-[24px] h-[24px] rounded-[4px] ml-3 justify-center items-center">
              {right}
            </View>
          ))}
      </View>

      {/* Message d'erreur */}
      {isError && errorMessage && (
        <Text className="text-[#EF4444] text-[12px] font-manrope mt-1 ml-1">
          {errorMessage}
        </Text>
      )}
    </View>
  );
}
