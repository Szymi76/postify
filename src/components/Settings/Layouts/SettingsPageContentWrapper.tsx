import React from "react";
type SettingsPageContentWrapperProps = { children: React.ReactNode };

const SettingsPageContentWrapper = (props: SettingsPageContentWrapperProps) => {
  return <div className="flex-1">{props.children}</div>;
};

export default SettingsPageContentWrapper;
