import React, { useState } from "react";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import { useBreakpoint } from "~/hooks/useBreakpoint";
import SidebarWrapper from "./SidebarWrapper";
import SidebarButton from "./SidebarButton";
import ArrowLongRightIcon from "@heroicons/react/24/outline/ArrowLongRightIcon";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import KeyIcon from "@heroicons/react/24/outline/KeyIcon";
import { PAGES } from "~/constants";
import { useRouter } from "next/router";

type SideBarProps = { currentPageHref: string };
const SideBar = (props: SideBarProps) => {
  const router = useRouter();
  const initialOpen = Boolean(router.query?.open == "true");

  const [open, setOpen] = useState(initialOpen);
  const { breakpoint, getPixels } = useBreakpoint();

  const currentBreakpointAsPixels = getPixels(breakpoint);
  const show = open || currentBreakpointAsPixels >= getPixels("xl");

  const toggleSidebar = () => {
    if (currentBreakpointAsPixels <= getPixels("lg")) setOpen(!open);
  };

  const buttonHref = (href: string) => `${href}?open=${String(open)}`;

  return (
    <SidebarWrapper open={open} onClose={() => setOpen(false)}>
      <div className="w-full border-b border-slate-200" onClick={toggleSidebar}>
        <div className={`icon flex p-3 ${show ? "justify-start" : "justify-center"}`}>
          {!show && <ArrowLongRightIcon className="pointer-events-none h-8" />}
          {show && <h2 className="text-2xl font-semibold">Ustawienia</h2>}
        </div>
      </div>
      <SidebarButton
        icon={<Cog6ToothIcon className="h-7" />}
        title="Konto"
        description="Tu możesz zmienić takie informacje jak widoczna nazwa lub zdjęcie w tle."
        href={buttonHref(PAGES.SETTINGS.ACCOUNT)}
        showOnlyIcon={!show}
        active={PAGES.SETTINGS.ACCOUNT == props.currentPageHref}
      />
      <SidebarButton
        icon={<BellIcon className="h-7" />}
        title="Powiadomienia"
        description="Tu możesz zarządzać rodzajami powiadomień, które dostajesz."
        href={buttonHref(PAGES.SETTINGS.NOTIFICATIONS)}
        showOnlyIcon={!show}
        active={PAGES.SETTINGS.NOTIFICATIONS == props.currentPageHref}
      />
      <SidebarButton
        icon={<KeyIcon className="h-7" />}
        title="Zabezpieczenia"
        description="Tu możesz ustawiać dodatkowe zabezpieczenia."
        href={buttonHref(PAGES.SETTINGS.SECURITY)}
        showOnlyIcon={!show}
        active={PAGES.SETTINGS.SECURITY == props.currentPageHref}
      />
    </SidebarWrapper>
  );
};

export default SideBar;
