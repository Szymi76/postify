import React, { useLayoutEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { Headline, Icon, Paragraph } from "~/components/Shared";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import SidebarItem from "./SidebarItem";
import { pages } from "~/constants";
import { useRouter } from "next/router";

const SidebarContainer = () => {
  const [open, setOpen] = useState(true);
  const { pathname } = useRouter();
  const theme = useTheme();

  useLayoutEffect(() => {
    if (window.innerWidth < +theme.breakpoint.sm.slice(0, -2)) setOpen(false);
  }, []);

  return (
    <SidebarContainerWrapper open={open}>
      <SidebarToggler open={open}>
        <Icon style={{ height: 38, width: 38 }} onClick={() => setOpen(!open)}>
          <Bars3Icon />
        </Icon>
        {open && <Paragraph style={{ width: "calc(100% - 42px)" }}>Ustawienia</Paragraph>}
      </SidebarToggler>
      <SidebarItem
        label="Konto"
        description="Tu możesz zmienić takie informacje jak widoczna nazwa lub zdjęcie w tle."
        icon={<Cog6ToothIcon height={36} width={36} />}
        active={pages.settings.account.includes(pathname)}
        onlyIcon={!open}
        href={pages.settings.account}
      />
      <SidebarItem
        label="Powiadomienia"
        description="Tu możesz zarządzać rodzajami powiadomień, które dostajesz."
        icon={<BellIcon height={36} width={36} />}
        active={pages.settings.notifications.includes(pathname)}
        onlyIcon={!open}
        href={pages.settings.notifications}
      />
      <SidebarItem
        label="Zabezpieczenia"
        description="Tu możesz ustawić dodatkowe środki bezpieczeństwa oraz zweryfikować adres email."
        icon={<Cog6ToothIcon height={36} width={36} />}
        active={pages.settings.security.includes(pathname)}
        onlyIcon={!open}
        href={pages.settings.security}
      />
    </SidebarContainerWrapper>
  );
};

export default SidebarContainer;

type SidebarContainerWrapperProps = { open: boolean };
const SidebarContainerWrapper = styled.aside<SidebarContainerWrapperProps>`
  width: ${props =>
    props.open
      ? props.theme.layouts.settingsSidebar.widthWhenOpen
      : props.theme.layouts.settingsSidebar.widthWhenClosed}px;
  transition-duration: 100ms;
  height: 100%;
  background-color: ${props => props.theme.palette.white};
  border-right: 1px solid ${props => props.theme.palette.gray[200]};
  z-index: 20;
  @media (max-width: ${props => props.theme.breakpoint.md}) {
    position: fixed;
    top: ${props => props.theme.layouts.header.height}px;
    left: 0;
  }
`;

type SidebarTogglerProps = { open: boolean };
const SidebarToggler = styled(Headline)<SidebarTogglerProps>`
  border-bottom: 1px solid ${props => props.theme.palette.gray[200]};
  padding: ${props => props.theme.spacing.sm};
  display: flex;
  justify-content: ${props => (props.open ? "flex-start" : "center")};
  gap: ${props => props.theme.spacing.md};
  align-items: center;
  font-weight: ${props => props.theme.font.weight.medium};
`;
