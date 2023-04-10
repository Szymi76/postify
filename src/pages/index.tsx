import React, { useCallback } from "react";
import CreatePost from "~/components/CreatePost";
import Post from "~/components/Post";
import PostSkeleton from "~/components/Post/PostSkeleton";
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
  useOnEndOfWindowScroll(fetchMorePosts, 50, [isFetching]);

  const postsIds = data?.pages.map((page) => page.items.map((item) => item.id)).flat();

  return (
    <div className="content-wrapper pt-10">
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
  );
};

const requiredPageProps: PageComponentRequiredProps = {
  auth: "for-all",
  header: "include",
};

Home.requiredPageProps = requiredPageProps;
export default Home;
