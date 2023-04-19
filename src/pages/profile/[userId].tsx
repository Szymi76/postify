import { useRouter } from "next/router";
import React from "react";
import Profile from "~/components/Profile";
import { PageComponentRequiredProps } from "~/layouts/ComponentRequiredPropsHandler";
import ScrollablePage from "~/layouts/ScrollablePage";

const Page = () => {
  const router = useRouter();
  const { query } = router;
  const userId = typeof query.userId == "string" ? query.userId : null;

  if (typeof userId != "string") return <h1>Użytkownik nie istnieje</h1>;

  return (
    <ScrollablePage>
      <div className="content-wrapper">
        <Profile userId={userId} />
      </div>
    </ScrollablePage>
  );
};

const requiredPageProps: PageComponentRequiredProps = {
  auth: "for-all",
  header: "include",
};

Page.requiredPageProps = requiredPageProps;
export default Page;
