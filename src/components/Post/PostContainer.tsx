import React from "react";
import { useSession } from "next-auth/react";
import { PAGES } from "~/constants";
import { type ReactChild } from "~/types";
import { api } from "~/utils/api";
import { PostContext } from "./PostContext";

import Link from "next/link";
import PostContainerSkeleton from "./PostContainerSkeleton";
import HeaderContainer from "./Header/HeaderContainer";
import ContentContainer from "./Content/ContentContainer";
import ActionButtonsContainer from "./ActionButtons/ActionButtonsContainer";
import LikesDetailsContainer from "./LikesDetails/LikesDetailsContainer";
import CommentsContainer from "./Comments/CommentsContainer";

type PostContainerProps = { postId: string; fullSection: boolean };
const PostContainer = (props: PostContainerProps) => {
  const { postId, fullSection } = props;
  const currentUser = useSession().data?.user;
  const { data: post, isLoading } = api.post.getPostById.useQuery({ postId });

  if (isLoading) return <PostContainerSkeleton />;
  if (!post && !isLoading) {
    return fullSection ? <h1>Post nie istnieje</h1> : <></>;
  }

  return (
    <PostContext.Provider value={{ post, fullSection }}>
      <PostWrapper>
        <HeaderContainer />
        <ContentContainer />
        {currentUser ? (
          <>
            <ActionButtonsContainer />
            <LikesDetailsContainer />
            <CommentsContainer />
          </>
        ) : (
          <LinkToSignInPage />
        )}
      </PostWrapper>
    </PostContext.Provider>
  );
};

export default PostContainer;

const PostWrapper = (props: ReactChild) => {
  return <div className="layout flex w-full flex-col gap-5">{props.children}</div>;
};

const LinkToSignInPage = () => {
  return (
    <p className="font-medium">
      <Link href={PAGES.SINGIN} className="link-primary link">
        Zaloguj się
      </Link>
      , aby polubić, zaznaczyć czy skomentować post.
    </p>
  );
};
