import { Pressable, useDripsyTheme, View } from "dripsy";
import { Ionicons } from "@expo/vector-icons";

export const HeaderIcons = () => {
  const { theme } = useDripsyTheme();
  return (
    <View
      sx={{
        flexDirection: "row",
        gap: theme.space[2],
        marginRight: 4,
        // backgroundColor: "red",
      }}
    >
      <Pressable>
        <Ionicons name="notifications" size={24} color={theme.colors.text} />
      </Pressable>
      <Pressable>
        <Ionicons name="chatbox" size={24} color={theme.colors.text} />
      </Pressable>
    </View>
  );
};
