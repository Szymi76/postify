import React from "react";

type SettingsPageTitleProps = { children: React.ReactNode };
const SettingsPageTitle = (props: SettingsPageTitleProps) => {
  return <h1 className="text-3xl font-medium">{props.children}</h1>;
};

export default SettingsPageTitle;
