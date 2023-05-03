import { useRouter } from "next/router";
import React from "react";
import Post from "~/components/Layouts/Post/PostContainer";
import { Container } from "~/components/Shared";

const PostPage = () => {
  const router = useRouter();
  const { query } = router;
  const postId = typeof query.postId == "string" ? query.postId : null;

  if (typeof postId != "string") return <h1>Post nie istnieje</h1>;

  return (
    <Container>
      <Post postId={postId} fullSection={true} />
    </Container>
  );
};

export default PostPage;
