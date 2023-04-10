import { useRouter } from "next/router";
import React, { useRef } from "react";
import { Dropdown, useDropdown } from "~/hooks/useDropdown";
import Profile from "~/components/Profile";
import { PageComponentRequiredProps } from "~/layouts/ComponentRequiredPropsHandler";

const Page = () => {
  const router = useRouter();
  const { query } = router;
  const userId = typeof query.userId == "string" ? query.userId : null;

  if (typeof userId != "string") return <h1>Użytkownik nie istnieje</h1>;

  return (
    <div className="content-wrapper pt-10">
      <Profile userId={userId} />
    </div>
  );
};

const requiredPageProps: PageComponentRequiredProps = {
  auth: "for-all",
  header: "include",
  footer: "include",
};

Page.requiredPageProps = requiredPageProps;
export default Page;
