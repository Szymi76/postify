import React from "react";
import * as Settings from "~/components/Settings/Layouts";
import SideBar from "~/components/Settings/SideBar";
import { PAGES } from "~/constants";
import { PageComponentRequiredProps } from "~/layouts/ComponentRequiredPropsHandler";

const NotificationsSettings = () => {
  return (
    <Settings.Wrapper>
      <SideBar currentPageHref={PAGES.SETTINGS.NOTIFICATIONS} />
      <Settings.Form>
        <Settings.Title>Powiadomienia</Settings.Title>
      </Settings.Form>
    </Settings.Wrapper>
  );
};

const requiredPageProps: PageComponentRequiredProps = {
  auth: "only-authenticated",
  header: "include",
};

NotificationsSettings.requiredPageProps = requiredPageProps;
export default NotificationsSettings;
