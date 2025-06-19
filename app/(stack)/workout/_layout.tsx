import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useDripsyTheme } from "dripsy";
import { useColorScheme } from "react-native";

export default function WorkoutLayout() {
  const router = useRouter();
  const { theme } = useDripsyTheme();
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";
  const headerBg = isDark ? theme.colors.background : "#FFFFFF";
  const headerText = isDark ? theme.colors.foreground : "#000000";

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: headerBg,
        },
        headerTintColor: headerText,
      }}
    >
      <Stack.Screen
        name="create"
        options={{
          title: "Create Workout",
          presentation: "modal",
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color={theme.colors.primary}
              onPress={() => router.back()}
              style={{ marginLeft: 16 }}
            />
          ),
        }}
      />
    </Stack>
  );
}
