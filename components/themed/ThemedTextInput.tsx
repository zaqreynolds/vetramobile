import { styled, useDripsyTheme } from "dripsy";
import { forwardRef } from "react";
import { TextInput, TextInputProps, useColorScheme } from "react-native";
import { darkTheme } from "theme";
import type { Sx } from "dripsy";

const RawInput = styled(TextInput)();

type Props = TextInputProps & {
  sx?: Sx;
  error?: boolean;
};

export const ThemedTextInput = forwardRef<TextInput, Props>(
  ({ sx, style, error, ...props }, ref) => {
    const { theme } = useDripsyTheme();
    const colorScheme = useColorScheme();

    const textColor =
      colorScheme === "dark" ? darkTheme.colors.text : theme.colors.text;

    return (
      <RawInput
        ref={ref}
        {...props}
        sx={{
          ...sx,
          borderColor: error ? theme.colors.alert : theme.colors.border,
          color: textColor,
        }}
      />
    );
  }
);
