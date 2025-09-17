import { Text, View } from "react-native";

const HeaderSetting = () => {
  return (
    <View className="bg-[#FDFDFD] p-5">
      <View className=" border-b-[1px]  border-b-[#C4C4C4]">
        <View className="flex-row justify-center items-center mb-3">
          {/** left */}
          <Text className="font-raleway-extra-bold text-[20px] text-black ">
            Paramètres
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderSetting;
