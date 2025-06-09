import { View, Text, Pressable } from "dripsy";
import { useDripsyTheme } from "dripsy";
import { forwardRef } from "react";
import type { View as RNView } from "react-native";

type Option = {
  label: string;
  value: string;
};

type ThemedRadioGroupProps = {
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  label?: string;
  error?: boolean;
};

export const ThemedRadioGroup = forwardRef<RNView, ThemedRadioGroupProps>(
  ({ options, value, onChange, label, error }, ref) => {
    const { theme } = useDripsyTheme();

    return (
      <View ref={ref} sx={{ mb: 3 }}>
        {label && <Text sx={{ mb: 2, color: "text" }}>{label}</Text>}
        {options.map((option) => {
          const isSelected = option.value === value;

          return (
            <Pressable
              key={option.value}
              onPress={() => onChange(option.value)}
              sx={{
                flexDirection: "row",
                alignItems: "center",
                mb: 2,
              }}
            >
              <View
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: 999,
                  borderWidth: 2,
                  borderColor: error ? theme.colors.alert : theme.colors.text,
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                }}
              >
                {isSelected && (
                  <View
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: 999,
                      backgroundColor: theme.colors.text,
                    }}
                  />
                )}
              </View>
              <Text
                sx={{ color: error ? theme.colors.alert : theme.colors.text }}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  }
);
