import { Text, TouchableOpacity } from "react-native";

type CustomButtonProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
};

export const CustomButton = ({
  label,
  onPress,
  disabled,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      className={`h-[55px] w-full  rounded-[4px] justify-center items-center ${
        disabled ? "bg-primary-200" : "bg-primary"
      }`}
      onPress={onPress}>
      <Text
        className={`text-white text-[20px] font-raleway-semibold text-center `}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
