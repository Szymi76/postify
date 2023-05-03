import React from "react";
import { WidgetWrapper } from "./WidgetWrapper";
import { Avatar, Box, Flex } from "~/components/Shared";
import styled from "styled-components";
import { pulse } from "~/styles/animations";

const WidgetSkeleton = () => {
  return (
    <StyledWidgetWrapper>
      <Data height="28px" width="125px" />

      {/* CARD 1 */}
      <Flex direction="column" gap="lg" style={{ marginTop: 20 }}>
        <Flex gap="md" justify="center">
          <Avatar />
          <Data height="50px" width="200px" />
        </Flex>
        <Flex gap="md" justify="center">
          <Avatar />
          <Data height="50px" width="200px" />
        </Flex>
        <Flex gap="md" justify="center">
          <Avatar />
          <Data height="50px" width="200px" />
        </Flex>
      </Flex>
    </StyledWidgetWrapper>
  );
};

export default WidgetSkeleton;

type DataProps = { height?: string; width?: string };
const Data = styled(Box)<DataProps>`
  background-color: ${props => props.theme.palette.gray[200]};
  border-radius: ${props => props.theme.spacing.md};
  height: ${props => props.height};
  width: ${props => props.width};
`;

const StyledWidgetWrapper = styled(WidgetWrapper)`
  animation: 2s ${pulse} cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;
