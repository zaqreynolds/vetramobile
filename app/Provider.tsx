import { DripsyProvider } from "dripsy";
import { useColorScheme } from "react-native";
import { theme, darkTheme } from "../theme";

export function Provider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();

  return (
    <DripsyProvider theme={colorScheme === "dark" ? darkTheme : theme}>
      {children}
    </DripsyProvider>
  );
}

export default Provider;
