import React, { useCallback } from "react";
import CreatePost from "~/components/CreatePost";
import Post from "~/components/Post";
import PostSkeleton from "~/components/Post/PostSkeleton";
import { HEADER_HEIGHT } from "~/constants";
import { useOnEndOfWindowScroll } from "~/hooks/useOnEndOfWindowScroll";
import { PageComponentRequiredProps } from "~/layouts/ComponentRequiredPropsHandler";
import { api } from "~/utils/api";

const Home = () => {
  const { data, fetchNextPage, isLoading, isFetching } =
    api.post.getInfiniteLatestsPostsIds.useInfiniteQuery(
      { limit: 3 },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  const fetchMorePosts = () => !isFetching && void fetchNextPage();

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const isScrollAtEnd =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    if (isScrollAtEnd) void fetchMorePosts();
  };

  const postsIds = data?.pages.map((page) => page.items.map((item) => item.id)).flat();
  const height = `calc(100vh - ${HEADER_HEIGHT}px)`;

  return (
    <div className="overflow-y-scroll" style={{ height }} onScroll={handleScroll}>
      <div className="content-wrapper py-10">
        <div className="flex flex-col items-center gap-10">
          <CreatePost />
          {postsIds ? (
            postsIds.map((postId) => <Post key={postId} id={postId} fullSection={false} />)
          ) : (
            <>
              <PostSkeleton />
              <PostSkeleton />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const requiredPageProps: PageComponentRequiredProps = {
  auth: "for-all",
  header: "include",
};

Home.requiredPageProps = requiredPageProps;
export default Home;
