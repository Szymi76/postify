import React from "react";
import styled from "styled-components";

type RootLayoutProps = { children: React.ReactNode };

/**
 * Główny layout, który znajduje się na KAŻDEJ stronie.
 */
export const RootLayout = (props: RootLayoutProps) => {
  return <RootLayoutWrapper>{props.children}</RootLayoutWrapper>;
};

const RootLayoutWrapper = styled.div`
  background-color: ${props => props.theme.palette.gray[100]};
  min-height: 100vh;
`;
