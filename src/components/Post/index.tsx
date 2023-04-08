import React from "react";
import { api } from "~/utils/api";
import PostSkeleton from "./PostSkeleton";
import Header from "./Header";
import Content from "./Content";
import ActionButtons from "./ActionButtons";
import LikesDetails from "./LikesDetails";
import Comments from "./Comments";

type PostProps = { id: string; fullSection: boolean };
const Post = (props: PostProps) => {
  const { data: post, isLoading, refetch } = api.post.getPostById.useQuery({ postId: props.id });

  if (isLoading) return <PostSkeleton />;
  if (!isLoading && !post) {
    if (props.fullSection) return <h1>Post nie istnieje</h1>;
    else return <></>;
  }

  const usersWhoLiked = post?.likes.map((like) => like.user) ?? [];

  return (
    <div className="layout flex w-[750px] max-w-[95%] flex-col gap-5">
      <Header post={post} refetch={() => void refetch()} />
      <Content post={post} />
      <ActionButtons post={post ?? null} refetch={() => void refetch()} />
      <LikesDetails users={usersWhoLiked} />
      <Comments fullSection={props.fullSection} post={post} refetch={() => void refetch()} />
    </div>
  );
};

export default Post;
