// components/ThemedDatePicker.tsx
import { Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Text, View } from "dripsy";
import { theme } from "theme";

type Props = {
  label?: string;
  value: Date | null;
  onChange: (date: Date) => void;
};

export const ThemedDatePicker = ({ label, value, onChange }: Props) => {
  const [show, setShow] = useState(false);

  const handleChange = (_: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) onChange(selectedDate);
  };

  return (
    <View sx={{ my: 3 }}>
      {label && <Text sx={{ mb: 1 }}>{label}</Text>}

      {Platform.OS === "ios" ? (
        <View
          style={{
            height: 180, // adjust as needed
            overflow: "hidden",
            alignItems: "center", // centers the spinner horizontally
            justifyContent: "center", // optional: centers it vertically in the reduced space
          }}
        >
          <DateTimePicker
            value={value ?? new Date()}
            mode="date"
            display="spinner"
            onChange={handleChange}
            style={{
              width: "100%",
            }}
            maximumDate={new Date()}
            minimumDate={new Date(1900, 1, 1)}
          />
        </View>
      ) : (
        <>
          <Button
            title={value?.toDateString() || "Select Date"}
            onPress={() => setShow(true)}
          />
          {show && (
            <DateTimePicker
              value={value ?? new Date()}
              mode="date"
              display="default"
              onChange={handleChange}
            />
          )}
        </>
      )}
    </View>
  );
};
