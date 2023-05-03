import React from "react";
import Logo from "./Logo";
import SearchContainer from "./Search/SearchContainer";
import { useSession } from "next-auth/react";
import UserAvatarContainer from "./UserAvatarContainer";
import LoginButton from "./LoginButton";
import styled from "styled-components";
import { Box, Flex, Icon } from "~/components/Shared";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import { useGlobalModals } from "~/providers/GlobalModalsProvider/useGlobalModals";

const HeaderContainer = () => {
  const currentUser = useSession().data?.user;
  const { setId } = useGlobalModals(modals => modals.friendsModal);
  const { open: openNotiModal } = useGlobalModals(modals => modals.notificationsModal);

  const openFriendsModal = () => setId(currentUser?.id ?? null);

  return (
    <HeaderWrapper>
      <Flex justify="flex-start" items="center" style={{ width: "25%" }}>
        <Logo />
      </Flex>
      <Flex justify="center" items="center" style={{ width: "50%" }}>
        <SearchContainer />
      </Flex>
      <Flex justify="flex-end" items="center" gap="xl" style={{ width: "25%" }}>
        {currentUser && (
          <IconsWrapper>
            <StyledIcon onClick={openNotiModal}>
              <BellIcon />
            </StyledIcon>
            <StyledIcon onClick={openFriendsModal}>
              <UsersIcon />
            </StyledIcon>
          </IconsWrapper>
        )}
        {currentUser ? <UserAvatarContainer /> : <LoginButton />}
      </Flex>
    </HeaderWrapper>
  );
};

export default HeaderContainer;

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.theme.layouts.header.height}px;
  width: 100%;
  max-width: 100vw;
  background-color: ${props => props.theme.palette.primary};
  color: ${props => props.theme.palette.white};
  padding: ${props => props.theme.spacing.md};
`;

const StyledIcon = styled(Icon)`
  color: ${props => props.theme.palette.white};
`;

const IconsWrapper = styled(Box)`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  @media (max-width: ${props => props.theme.breakpoint.sm}) {
    display: none;
  }
`;
