import styled from "styled-components";
import { type InputVariantKey } from "~/styles/variants";

const DEFAULT_COLOR_VARIANT = "secondary";
const SIZES = { sm: 42, md: 48 };

type InputBaseProps = { variant?: InputVariantKey; Size?: "sm" | "md" };
export const InputBase = styled.input<InputBaseProps>`
  height: ${props => (props.Size == "sm" ? SIZES.sm : SIZES.md)}px; // default md - 48
  border-width: 1px;
  border-style: solid;
  border-color: ${props =>
    props.theme.variants!.input[props.variant ?? DEFAULT_COLOR_VARIANT].borderColor};
  border-radius: ${props => props.theme.spacing.md};
  padding: 0px ${props => props.theme.spacing.xl};
  transition-duration: 100ms;
  background-color: ${props => props.theme.palette.white};
  outline: none;
  color: ${props => props.theme.palette.black};
  ::placeholder {
    color: ${props => props.theme.palette.gray[500]};
  }
  :hover {
    border-color: ${props =>
      props.theme.variants!.input[props.variant ?? DEFAULT_COLOR_VARIANT].hover.borderColor};
  }
`;

export const TextareaBase = styled.textarea<InputBaseProps>`
  border-width: 1px;
  border-style: solid;
  border-color: ${props =>
    props.theme.variants!.input[props.variant ?? DEFAULT_COLOR_VARIANT].borderColor};
  border-radius: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  outline: none;
  background-color: ${props => props.theme.palette.white};
  color: ${props => props.theme.palette.black};
  transition-duration: 100ms;
  ::placeholder {
    color: ${props => props.theme.palette.gray[500]};
  }
  :hover {
    border-color: ${props =>
      props.theme.variants!.input[props.variant ?? DEFAULT_COLOR_VARIANT].hover.borderColor};
  }
`;
