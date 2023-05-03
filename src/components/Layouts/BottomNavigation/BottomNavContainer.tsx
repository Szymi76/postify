import React, { forwardRef } from "react";
import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import Link from "next/link";
import { pages } from "~/constants/";
import { useSession } from "next-auth/react";
import { useSearch } from "~/store";
import { useGlobalModals } from "~/providers/GlobalModalsProvider/useGlobalModals";
import styled from "styled-components";
import { Box } from "~/components/Shared";

const BottomNavContainer = forwardRef<HTMLDivElement>((props, ref) => {
  const { open: openNotiModal } = useGlobalModals(modals => modals.notificationsModal);
  const { setId } = useGlobalModals(modals => modals.friendsModal);
  const { isOpen, setOpen, forceClose } = useSearch();
  const currentUser = useSession().data?.user;

  const openFriendsModal = () => setId(currentUser?.id ?? null);

  const toggleResults = () => {
    if (!isOpen) setOpen(true);
    else forceClose();
  };

  return (
    <BottomNavContainerWrapper ref={ref}>
      <BottomNavButton href={pages.home}>
        <HomeIcon height={28} width={28} />
      </BottomNavButton>
      <BottomNavButton href="#" onClick={toggleResults}>
        <MagnifyingGlassIcon height={28} width={28} />
      </BottomNavButton>
      {currentUser && (
        <>
          <BottomNavButton href="#" onClick={openFriendsModal}>
            <UsersIcon height={28} width={28} />
          </BottomNavButton>
          <BottomNavButton href="#" onClick={openNotiModal}>
            <BellIcon height={28} width={28} />
          </BottomNavButton>
        </>
      )}
    </BottomNavContainerWrapper>
  );
});

BottomNavContainer.displayName = "BottomNavContainer";
export default BottomNavContainer;

const BottomNavContainerWrapper = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${props => props.theme.layouts.bottomNavigation.height}px;
  background-color: ${props => props.theme.palette.primary};
  color: ${props => props.theme.palette.white};
  display: none;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${props => props.theme.breakpoint.sm}) {
    display: flex;
  }
`;

const BottomNavButton = styled(Link)`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  transition-duration: 100ms;
  width: 100%;
  height: 100%;
  ::after {
    content: "";
    height: 70%;
    width: 1px;
    background-color: ${props => props.theme.palette.white};
    position: absolute;
    right: 0;
    opacity: 0.25;
  }
  :last-child {
    ::after {
      width: 0px;
    }
  }
  :hover {
    backdrop-filter: brightness(90%);
  }
`;
