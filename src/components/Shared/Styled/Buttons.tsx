import styled, { type DefaultTheme } from "styled-components";
import { type ButtonVariantKey } from "~/styles/variants";

type ButtonSize = "md" | "sm";
type ButtonVariant = "solid" | "outlined";

export type ButtonBaseProps = {
  color?: ButtonVariantKey;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

const SIZES = { sm: 42, md: 48 };
const DEFAULT_COLOR_VARIANT = "primary";
const DEFAULT_VARIANT = "solid";

/**
 * Główny przycisk z którego powstają kolejne wersje
 */
export const ButtonBase = styled.button<ButtonBaseProps>`
  height: ${props => (props?.size === "md" ? SIZES.md : SIZES.sm)}px; // default sm - 42
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  align-items: center;
  white-space: nowrap;
  border: none;
  outline: none;
  transition-duration: 100ms;
  border-radius: ${props => props.theme.spacing.md};
  padding: 0px ${props => props.theme.spacing["xl"]};
  font-size: ${props => props.theme.font.size.md};
  font-weight: ${props => props.theme.font.weight.medium};
  width: min-content;
  :active {
    scale: 92%;
  }
  :disabled {
    opacity: 0.35;
  }
`;

/**
 * Solid Button
 */
export const Button = styled(ButtonBase)`
  background-color: ${props => getProperty(props).backgroundColor};
  color: ${props => getProperty(props).color};
  border: 1px solid ${props => getProperty(props).borderColor};
  :hover {
    background-color: ${props => getProperty(props).hover.backgroundColor};
    color: ${props => getProperty(props).hover.color};
  }
`;

function getProperty(args: {
  theme: DefaultTheme;
  color?: ButtonVariantKey;
  variant?: ButtonVariant;
}) {
  const { theme, color, variant } = args;
  return theme.variants.button[color ?? DEFAULT_COLOR_VARIANT][variant ?? DEFAULT_VARIANT];
}
