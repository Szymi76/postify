import React from "react";
import { api } from "~/utils/api";
import { usePostContext } from "../../PostContext";

import ActionButtonWrapper from "./ActionButtonWrapper";
import OutlineBookmarkIcon from "@heroicons/react/24/outline/BookmarkIcon";
import SolidBookmarkIcon from "@heroicons/react/24/solid/BookmarkIcon";

const BookmarkButtonContainer = () => {
  const { id: postId } = usePostContext().post;
  const { data: bookmark } = api.post.isPostBookmarkedByCurrentUser.useQuery({ postId });
  const { mutateAsync: toggleBookmark } = api.post.toggleBookmarked.useMutation();
  const utils = api.useContext();

  const isBookmarked = Boolean(bookmark);

  const handleTogglePostBookmark = async () => {
    await toggleBookmark({ postId: postId });
    await utils.post.isPostBookmarkedByCurrentUser.refetch({ postId });
  };

  return (
    <ActionButtonWrapper
      onClick={() => void handleTogglePostBookmark()}
      tooltipText={isBookmarked ? "Usuń z zaznaczonych" : "Dodaj do zaznaczonych"}
      tooltipAnchor="left"
    >
      {isBookmarked ? (
        <SolidBookmarkIcon className="h-7 text-yellow-500" />
      ) : (
        <OutlineBookmarkIcon className="h-7 hover:text-yellow-500" />
      )}
    </ActionButtonWrapper>
  );
};

export default BookmarkButtonContainer;
