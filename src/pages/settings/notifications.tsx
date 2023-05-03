import React from "react";
import * as Settings from "~/components/Layouts/Settings/Layouts";
import SideBar from "~/components/Layouts/Settings/SideBar/SidebarContainer";
import { pages } from "~/constants";
import { type PageLayout } from "~/layouts/PageLayoutHandler";

const NotificationsSettings = () => {
  return (
    <Settings.Wrapper>
      <SideBar currentPageHref={pages.settings.notifications} />
      <Settings.FormWrapper>
        <Settings.FormContainer>
          <Settings.FormTitle>Powiadomienia</Settings.FormTitle>
        </Settings.FormContainer>
      </Settings.FormWrapper>
    </Settings.Wrapper>
  );
};

const pageLayout: PageLayout = {
  auth: "only-authenticated",
  scrollable: false,
};

NotificationsSettings.pageLayout = pageLayout;
export default NotificationsSettings;
