import { Image, ImageSourcePropType, Text, View } from "react-native";

type TabIconProps = {
  focused: boolean;
  icon: ImageSourcePropType;
  label: string;
  iconFocused?: ImageSourcePropType;
};

const TabIcon = ({ focused, icon, iconFocused, label }: TabIconProps) => {
  return (
    <View className="flex-1 self-center  h-full  flex-col items-center">
      <View
        // style={
        //   label === "cart" && !focused
        //     ? {
        //         shadowColor: "#000",
        //         shadowOffset: { width: 0, height: 2 },
        //         shadowOpacity: 0.25,
        //         shadowRadius: 3.84,
        //         elevation: 5,
        //       }
        //     : {}
        // }
        className={`items-center ${
          label === "cart"
            ? ` p-2 rounded-full absolute z-10 -bottom-5 h-[65px] w-[65px] justify-center ${
                focused ? "bg-primary" : "border border-gray-50 bg-white"
              }`
            : `${focused ? "" : ""}`
        }`}>
        <Image
          source={focused ? iconFocused : icon}
          resizeMode="contain"
          className="size-6"
          tintColor={
            label === "cart" && focused ? "#FFF" : focused ? "#108036" : "#000"
          }
        />

        {label !== "cart" && (
          <Text
            className={`text-xs w-full text-center mt-1 font-raleway-medium ${
              focused ? "text-primary" : "text-[#000]"
            }`}>
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </Text>
        )}
      </View>
    </View>
  );
};

export default TabIcon;
