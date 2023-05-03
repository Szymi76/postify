import { type CSSProperties } from "react";
import styled, { type DefaultTheme } from "styled-components";

/**
 * Div z display flexem
 */

type Spacing = keyof DefaultTheme["spacing"];
type JustifyType = CSSProperties["justifyContent"];
type ItemsType = CSSProperties["alignItems"];
type DirectionType = CSSProperties["flexDirection"];

type FlexProps = {
  justify?: JustifyType;
  items?: ItemsType;
  gap?: Spacing;
  direction?: DirectionType;
};

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justify};
  align-items: ${props => props.items};
  ${props => props.gap && { gap: props.theme.spacing[props.gap] }};
  color: ${props => props.theme.palette.black};
`;

/**
 * Biały element z ramką
 */

type PaperProps = {
  padding?: Spacing;
};

export const Paper = styled.div<PaperProps>`
  padding: ${props => props.theme.spacing[props.padding ?? "xl"]};
  background-color: ${props => props.theme.palette.white};
  border: 1px solid ${props => props.theme.palette.gray[200]};
  border-radius: ${props => props.theme.spacing.md};
  color: ${props => props.theme.palette.black};
`;

/**
 * Zwykły div
 */

export const Box = styled.div`
  color: ${props => props.theme.palette.black};
`;

/**
 * Element na zawartość strony
 */

export const Container = styled.main`
  width: 95%;
  max-width: 775px;
  margin: auto;
`;
