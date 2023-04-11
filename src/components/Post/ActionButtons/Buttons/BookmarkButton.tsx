import React from "react";
import SingleActionButton from "../SingleActionButton";
import OutlineBookmarkIcon from "@heroicons/react/24/outline/BookmarkIcon";
import SolidBookmarkIcon from "@heroicons/react/24/solid/BookmarkIcon";
import { api } from "~/utils/api";

type BookmarkButtonProps = { postId: string };
const BookmarkButton = (props: BookmarkButtonProps) => {
  const { data: bookmark } = api.post.isPostBookmarkedByCurrentUser.useQuery({
    postId: props.postId,
  });
  const { mutateAsync: toggleBookmark } = api.post.toggleBookmarked.useMutation();
  const utils = api.useContext();
  const isBookmarked = Boolean(bookmark);

  const handleTogglePostBookmark = async () => {
    await toggleBookmark({ postId: props.postId });
    await utils.post.isPostBookmarkedByCurrentUser.refetch({ postId: props.postId });
  };

  return (
    <SingleActionButton
      onClick={() => void handleTogglePostBookmark()}
      tooltipText={isBookmarked ? "Usuń z zaznaczonych" : "Dodaj do zaznaczonych"}
      tooltipAnchor="left"
    >
      {isBookmarked ? (
        <SolidBookmarkIcon className="h-7 text-yellow-500" />
      ) : (
        <OutlineBookmarkIcon className="h-7 hover:text-yellow-500" />
      )}
    </SingleActionButton>
  );
};

export default BookmarkButton;
