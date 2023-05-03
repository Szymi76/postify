import React from "react";
import * as Settings from "~/components/Layouts/Settings/Layouts";
import SideBar from "~/components/Layouts/Settings/SideBar/SidebarContainer";
import { pages } from "~/constants";
import { type PageLayout } from "~/layouts/PageLayoutHandler";

const SecuritySettings = () => {
  return (
    <Settings.Wrapper>
      <SideBar />
      <Settings.FormWrapper>
        <Settings.FormContainer>
          <Settings.FormTitle>Zabezpieczenia</Settings.FormTitle>
        </Settings.FormContainer>
      </Settings.FormWrapper>
    </Settings.Wrapper>
  );
};

const pageLayout: PageLayout = {
  auth: "only-authenticated",
  scrollable: false,
};

SecuritySettings.pageLayout = pageLayout;
export default SecuritySettings;
