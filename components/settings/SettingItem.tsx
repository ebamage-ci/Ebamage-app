import { Text, TouchableOpacity, View } from "react-native";

type SettingItemProps = {
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
  nb_notifs?: number;
};

const SettingItem = ({ label, icon, onPress, nb_notifs }: SettingItemProps) => {
  return (
    <TouchableOpacity
      className="items-center flex-row min-h-[53px] w-full border-b-[0.5px] border-[#C4C4C4] gap-4 px-4"
      onPress={onPress}
      activeOpacity={0.5}>
      {icon}

      <View className="flex-1">
        <Text
          className={`font-raleway-semibold text-[20px] text-black  ${
            label === "Déconnexion" ? "color-primary-400" : ""
          }`}
          numberOfLines={1}
          ellipsizeMode="tail">
          {label}
        </Text>
      </View>

      {label === "Notifications" && (
        <View className="ml-auto justify-center items-center size-[25px] rounded-full bg-primary-400">
          <Text className="text-white font-raleway-bold text-[14px] leading-none">
            {nb_notifs || 0}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SettingItem;
