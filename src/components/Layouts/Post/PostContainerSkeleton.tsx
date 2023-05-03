import React from "react";
import styled from "styled-components";
import { Avatar, Box, Flex, Paper } from "~/components/Shared";
import { pulse } from "~/styles/animations";

const PostContainerSkeleton = () => {
  return (
    <PostContainerSkeletonWrapper>
      {/* HEADER */}
      <Flex gap="lg">
        <Box>
          <Avatar />
        </Box>
        <Flex direction="column" justify="center" style={{ width: "100%" }} gap="sm">
          <Data height="20px" width="96px" />
          <Data height="12px" width="128px" />
        </Flex>
      </Flex>

      {/* TEXT */}
      <Flex direction="column" gap="sm">
        <Data height="16px" width="75%" />
        <Data height="16px" width="40%" />
        <Data height="16px" width="65%" />
      </Flex>

      {/* IMAGE */}
      <Flex justify="center">
        <Data height="164px" width="100%" />
      </Flex>

      {/* BUTTON ACTIONS */}
      <Flex justify="space-between">
        <Data height="24px" width="100px" />
        <Data height="24px" width="50px" />
      </Flex>
    </PostContainerSkeletonWrapper>
  );
};

export default PostContainerSkeleton;

const PostContainerSkeletonWrapper = styled(Paper)`
  width: 100%;
  animation: 2s ${pulse} cubic-bezier(0.4, 0, 0.6, 1) infinite;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

type DataProps = { height?: string; width?: string };
const Data = styled(Box)<DataProps>`
  background-color: ${props => props.theme.palette.gray[200]};
  border-radius: ${props => props.theme.spacing.md};
  height: ${props => props.height};
  width: ${props => props.width};
`;
