import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Text, View } from "react-native";

interface CustomSelectProps {
  label?: string;
  datas: { label: string; value: string }[];
  selectedValue: string;
  onValueChange: (value: string, index?: number) => void;

  defaultLabel?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  datas,
  selectedValue,
  onValueChange,

  defaultLabel,
}) => {
  return (
    <View className="my-4">
      {label && (
        <Text className="text-xl font-raleway-semibold mb-1">{label}</Text>
      )}
      <View className="border border-[#9F9F9F] rounded-lg overflow-hidden bg-white">
        <Picker
          style={{
            color: "#9F9F9F",
            height: 55,
          }}
          mode="dialog"
          dropdownIconColor="black"
          //   prompt={label ? "Selection de " + label : "Sélectionnez une option"}
          selectedValue={selectedValue}
          onValueChange={(value, index?) => onValueChange(value, index)}>
          <Picker.Item
            label={defaultLabel}
            value={"empty"}
            enabled={false}
            fontFamily="Raleway"
          />
          {datas.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
              fontFamily="Raleway-Medium"
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default CustomSelect;
