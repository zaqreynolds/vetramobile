import { View, Text } from "dripsy";

export default function CreateWorkout() {
  return (
    <View
      sx={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background",
        padding: 20,
      }}
    >
      <Text
        sx={{
          fontSize: 24,
          fontWeight: "bold",
          color: "text",
          marginBottom: 20,
        }}
      >
        Create Workout
      </Text>
      <Text sx={{ color: "text", textAlign: "center" }}>
        This is where you'll create your workout
      </Text>
    </View>
  );
}
