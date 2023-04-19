import React from "react";
import { api } from "~/utils/api";
import { usePostContext } from "../../PostContext";

import ActionButtonWrapper from "./ActionButtonWrapper";
import OutlineHeartIcon from "@heroicons/react/24/outline/HeartIcon";
import SolidHeartIcon from "@heroicons/react/24/solid/HeartIcon";

const LikeButtonContainer = () => {
  const { id: postId } = usePostContext().post;
  const { data: like } = api.post.isPostLikedByCurrentUser.useQuery({ postId });
  const { mutateAsync: toggleLike } = api.post.toggleLike.useMutation();
  const utils = api.useContext();

  const isLiked = Boolean(like);

  const handleTogglePostLike = async () => {
    await toggleLike({ postId });
    await utils.post.isPostLikedByCurrentUser.refetch({ postId });
    await utils.post.getPostById.refetch({ postId });
  };

  return (
    <ActionButtonWrapper
      onClick={() => void handleTogglePostLike()}
      tooltipText={isLiked ? "Usuń polubienie" : "Polub"}
      tooltipAnchor="right"
    >
      {isLiked ? (
        <SolidHeartIcon className="h-7 text-red-600" />
      ) : (
        <OutlineHeartIcon className="h-7 hover:text-red-500" />
      )}
    </ActionButtonWrapper>
  );
};

export default LikeButtonContainer;
