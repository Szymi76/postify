import styled from "styled-components";

type IconProps = { overrideSize?: boolean };
export const Icon = styled.i<IconProps>`
  display: block;
  ${(props) => props.overrideSize !== true && { height: 28, width: 28 }};
  transition-duration: 100ms;
  cursor: pointer;
  :hover {
    scale: 92%;
  }
  :active {
    scale: 83%;
  }
`;
