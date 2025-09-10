import { ReactNode } from "react";
import { GestureResponderEvent, Pressable, View } from "react-native";

type Props = {
  children: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
};

const CustomTabBarButton = ({ children, onPress }: Props) => {
  return (
    <View
      style={{
        top: -5,
        justifyContent: "center",
        alignItems: "center",
        // width: 70,
        // height: 70,
      }}>
      <Pressable
        onPress={onPress}
        android_ripple={{
          color: "#FFA3B3",
          radius: 35,
          foreground: true,
          borderless: true,
        }}>
        <View>{children}</View>
      </Pressable>
    </View>
  );
};

export default CustomTabBarButton;
