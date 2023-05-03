import React from "react";
import { api } from "~/utils/api";
import { usePostContext } from "../../PostContext";

import OutlineBookmarkIcon from "@heroicons/react/24/outline/BookmarkIcon";
import SolidBookmarkIcon from "@heroicons/react/24/solid/BookmarkIcon";
import { Icon, Tooltip } from "~/components/Shared";
import styled from "styled-components";

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
    <Tooltip
      id="BookmarkButtonContainer"
      content={isBookmarked ? "Usuń z zaznaczonych" : "Dodaj do zaznaczonych"}
    >
      <Icon onClick={() => void handleTogglePostBookmark()}>
        {isBookmarked ? (
          <SolidBookmarkIcon height={28} width={28} color="rgb(234 179 8)" />
        ) : (
          <StyledOutlineBookmarkIcon height={28} width={28} />
        )}
      </Icon>
    </Tooltip>
  );
};

export default BookmarkButtonContainer;

const StyledOutlineBookmarkIcon = styled(OutlineBookmarkIcon)`
  :hover {
    color: rgb(234 179 8);
  }
`;
