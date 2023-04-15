import React from "react";
import * as Settings from "~/components/Settings/Layouts";
import SideBar from "~/components/Settings/SideBar";
import { PAGES } from "~/constants";
import { PageComponentRequiredProps } from "~/layouts/ComponentRequiredPropsHandler";

const SecuritySettings = () => {
  return (
    <Settings.Wrapper>
      <SideBar currentPageHref={PAGES.SETTINGS.SECURITY} />
      <Settings.Form>
        <Settings.Title>Zabezpieczenia</Settings.Title>
      </Settings.Form>
    </Settings.Wrapper>
  );
};

const requiredPageProps: PageComponentRequiredProps = {
  auth: "only-authenticated",
  header: "include",
};

SecuritySettings.requiredPageProps = requiredPageProps;
export default SecuritySettings;
