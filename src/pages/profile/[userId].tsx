import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import PostContainer from "~/components/Layouts/Post/PostContainer";
import PostContainerSkeleton from "~/components/Layouts/Post/PostContainerSkeleton";
import Profile from "~/components/Layouts/Profile/ProfileContainer";
import { Container, Description, Flex, Headline, Select } from "~/components/Shared";
import { useOnEndOffScroll } from "~/hooks";
import { useInfiniteLatestsPostsIds } from "~/hooks/useInfiniteQueryHelpers";
import { ScrollableWrapper, type PageLayout } from "~/layouts/PageLayoutHandler";

type Option = "Najnowsze" | "Najpopularniejsze";

const ProfilePage = () => {
  const router = useRouter();
  const [option, setOption] = useState<Option>("Najnowsze");
  const { query } = router;
  const userId = typeof query.userId == "string" ? query.userId : undefined;
  const scrollableWrapperRef = useRef<HTMLDivElement>(null);
  const { postsIds, isLoading, fetchNextPage } = useInfiniteLatestsPostsIds({
    authorId: userId,
    orderBy: option == "Najnowsze" ? "created-at-desc" : "likes-desc",
  });

  useOnEndOffScroll(scrollableWrapperRef, () => void fetchNextPage(), { offsetBottom: 50 });

  if (typeof userId != "string") return <h1>Użytkownik nie istnieje</h1>;

  return (
    <StyledScrollableWrapper ref={scrollableWrapperRef}>
      <Container>
        <Profile userId={userId} />
        <Flex justify="space-between" style={{ marginTop: 48 }}>
          <Headline size="2xl">Posty</Headline>
          <Select
            options={["Najnowsze", "Najpopularniejsze"]}
            selected={option}
            onChange={option => setOption(option as Option)}
          />
        </Flex>
        <Flex direction="column" gap="2xl" style={{ marginTop: 16 }}>
          {isLoading ? (
            <>
              <PostContainerSkeleton />
              <PostContainerSkeleton />
            </>
          ) : (
            postsIds.map(postId => (
              <PostContainer key={postId} postId={postId} fullSection={false} />
            ))
          )}
          {postsIds.length == 0 && <Description>Trochę tu pusto 🙄</Description>}
        </Flex>
      </Container>
    </StyledScrollableWrapper>
  );
};

const StyledScrollableWrapper = styled(ScrollableWrapper)`
  padding-top: ${props => props.theme.layouts.header.height + 12}px;
  padding-bottom: 12px;
`;

const pageLayout: PageLayout = {
  scrollable: false,
};

ProfilePage.pageLayout = pageLayout;
export default ProfilePage;
