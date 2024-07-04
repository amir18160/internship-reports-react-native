interface ColorGroup {
  [key: number | string]: string;
}

interface ColorPalette {
  primary: ColorGroup;
  accent: ColorGroup;
  red: ColorGroup;
  emerald: ColorGroup;
  white: string;
  slateGrey: ColorGroup;
}

const colors: ColorPalette = {
  primary: {
    50: "#E1E8EF",
    100: "#D4DEE7",
    200: "#B7C7D7",
    300: "#99B0C7",
    400: "#7C99B6",
    500: "#5E82A6",
    600: "#4C6B8A",
    700: "#3C546C",
    800: "#2C3D4F",
    900: "#1B2631",
    950: "#141C24",
  },
  accent: {
    placeholder: "#e5c39763",
    50: "#FAF5F0",
    100: "#F4ECE1",
    200: "#E8D6BF",
    300: "#DDC2A2",
    400: "#D2AF84",
    500: "#C69963",
    600: "#B78343",
    700: "#926835",
    800: "#6C4D28",
    900: "#4B351B",
    950: "#382814",
  },
  white: "#fff",
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a",
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22",
  },
  slateGrey: {
    50: "#e1e8ea",
    100: "#c3d1d4",
    200: "#a4babe",
    300: "#86a3a8",
    400: "#688c92",
    500: "#4a757c",
    600: "#395e66",
    700: "#2c474f",
    800: "#1d3039",
    900: "#0e1923",
    950: "#070c11",
  },
};

export default colors;
