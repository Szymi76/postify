import React from "react";
import { useSession } from "next-auth/react";
import { pages } from "~/constants";
import { api } from "~/utils/api";
import { PostContext } from "./PostContext";

import Link from "next/link";
import PostContainerSkeleton from "./PostContainerSkeleton";
import HeaderContainer from "./Header/HeaderContainer";
import ContentContainer from "./Content/ContentContainer";
import ActionButtonsContainer from "./ActionButtons/ActionButtonsContainer";
import LikesDetailsContainer from "./LikesDetails/LikesDetailsContainer";
import CommentsContainer from "./Comments/CommentsContainer";
import { ActionText, Flex, Paper } from "~/components/Shared";

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
      <Paper style={{ width: "100%" }}>
        <Flex direction="column" gap="lg">
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
        </Flex>
      </Paper>
    </PostContext.Provider>
  );
};

export default PostContainer;

const LinkToSignInPage = () => {
  return (
    <Flex>
      <Link href={pages.signin}>
        <ActionText>Zaloguj się</ActionText>
      </Link>
      , aby polubić, zaznaczyć czy skomentować post.
    </Flex>
  );
};
