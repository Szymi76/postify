import { useRouter } from "next/router";
import React from "react";
import Post from "~/components/Post";
import { PageComponentRequiredProps } from "~/layouts/ComponentRequiredPropsHandler";
import ScrollablePage from "~/layouts/ScrollablePage";

const Page = () => {
  const router = useRouter();
  const { query } = router;
  const postId = typeof query.postId == "string" ? query.postId : null;

  if (typeof postId != "string") return <h1>Post nie istnieje</h1>;

  return (
    <ScrollablePage>
      <div className="content-wrapper">
        <Post id={postId} fullSection={true} />
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
