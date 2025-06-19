import { Link, Tabs } from "expo-router";
import { View, useDripsyTheme } from "dripsy";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { HeaderIcons } from "components/HeaderIcons";
import { HeaderLeft } from "components/HeaderLeft";

export default function TabLayout() {
  const { theme } = useDripsyTheme();
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";
  const tabBarBg = isDark ? theme.colors.background : "#FFFFFF";
  const tabBarBorder = isDark ? theme.colors.border : "#E5E5E5";
  const tabBarActive = isDark ? theme.colors.primary : "#007AFF";
  const tabBarInactive = isDark ? theme.colors.foreground : "#000000";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tabBarActive,
        tabBarInactiveTintColor: tabBarInactive,
        tabBarStyle: {
          backgroundColor: tabBarBg,
          borderTopColor: tabBarBorder,
        },
        headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderIcons />,
        headerStyle: {
          backgroundColor: tabBarBg,
          borderBottomColor: tabBarBorder,
        },
        headerTintColor: tabBarInactive,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dev"
        options={{
          title: "Dev",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
