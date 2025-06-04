import { makeTheme } from "dripsy";

const colors = {
  background: "#FFFFFF",
  foreground: "#000000",
  primary: "#007AFF",
  primaryForeground: "#FFFFFF",
  secondary: "#E5E5E5",
  secondaryForeground: "#000000",
  success: "#34C759",
  warning: "#FFCC00",
  alert: "#FF3B30",
  border: "#D1D1D6",
  muted: "#F2F2F7",
  text: "#000000",
  card: "#FFFFFF",
};

const darkColors = {
  background: "#000000",
  foreground: "#FFFFFF",
  primary: "#0A84FF",
  primaryForeground: "#FFFFFF",
  secondary: "#2C2C2E",
  secondaryForeground: "#FFFFFF",
  success: "#30D158",
  warning: "#FFD60A",
  alert: "#FF453A",
  border: "#3A3A3C",
  muted: "#1C1C1E",
  text: "#FFFFFF",
  card: "#1C1C1E",
};

const space = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
};

const text = {
  h1: {
    fontSize: 32,
    fontWeight: "bold",
    color: "text",
  },
  h2: {
    fontSize: 24,
    fontWeight: "bold",
    color: "text",
  },
  body: {
    fontSize: 16,
    color: "text",
  },
  small: {
    fontSize: 14,
    color: "text",
  },
};

const theme = makeTheme({
  colors,
  space,
  text,
  types: {
    onlyAllowThemeValues: "always",
  },
});

const darkTheme = makeTheme({
  ...theme,
  colors: darkColors,
});

type MyTheme = typeof theme;
declare module "dripsy" {
  interface DripsyCustomTheme extends MyTheme {}
}

export { theme, darkTheme };
