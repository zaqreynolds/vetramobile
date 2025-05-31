import { makeTheme } from "dripsy";

const colors = {
  $background: "#FFFFFF",
  $foreground: "#000000",
  $primary: "#007AFF",
  $text: "#000000",
  $lightGray: "#E5E5E5",
  $red: "#FF3B30",
  $blue: "#007AFF",

  // Dark mode colors
  $backgroundDark: "#000000",
  $foregroundDark: "#FFFFFF",
  $textDark: "#FFFFFF",
};

const space = {
  $0: 0,
  $1: 4,
  $2: 8,
  $3: 12,
  $4: 16,
  $5: 20,
  $6: 24,
  $8: 32,
  $10: 40,
  $12: 48,
  $16: 64,
};

const theme = makeTheme({
  // Dripsy theme object
  colors,
  space,
  types: {
    onlyAllowThemeValues: "always",
  },
  // Text variants
  text: {
    h1: {
      fontSize: 32,
      fontWeight: "bold",
    },
    h2: {
      fontSize: 24,
      fontWeight: "bold",
    },
    body: {
      fontSize: 16,
    },
    small: {
      fontSize: 14,
    },
  },
  // Custom spacing scale
  customSpace: {
    small: 8,
    medium: 16,
    large: 24,
  },
});

type MyTheme = typeof theme;
declare module "dripsy" {
  interface DripsyCustomTheme extends MyTheme {}
}

export { theme };
