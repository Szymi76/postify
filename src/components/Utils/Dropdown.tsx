import styled from "styled-components";
import { Paper } from "../Shared";

type DropdownWrapperProps = { show: boolean };
export const Wrapper = styled(Paper)<DropdownWrapperProps>`
  position: absolute;
  top: 32px;
  right: 0;
  padding: 0px;
  flex-direction: column;
  border-radius: ${props => props.theme.spacing.sm};
  z-index: 20;
  display: ${props => (props.show ? "flex" : "none")};
`;

export const Item = styled.div`
  padding: ${props => props.theme.spacing.md};
  transition-duration: 100ms;
  border-bottom: 1px solid ${props => props.theme.palette.gray[200]};
  white-space: nowrap;
  cursor: pointer;
  font-weight: ${props => props.theme.font.weight.medium};
  :last-child {
    border-bottom: none;
  }
  :hover {
    background-color: ${props => props.theme.palette.gray[100]};
  }
`;
