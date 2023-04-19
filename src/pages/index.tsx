import React, { useRef } from "react";
import CreatePost from "~/components/CreatePost";
import Post from "~/components/Post";
import PostSkeleton from "~/components/Post/PostSkeleton";
import FriendsWidget from "~/components/Widgets/FriendsWidget";
import NotificationsWidget from "~/components/Widgets/NotificationsWidget";
import { useOnEndOffScroll } from "~/hooks/useOnEndOffScroll";
import { PageComponentRequiredProps } from "~/layouts/ComponentRequiredPropsHandler";
import ScrollablePage from "~/layouts/ScrollablePage";
import { api } from "~/utils/api";

const Home = () => {
  const { data, fetchNextPage } = api.post.getInfiniteLatestsPostsIds.useInfiniteQuery(
    { limit: 3 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  const scrollablePageRef = useRef<HTMLDivElement>(null);
  useOnEndOffScroll<HTMLDivElement>(scrollablePageRef, () => void fetchNextPage());

  const postsIds = data?.pages.map((page) => page.items.map((item) => item.id)).flat();

  return (
    <ScrollablePage ref={scrollablePageRef} className="flex justify-center gap-10">
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
      {/* </div> */}
    </ScrollablePage>
  );
};

const requiredPageProps: PageComponentRequiredProps = {
  auth: "for-all",
  header: "include",
};

Home.requiredPageProps = requiredPageProps;
export default Home;
