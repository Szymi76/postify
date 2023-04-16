import { useRouter } from "next/router";
import React from "react";
import Post from "~/components/Post";
import { PageComponentRequiredProps } from "~/layouts/ComponentRequiredPropsHandler";
import { api } from "~/utils/api";

const Page = () => {
  const router = useRouter();
  const { query } = router;
  const postId = typeof query.postId == "string" ? query.postId : null;

  if (typeof postId != "string") return <h1>Post nie istnieje</h1>;

  return (
    <div className="content-wrapper pt-10">
      <Post id={postId} fullSection={true} />
    </div>
  );
};

const requiredPageProps: PageComponentRequiredProps = {
  auth: "for-all",
  header: "include",
};

Page.requiredPageProps = requiredPageProps;
export default Page;
