import React from "react";
import { api } from "~/utils/api";
import PostSkeleton from "./PostSkeleton";
import Header from "./Header";
import Content from "./Content";
import ActionButtons from "./ActionButtons";
import LikesDetails from "./LikesDetails";
import Comments from "./Comments";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { PAGES } from "~/constants";

type PostProps = { id: string; fullSection: boolean };
const Post = (props: PostProps) => {
  const currentUser = useSession().data?.user;
  const { data: post, isLoading, refetch } = api.post.getPostById.useQuery({ postId: props.id });

  if (isLoading) return <PostSkeleton />;
  if (!isLoading && !post) {
    if (props.fullSection) return <h1>Post nie istnieje</h1>;
    else return <></>;
  }

  const usersWhoLiked = post?.likes.map((like) => like.user) ?? [];

  return (
    <div className="layout flex w-full flex-col gap-5">
      <Header post={post} refetch={() => void refetch()} />
      <Content post={post} />
      {currentUser ? (
        <>
          <ActionButtons post={post ?? null} refetch={() => void refetch()} />
          <LikesDetails users={usersWhoLiked} />
          <Comments fullSection={props.fullSection} post={post} refetch={() => void refetch()} />
        </>
      ) : (
        <p className="font-medium">
          <Link href={PAGES.SINGIN} className="link-primary link">
            Zaloguj się
          </Link>
          , aby polubić, zaznaczyć czy skomentować post.
        </p>
      )}
    </div>
  );
};

export default Post;
