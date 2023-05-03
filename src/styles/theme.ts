import { type DefaultTheme } from "styled-components";
import { palettes } from "./palettes";
import { createVariants } from "./variants";

export const theme: DefaultTheme = {
  /**
   * Paleta kolorów
   */
  palette: palettes.light,
  /**
   * Odległości
   */
  spacing: {
    xs: "2px",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "20px",
    "3xl": "24px",
  },

  /**
   * Czcionki
   */
  font: {
    weight: {
      normal: 400,
      medium: 500,
      semibold: 600,
    },
    size: {
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "30px",
    },
  },

  /**
   * Layouts
   */
  layouts: {
    header: {
      height: 55,
    },
    bottomNavigation: {
      height: 60,
    },
    settingsSidebar: {
      widthWhenOpen: 320,
      widthWhenClosed: 53,
    },
  },

  /** Breakpoints */
  breakpoint: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
};
