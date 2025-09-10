import { Tabs } from "expo-router";

import CustomTabBarButtonIcon from "@/components/global/CustomTabBarButtonIcon";
import TabIcon from "@/components/global/TabIcon";
import HeaderIndex from "@/components/index/HeaderIndex";
import icons from "@/constants/icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        animation: "shift",
        // headerShown: false,
        tabBarShowLabel: false,
        // tabBarLabel: "acc",

        // tabBarBackground:'',
        tabBarStyle: {
          height: 80,
          paddingBottom: 0,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#F0F0F0",
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarHideOnKeyboard: true,
          // headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.hometab} label="accueil" />
          ),
          tabBarButton: (props) => <CustomTabBarButtonIcon {...props} />,

          header: () => {
            return <HeaderIndex />;
          },
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Panier",
          tabBarHideOnKeyboard: true,

          headerShown: false,

          tabBarButton: (props) => <CustomTabBarButtonIcon {...props} />,

          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.carttab} label="Panier" />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "settings",
          tabBarHideOnKeyboard: true,
          tabBarButton: (props) => <CustomTabBarButtonIcon {...props} />,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.settingstab}
              label="parametres"
            />
          ),
        }}
      />
    </Tabs>
  );
}
