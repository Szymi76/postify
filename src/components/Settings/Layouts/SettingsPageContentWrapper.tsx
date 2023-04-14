import React from "react";
type SettingsPageContentWrapperProps = { children: React.ReactNode };

const SettingsPageContentWrapper = (props: SettingsPageContentWrapperProps) => {
  return (
    <div className="flex-1">
      <div className="mx-auto h-full w-full max-w-4xl py-7 px-3">{props.children}</div>
    </div>
  );
};

export default SettingsPageContentWrapper;
