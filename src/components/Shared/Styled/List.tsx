import Link from "next/link";
import styled, { type DefaultTheme } from "styled-components";

type Spacing = keyof DefaultTheme["spacing"];

/**
 * Lista
 */

type ListProps = { asModalList?: boolean };

export const List = styled.ul<ListProps>`
  overflow-y: ${props => (props.asModalList ? "auto" : "unset")};
  max-height: ${props => (props.asModalList ? "300px" : "auto")};
  color: ${props => props.theme.palette.black};
`;

/**
 * Element lity
 */

type ListItemProps = {
  py?: Spacing;
  px?: Spacing;
  withBottomBorder?: boolean;
  padding?: Spacing;
};

export const ListItem = styled.li<ListItemProps>`
  padding-top: ${props => props.theme.spacing[props.py ?? "lg"]};
  padding-bottom: ${props => props.theme.spacing[props.py ?? "lg"]};
  padding-left: ${props => props.theme.spacing[props.py ?? "md"]};
  padding-right: ${props => props.theme.spacing[props.py ?? "md"]};
  transition-duration: 100ms;
  display: flex;
  gap: ${props => props.theme.spacing.md};
  cursor: pointer;
  border-bottom: ${props =>
    props.withBottomBorder !== false ? `1px solid ${props.theme.palette.gray[200]}` : "none"};

  :last-child {
    border-bottom: none;
  }
  :hover {
    background-color: ${props => props.theme.palette.gray[100]};
  }
`;

/**
 * Element listy jako link
 */

export const ListItemAsLink = styled(Link)<ListItemProps>`
  display: block;
  transition-duration: 100ms;
  outline: none;
  padding-top: ${props => props.theme.spacing[props.py ?? "md"]};
  padding-bottom: ${props => props.theme.spacing[props.py ?? "md"]};
  padding-left: ${props => props.theme.spacing[props.py ?? "sm"]};
  padding-right: ${props => props.theme.spacing[props.py ?? "sm"]};
  border-bottom: ${props =>
    props.withBottomBorder !== false ? `1px solid ${props.theme.palette.gray[200]}` : "none"};
  :last-child {
    border-bottom: none;
  }
  :hover {
    background-color: ${props => props.theme.palette.gray[100]};
  }
  :active {
    background-color: ${props => props.theme.palette.primary};
    color: white;
  }
  :focus {
    background-color: ${props => props.theme.palette.primary};
    color: white;
  }
`;
