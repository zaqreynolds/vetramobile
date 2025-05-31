import { useColorScheme } from "react-native";
import { DripsyProvider } from "dripsy";
import { theme } from "../theme";

export function Provider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();

  return (
    <DripsyProvider
      theme={theme}
      // Optional: you can pass a dark theme object
      // darkTheme={darkTheme}
    >
      {children}
    </DripsyProvider>
  );
}

export default Provider;
