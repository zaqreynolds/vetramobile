import { Link, Tabs } from "expo-router";
import { View, useDripsyTheme } from "dripsy";
import { Ionicons } from "@expo/vector-icons";
import { SafeArea } from "../../components/SafeArea";

export default function TabLayout() {
  const { theme } = useDripsyTheme();
  return (
    <SafeArea>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#007AFF",
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopColor: "#E5E5E5",
          },
          headerStyle: {
            backgroundColor: "#FFFFFF",
            borderBottomColor: "#E5E5E5",
          },
          headerTintColor: "#000000",
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
      </Tabs>
    </SafeArea>
  );
}
