import React from "react";
import { Dimensions, KeyboardType, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  isPassword?: boolean;
  error?: boolean;
  disabled?: boolean;
  rightIcon?: string;
  onRightIconPress?: () => void;
  leftIcon?: string;
  onLeftIconPress?: () => void;
  style?: object;
  inputProps?: object;
  errorMsg?: string;
  onBlur?: () => void;
  keyboardType?: KeyboardType;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = "",
  isPassword = false,
  error = false,
  disabled = false,
  rightIcon,
  onRightIconPress,
  leftIcon,
  onLeftIconPress,
  errorMsg,
  onBlur,
  style = {},
  inputProps = {},
  keyboardType = "default",
}) => {
  return (
    <View>
      <TextInput
        keyboardType={keyboardType}
        label={label}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={isPassword}
        mode="outlined"
        disabled={disabled}
        error={error}
        placeholder={placeholder}
        selectionColor="#000"
        activeOutlineColor="#000"
        outlineColor="#000"
        placeholderTextColor="#676767"
        style={[styles.input, style]}
        right={
          rightIcon ? (
            <TextInput.Icon icon={rightIcon} onPress={onRightIconPress} />
          ) : undefined
        }
        left={
          leftIcon ? (
            <TextInput.Icon icon={leftIcon} onPress={onLeftIconPress} />
          ) : undefined
        }
        {...inputProps}
      />

      {error && errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: Dimensions.get("window").width - 30,
    margin: 10,
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    borderColor: "#A8A8A9",
    fontFamily: "Raleway-Medium",
    fontSize: 12,
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    fontFamily: "Raleway-Medium",
    marginLeft: 12,
    marginTop: -8,
  },
});

export default CustomInput;
