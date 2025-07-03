import { ThemedButton } from "components/themed/ThemedButton";
import { View, Text } from "dripsy";
import { Ionicons } from "@expo/vector-icons";

export default function CreateWorkout() {
  return (
    <View
      sx={{
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background",
        padding: 20,
      }}
    >
      <ThemedButton>
        <Ionicons name="add" size={24} />
      </ThemedButton>
    </View>
  );
}
