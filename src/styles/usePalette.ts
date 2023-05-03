import { produce } from "immer";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { palettes } from "~/styles/palettes";

type Palette = {
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

type Theme = "light" | "dark";

type PaletteState = {
  theme: Theme;
  palette: Palette;
  switchPalette: (theme: Theme) => void;
};

export const usePalette = create<PaletteState>()(
  persist(
    (set, get) => ({
      theme: "light",
      palette: palettes.light,
      switchPalette: (theme) => {
        set(
          produce<PaletteState>((state) => {
            state.theme = theme;
            state.palette = palettes[theme];
          })
        );
      },
    }),
    {
      name: "palette-storage", // name of the item in the storage (must be unique)
    }
  )
);
