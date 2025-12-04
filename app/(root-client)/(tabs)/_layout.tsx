import { Tabs } from "expo-router";

import { useAuthClientStore } from "@/stores/useAuthClient.store";

import CustomTabBarButtonIcon from "@/components/global/CustomTabBarButtonIcon";
import TabIcon from "@/components/global/TabIcon";
import HeaderIndex from "@/components/index/HeaderIndex";
import HeaderSetting from "@/components/settings/HeaderSetting";
import icons from "@/constants/icons";

export default function TabsLayout() {
  const { isConnected: isClientConnected } = useAuthClientStore();

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
            <TabIcon
              focused={focused}
              icon={icons.hometab}
              label="accueil"
              iconFocused={icons.hometabFocused}
            />
          ),
          tabBarButton: (props) => <CustomTabBarButtonIcon {...props} />,

          header: () => {
            return <HeaderIndex />;
          },
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          tabBarHideOnKeyboard: true,
          // headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.shoptab}
              label="boutiques"
              iconFocused={icons.shoptab}
            />
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
            <TabIcon
              focused={focused}
              icon={icons.carttab}
              label="Panier"
              iconFocused={icons.carttabFocused}
            />
          ),
        }}
      />

      <Tabs.Protected guard={isClientConnected}>
        <Tabs.Screen
          name="settings"
          options={{
            title: "settings",
            tabBarHideOnKeyboard: true,
            tabBarButton: (props) => <CustomTabBarButtonIcon {...props} />,
            // headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                icon={icons.settingstab}
                label="parametres"
                iconFocused={icons.settingstabFocused}
              />
            ),
            header: () => {
              return <HeaderSetting />;
            },
          }}
        />
      </Tabs.Protected>
    </Tabs>
  );
}
