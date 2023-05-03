import React from "react";
import { ThemeProvider } from "styled-components";
import { usePalette } from "~/styles/usePalette";
import { createVariants } from "~/styles/variants";
import { theme } from "~/styles/theme";
import { GlobalStyle } from "~/styles/GlobalStyle";

type CustomThemeProviderProps = { children: React.ReactNode };
const CustomThemeProvider = (props: CustomThemeProviderProps) => {
  const palette = usePalette(state => state.palette);
  const variants = createVariants({ ...theme, palette });

  return (
    <ThemeProvider theme={{ ...theme, palette, variants }}>
      <GlobalStyle />
      {props.children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
