import { styled, useDripsyTheme } from "dripsy";
import { TextInput, useColorScheme } from "react-native";
import { darkTheme } from "theme";

const RawInput = styled(TextInput)();

export const ThemedTextInput = (props: any) => {
  const { theme } = useDripsyTheme();

  const colorScheme = useColorScheme();

  const textColor =
    colorScheme === "dark" ? darkTheme.colors.text : theme.colors.text;

  return (
    <RawInput
      {...props}
      style={[
        {
          color: textColor,
        },
        props.style,
      ]}
    />
  );
};
