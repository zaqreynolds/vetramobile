import { View, Text } from "dripsy";
import { Alert } from "react-native";
import { ThemedButton } from "components/themed/ThemedButton";
import database from "database";
import { User } from "database/models/User";
import { UserService } from "database/services/User";
import { useUserStore } from "store/useUserStore";

const handleReset = async () => {
  try {
    await UserService.nukeAll();

    useUserStore.getState().clearUser();

    Alert.alert("Success", "Local user data reset.");
  } catch (error) {
    console.error("Reset error:", error);
    Alert.alert("Error", "Failed to reset user data.");
  }
};

const DeveloperScreen = () => (
  <View
    sx={{
      flex: 1,
      bg: "background",
      px: 4,
      py: 8,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text sx={{ fontSize: 24, fontWeight: "bold", mb: 4 }}>
      Developer Tools
    </Text>
    <ThemedButton onPress={handleReset} variant="secondary">
      Nuke All Users
    </ThemedButton>
  </View>
);

export default DeveloperScreen;
