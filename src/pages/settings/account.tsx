import React from "react";
import SideBar from "~/components/Layouts/Settings/SideBar/SidebarContainer";
import { pages } from "~/constants";
import { type PageLayout } from "~/layouts/PageLayoutHandler";
import * as Settings from "~/components/Layouts/Settings/Layouts";

import AccountForm from "~/components/Layouts/Settings/Forms/AccountFormContainer";

const AccountSettings = () => {
  return (
    <Settings.Wrapper>
      <SideBar />
      <AccountForm />
    </Settings.Wrapper>
  );
};

const pageLayout: PageLayout = {
  auth: "only-authenticated",
  scrollable: false,
};

AccountSettings.pageLayout = pageLayout;
export default AccountSettings;
