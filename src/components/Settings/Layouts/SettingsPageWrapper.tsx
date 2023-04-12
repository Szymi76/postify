import React from "react";
import { HEADER_HEIGHT } from "~/constants";

type SettingsPageWrapperProps = { children: React.ReactNode };
const SettingsPageWrapper = (props: SettingsPageWrapperProps) => {
  const height = `calc(100vh - ${HEADER_HEIGHT}px)`;

  return (
    <div style={{ height }} className="flex bg-slate-100">
      {props.children}
    </div>
  );
};

export default SettingsPageWrapper;
