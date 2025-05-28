import { H2, YStack } from "tamagui";

export default function HomeScreen() {
  return (
    <YStack flex={1} items="center" gap="$8" px="$10" bg="$background">
      <H2>Welcome to Vetra</H2>
    </YStack>
  );
}
