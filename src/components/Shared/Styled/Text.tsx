import styled, { type DefaultTheme } from "styled-components";

export const Paragraph = styled.p`
  /* color: ${props => props.theme.palette.black}; */
`;

export const Name = styled.h4`
  font-weight: ${props => props.theme.font.weight.semibold};
  /* color: ${props => props.theme.palette.black}; */
`;

type FontSizes = keyof DefaultTheme["font"]["size"];
type HeadlineProps = { size?: FontSizes };
export const Headline = styled.h1<HeadlineProps>`
  font-size: ${props => props.theme.font.size[props.size ?? "xl"]};
  font-weight: ${props => props.theme.font.weight.medium};
  color: ${props => props.theme.palette.black};
`;

export const Description = styled.p`
  font-size: ${props => props.theme.font.size.sm};
  font-weight: ${props => props.theme.font.weight.normal};
  color: ${props => props.theme.palette.gray[500]};
`;

export const Label = styled.label`
  font-size: ${props => props.theme.font.size.sm};
  color: ${props => props.theme.palette.gray[600]};
  text-transform: "uppercase";
`;

export const ErrorText = styled.p`
  color: ${props => props.theme.palette.error};
  font-size: ${props => props.theme.font.size.sm};
`;

type ActionTextProps = { center?: boolean };
export const ActionText = styled.p<ActionTextProps>`
  color: ${props => props.theme.palette.primary};
  transition-duration: 75ms;
  width: min-content;
  white-space: nowrap;
  margin: 0px ${props => (props.center === false ? "0px" : "auto")};
  cursor: pointer;
  :hover {
    scale: 95%;
  }
  :active {
    scale: 85%;
  }
`;
