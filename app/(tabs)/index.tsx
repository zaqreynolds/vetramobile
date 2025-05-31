import { View, Text } from "dripsy";

export default function HomeScreen() {
  return (
    <View
      sx={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        bg: "$background",
        px: "$10",
      }}
    >
      <Text
        sx={{
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Welcome to Vetra
      </Text>
    </View>
  );
}
