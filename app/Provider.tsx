import { DripsyProvider } from "dripsy";
import { useColorScheme } from "react-native";
import { theme, darkTheme } from "../theme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export function Provider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();

  return (
    <DripsyProvider theme={colorScheme === "dark" ? darkTheme : theme}>
      <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
    </DripsyProvider>
  );
}

export default Provider;
