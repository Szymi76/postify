import React from "react";
import SettingsPageContentWrapper from "~/components/Settings/Layouts/SettingsPageContentWrapper";
import SettingsPageWrapper from "~/components/Settings/Layouts/SettingsPageWrapper";
import SideBar from "~/components/Settings/SideBar";
import { PAGES } from "~/constants";
import { PageComponentRequiredProps } from "~/layouts/ComponentRequiredPropsHandler";

const NotificationsSettings = () => {
  return (
    <SettingsPageWrapper>
      <SideBar currentPageHref={PAGES.SETTINGS.NOTIFICATIONS} />
      <SettingsPageContentWrapper>2</SettingsPageContentWrapper>
    </SettingsPageWrapper>
  );
};

const requiredPageProps: PageComponentRequiredProps = {
  auth: "only-authenticated",
  header: "include",
};

NotificationsSettings.requiredPageProps = requiredPageProps;
export default NotificationsSettings;
