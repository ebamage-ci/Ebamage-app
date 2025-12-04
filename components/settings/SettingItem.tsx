import ArrowRight from "@/assets/svgs/ArrowRightIcon";
import { Text, TouchableOpacity, View } from "react-native";

type SettingItemProps = {
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
};

const SettingItem = ({ label, icon, onPress }: SettingItemProps) => {
  return (
    <TouchableOpacity
      className={`items-center flex-row min-h-[53px] w-full  gap-4 px-4 ${
        label !== "Déconnexion" ? "border-b-[0.5px] border-[#C4C4C4]" : ""
      }`}
      onPress={onPress}
      activeOpacity={0.5}>
      {icon}

      <View className="flex-1">
        <Text
          className={`font-raleway-semibold text-[18px] text-[#33302E]  ${
            label === "Déconnexion" ? "color-[#ED1010]" : ""
          }`}
          numberOfLines={1}
          ellipsizeMode="tail">
          {label}
        </Text>
      </View>

      {label !== "Déconnexion" && label !== "Supprimer mon compte" && (
        <View>
          <ArrowRight />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SettingItem;
