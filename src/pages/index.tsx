import React, { useCallback } from "react";
import CreatePost from "~/components/CreatePost";
import Post from "~/components/Post";
import PostSkeleton from "~/components/Post/PostSkeleton";
import FriendsWidget from "~/components/Widgets/FriendsWidget";
import NotificationsWidget from "~/components/Widgets/NotificationsWidget";
import { HEADER_HEIGHT } from "~/constants";
import { useOnEndOfWindowScroll } from "~/hooks/useOnEndOfWindowScroll";
import { PageComponentRequiredProps } from "~/layouts/ComponentRequiredPropsHandler";
import { api } from "~/utils/api";

const Home = () => {
  const { data, fetchNextPage, isFetching } = api.post.getInfiniteLatestsPostsIds.useInfiniteQuery(
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
    <div
      className="flex justify-center gap-10 overflow-y-scroll pt-10"
      style={{ height }}
      onScroll={handleScroll}
    >
      <NotificationsWidget />
      <div className="w-[95%] max-w-3xl">
        <div className="flex flex-col items-center gap-10 pb-10">
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
      <FriendsWidget />
    </div>
  );
};

const requiredPageProps: PageComponentRequiredProps = {
  auth: "for-all",
  header: "include",
};

Home.requiredPageProps = requiredPageProps;
export default Home;
