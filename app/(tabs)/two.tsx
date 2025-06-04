import { View, Text } from "dripsy";

export default function TabTwoScreen() {
  return (
    <View
      sx={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        bg: "background",
      }}
    >
      <Text
        sx={{
          fontSize: 20,
          color: "blue",
        }}
      >
        Tab Two
      </Text>
    </View>
  );
}
