import React from "react";
import { HEADER_HEIGHT } from "~/constants";
import { useOutsideClick } from "~/hooks/useOutsideClick";

type SidebarWrapperProps = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
};
const SidebarWrapper = (props: SidebarWrapperProps) => {
  const ref = useOutsideClick<HTMLDivElement>(() => props.onClose());

  // const height = `calc(100vh - ${HEADER_HEIGHT}px)`;
  const paddingTop = `${HEADER_HEIGHT}px`;

  return (
    <div
      ref={ref}
      className={`border-r border-slate-200 bg-white duration-100 lg:w-sidebar-settings-open ${
        props.open
          ? "md: fixed z-20 w-[95%] sm:w-sidebar-settings-open"
          : "flex w-sidebar-settings-closed flex-col items-center"
      }`}
      style={{ top: 0, left: 0, height: "100vh", paddingTop }}
    >
      {props.children}
    </div>
  );
};

export default SidebarWrapper;
