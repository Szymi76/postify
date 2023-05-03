import React, { useRef } from "react";
import styled from "styled-components";
import CreatePost from "~/components/Layouts/CreatePost/CreatePostContainer";
import Post from "~/components/Layouts/Post/PostContainer";
import PostSkeleton from "~/components/Layouts/Post/PostContainerSkeleton";
import { Container, Flex } from "~/components/Shared";
import { useInfiniteLatestsPostsIds } from "~/hooks/useInfiniteQueryHelpers";
import FriendsWidget from "~/components/Layouts/Widgets/FriendsWidget";
import NotificationsWidget from "~/components/Layouts/Widgets/NotificationWidget";
import { useOnEndOffScroll } from "~/hooks/useOnEndOffScroll";
import { ScrollableWrapper } from "~/layouts/PageLayoutHandler";

const Home = () => {
  const { postsIds, fetchNextPage } = useInfiniteLatestsPostsIds({ limit: 5 });

  const scrollablePageRef = useRef<HTMLDivElement>(null);
  useOnEndOffScroll<HTMLDivElement>(scrollablePageRef, () => void fetchNextPage(), {
    offsetBottom: 100,
  });

  return (
    <StyledScrollableWrapper ref={scrollablePageRef}>
      <NotificationsWidget />
      <Container style={{ margin: 0 }}>
        <Flex direction="column" items="center" gap="3xl">
          <CreatePost />
          {postsIds ? (
            postsIds.map(postId => <Post key={postId} postId={postId} fullSection={false} />)
          ) : (
            <>
              <PostSkeleton />
              <PostSkeleton />
            </>
          )}
        </Flex>
      </Container>
      <FriendsWidget />
    </StyledScrollableWrapper>
  );
};

export default Home;

const StyledScrollableWrapper = styled(ScrollableWrapper)`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing["2xl"]};
  padding-top: ${props => props.theme.layouts.header.height + 24}px;
`;
