import "styled-components";
import { type Variants } from "./variants";

declare module "styled-components" {
  export interface DefaultTheme {
    /**
     * Paleta kolorów
     */
    palette: {
      primary: string;
      gray: {
        50: string;
        100: string;
        200: string;
        300: string;
        500: string;
        600: string;
      };
      info: string;
      success: string;
      warning: string;
      error: string;
      white: string;
      black: string;
      hover: {
        primary: string;
        error: string;
      };
    };
    /**
     * Odległości
     */
    spacing: {
      xs: "2px";
      sm: "4px";
      md: "8px";
      lg: "12px";
      xl: "16px";
      "2xl": "20px";
      "3xl": "24px";
    };

    font: {
      weight: {
        normal: 400;
        medium: 500;
        semibold: 600;
      };
      size: {
        sm: "14px";
        md: "16px";
        lg: "18px";
        xl: "20px";
        "2xl": "24px";
        "3xl": "30px";
      };
    };

    /**
     * Layouts
     */
    layouts: {
      header: {
        height: number;
      };
      bottomNavigation: {
        height: number;
      };
      settingsSidebar: {
        widthWhenOpen: number;
        widthWhenClosed: number;
      };
    };

    breakpoint: {
      sm: "640px";
      md: "768px";
      lg: "1024px";
      xl: "1280px";
      "2xl": "1536px";
    };

    variants: Variants;
  }
}
