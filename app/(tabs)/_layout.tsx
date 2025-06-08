import { Link, Tabs } from "expo-router";
import { View, useDripsyTheme } from "dripsy";
import { Ionicons } from "@expo/vector-icons";
import { SafeArea } from "../../components/SafeArea";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const { theme } = useDripsyTheme();
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";
  const tabBarBg = isDark ? theme.colors.background : "#FFFFFF";
  const tabBarBorder = isDark ? theme.colors.border : "#E5E5E5";
  const tabBarActive = isDark ? theme.colors.primary : "#007AFF";
  const tabBarInactive = isDark ? theme.colors.foreground : "#000000";

  return (
    <SafeArea>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: tabBarActive,
          tabBarInactiveTintColor: tabBarInactive,
          tabBarStyle: {
            backgroundColor: tabBarBg,
            borderTopColor: tabBarBorder,
          },
          headerStyle: {
            backgroundColor: tabBarBg,
            borderBottomColor: tabBarBorder,
          },
          headerTintColor: tabBarInactive,
          header: () => null,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: "Tab Two",
            tabBarIcon: ({ color }) => (
              <Ionicons name="settings" size={24} color={color} />
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
    </SafeArea>
  );
}
