import { useRouter } from "next/router";
import React from "react";
import Post from "~/components/Post";
import { api } from "~/utils/api";

const Page = () => {
  const router = useRouter();
  const { query } = router;
  const postId = typeof query.postId == "string" ? query.postId : null;

  if (typeof postId != "string") return <h1>Post nie istnieje</h1>;

  return (
    <div className="mt-20 flex w-full justify-center">
      <Post id={postId} fullSection={true} />
    </div>
  );
};

export default Page;
