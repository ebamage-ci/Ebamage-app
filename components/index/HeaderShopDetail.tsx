import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { Share, Text, TouchableOpacity, View } from "react-native";

type HeaderShopDetailProps = {
  keyword?: string;
  share_link?: string;
};

const HeaderShopDetail = ({
  keyword = "Détail boutique",
  share_link,
}: HeaderShopDetailProps) => {
  const handleShare = async () => {
    if (!share_link) return;
    await Share.share({
      message: share_link,
    });
  };

  return (
    <View className="bg-[#F9F9F9] p-5">
      <View className="flex-row justify-between items-center">
        {/** left */}
        <View className="flex-row justify-center items-center gap-6">
          <TouchableOpacity
            onPress={() =>
              router.canGoBack() ? router.back() : router.replace("/")
            }>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="font-raleway-semibold text-[20px]">{keyword}</Text>
        </View>

        {/** right */}
        {share_link && (
          <View className="justify-center items-center">
            <TouchableOpacity
              className="bg-[#F2F2F2] rounded-full p-2"
              onPress={handleShare}>
              <MaterialCommunityIcons
                name="share-outline"
                size={24}
                color="#108036"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default HeaderShopDetail;
