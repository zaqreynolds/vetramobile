import { Switch, useColorScheme } from "react-native";
import { darkTheme, theme } from "theme";

export const ThemedToggle = ({ value, onValueChange }) => {
  const colorScheme = useColorScheme();
  const trackColor =
    colorScheme === "dark" ? darkTheme.colors.border : theme.colors.border;
  const thumbColor =
    colorScheme === "dark" ? darkTheme.colors.primary : theme.colors.primary;

  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{
        false: theme.colors.border,
        true: theme.colors.primary,
      }}
      thumbColor={
        value ? theme.colors.primaryForeground : theme.colors.foreground
      }
    />
  );
};
