import React from "react";
import styled from "styled-components";
import { Box, Flex, Paper } from "~/components/Shared";
import { pulse } from "~/styles/animations";

const ProfileContainerSkeleton = () => {
  return (
    <PostContainerSkeletonWrapper>
      {/* HEADER */}
      <AvatarWrapper height="160px" width="100%">
        <StyledAvatar />
      </AvatarWrapper>

      {/* TEXT */}
      <Flex direction="column" gap="sm" style={{ marginTop: 40 }}>
        <Data height="20px" width="100px" />
        <Data height="16px" width="275px" />
      </Flex>

      {/* IMAGE */}
      <Data height="28px" width="85px" />
    </PostContainerSkeletonWrapper>
  );
};

export default ProfileContainerSkeleton;

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

const StyledAvatar = styled(Box)`
  position: absolute;
  bottom: -40px;
  left: 25px;
  height: 100px;
  width: 100px;
  border-radius: 9999px;
  border: 7px solid ${props => props.theme.palette.gray[200]};
  background-color: ${props => props.theme.palette.white};
`;

const AvatarWrapper = styled(Data)`
  position: relative;
  margin: auto;
`;
