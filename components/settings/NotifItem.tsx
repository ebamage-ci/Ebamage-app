import NotifIcon from "@/assets/svgs/NotifIcon";
import { INotif } from "@/types/notifClient.type";
import { formatDate } from "@/utils/formatDate";
import { Text, View } from "react-native";

const NotifItem = ({ notif }: { notif: INotif }) => {
  const { title, message, created_at } = notif;

  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB", // gris clair
      }}
      className="flex flex-row justify-between">
      {/* Zone gauche */}
      <View className="flex flex-row gap-3 flex-1">
        <NotifIcon width={24} height={24} stroke={"#1A1A1A"} fill={"#1A1A1A"} />
        <View className="flex-1">
          {/* Titre + Date */}
          <View className="flex flex-row justify-between items-center">
            <Text className="font-raleway-bold text-[15px]">{title}</Text>
            <Text className="text-[#777E90] text-[12px]">
              {formatDate(created_at)}
              {/* 12/05/2023 */}
            </Text>
          </View>

          {/* Corps */}
          <Text className="text-[#555] font-raleway text-[13px] mt-1">
            {message}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NotifItem;
