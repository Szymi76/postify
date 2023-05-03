import { type User } from "@prisma/client";
import React, { forwardRef } from "react";
import ArrowTopRightOnSquareIcon from "@heroicons/react/24/outline/ArrowTopRightOnSquareIcon";
import { useRouter } from "next/router";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import ArrowLeftOnRectangleIcon from "@heroicons/react/24/outline/ArrowLeftOnRectangleIcon";
import { signOut } from "next-auth/react";
import { pages } from "~/constants";
import { Box, List, ListItem, Name, Paper, UserCard } from "~/components/Shared";
import styled from "styled-components";
import { scaleFromTopRight } from "~/styles/animations";
import { usePalette } from "~/styles/usePalette";

type PopoutMenuProps = { user: Partial<User>; onClose: () => void };
const PopoutMenuContainer = forwardRef<HTMLDivElement, PopoutMenuProps>((props, ref) => {
  const { user } = props;
  const router = useRouter();
  const { switchPalette, theme } = usePalette();

  const alsoClosePopout = (handler: () => void) => {
    handler();
    props.onClose();
  };

  const handleProfileClick = () => void router.push(pages.profile(props.user.id!));
  const handleThemeClick = () => switchPalette(theme == "dark" ? "light" : "dark");
  const handleSettingsClick = () => void router.push(pages.settings.account);
  const handleLogoutClick = () => void signOut();

  return (
    <PopoutMenuContainerWrapper ref={ref}>
      <UserCardWrapper>
        <UserCard name={user.name} src={user.image} secondaryText={user.email} />
      </UserCardWrapper>
      <List>
        <ListItem withBottomBorder={false} onClick={() => alsoClosePopout(handleProfileClick)}>
          <ArrowTopRightOnSquareIcon height={25} />
          <Name>Twój profil</Name>
        </ListItem>

        <ListItem withBottomBorder={false} onClick={handleThemeClick}>
          <SunIcon height={25} />
          <Name>Zmień motyw</Name>
        </ListItem>

        <ListItem withBottomBorder={false} onClick={() => alsoClosePopout(handleSettingsClick)}>
          <Cog6ToothIcon height={25} />
          <Name>Ustawienia</Name>
        </ListItem>

        <ListItem withBottomBorder={false} onClick={handleLogoutClick}>
          <ArrowLeftOnRectangleIcon height={25} />
          <Name>Wyloguj się</Name>
        </ListItem>
      </List>
    </PopoutMenuContainerWrapper>
  );
});

PopoutMenuContainer.displayName = "PopoutMenu";
export default PopoutMenuContainer;

const PopoutMenuContainerWrapper = styled(Paper)`
  position: absolute;
  right: 10px;
  top: ${props => props.theme.layouts.header.height + 10}px;
  z-index: 30;
  width: 275px;
  padding: 0px;
  animation: 150ms ${scaleFromTopRight};
  @media (max-width: ${props => props.theme.breakpoint.sm}) {
    top: ${props => props.theme.layouts.header.height - 3}px;
    right: -8px;
    border-radius: 0px;
    border-top: 0px;
    border-right: 0px;
    border-bottom-left-radius: ${props => props.theme.spacing.md};
    width: 350px;
    max-width: 100vw;
  }
`;

const UserCardWrapper = styled(Box)`
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.palette.gray[200]};
`;
