import { Pressable, Text } from "react-native";
import { useDripsyTheme } from "dripsy";
import type { PressableProps, StyleProp, ViewStyle } from "react-native";
import { ReactNode } from "react";

type ThemedButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onPress?: () => void;
  style?:
    | StyleProp<ViewStyle>
    | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
} & Omit<PressableProps, "style">;

export const ThemedButton = ({
  children,
  onPress,
  style,
  variant = "primary",
  ...rest
}: ThemedButtonProps) => {
  const { theme } = useDripsyTheme();

  const backgroundColor =
    variant === "primary" ? theme.colors.primary : theme.colors.muted;

  const textColor =
    variant === "primary" ? theme.colors.background : theme.colors.text;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? theme.colors.muted : backgroundColor,
          paddingVertical: theme.space[3],
          paddingHorizontal: theme.space[4],
          borderRadius: theme.radii.md,
          alignItems: "center",
          justifyContent: "center",
        },
        typeof style === "function" ? style({ pressed }) : style,
      ]}
      {...rest}
    >
      <Text
        style={{
          color: theme.colors.text,
          fontSize: theme.fontSizes.md,
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
};
