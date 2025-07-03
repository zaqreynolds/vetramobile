import { ThemedButton } from "components/themed/ThemedButton";
import { View, Text } from "dripsy";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useRef, useEffect } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

export default function CreateWorkout() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePress = useCallback(() => {
    console.log("Button pressed, attempting to present bottom sheet");
    bottomSheetModalRef.current?.present();
  }, []);
  return (
    <View
      sx={{
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background",
        // padding: 20,
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
      <ThemedButton onPress={handlePress}>
        <Ionicons name="add" size={24} />
      </ThemedButton>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={["50%"]}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: "white" }}
        handleIndicatorStyle={{ backgroundColor: "gray" }}
      >
        <BottomSheetView style={{ flex: 1, padding: 20 }}>
          <Text style={{ fontSize: 18, textAlign: "center", color: "red" }}>
            This will get added
          </Text>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}
