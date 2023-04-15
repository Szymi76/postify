import React from "react";
import SideBar from "~/components/Settings/SideBar";
import { PAGES } from "~/constants";
import { PageComponentRequiredProps } from "~/layouts/ComponentRequiredPropsHandler";
import * as Settings from "~/components/Settings/Layouts";

import AccountForm from "~/components/Settings/Forms/AccountForm";

const AccountSettings = () => {
  return (
    <Settings.Wrapper>
      <SideBar currentPageHref={PAGES.SETTINGS.ACCOUNT} />
      <AccountForm />
    </Settings.Wrapper>
  );
};

const requiredPageProps: PageComponentRequiredProps = {
  auth: "only-authenticated",
  header: "include",
};

AccountSettings.requiredPageProps = requiredPageProps;
export default AccountSettings;
