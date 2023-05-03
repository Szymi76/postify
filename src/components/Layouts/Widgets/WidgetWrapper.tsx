import styled from "styled-components";
import { Paper } from "~/components/Shared";

export const WidgetWrapper = styled(Paper)`
  position: sticky;
  top: 0;
  height: min-content;
  width: 300px;
  @media (max-width: ${props => props.theme.breakpoint["2xl"]}) {
    display: none;
  }
`;
