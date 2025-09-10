import { ReactNode } from "react";
import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";

type Props = {
  children: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
};

const CustomTabBarButtonIcon = ({ children, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: "#A7E5BE",
        radius: 35,
        foreground: true,
        borderless: true,
      }}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      {children}
    </Pressable>
  );
};

export default CustomTabBarButtonIcon;

const styles = StyleSheet.create({});
