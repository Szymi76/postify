import React from "react";
import SingleActionButton from "../SingleActionButton";
import OutlineHeartIcon from "@heroicons/react/24/outline/HeartIcon";
import SolidHeartIcon from "@heroicons/react/24/solid/HeartIcon";
import { api } from "~/utils/api";

type LikeButtonProps = { postId: string };
const LikeButton = (props: LikeButtonProps) => {
  const { data: like } = api.post.isPostLikedByCurrentUser.useQuery({ postId: props.postId });
  const { mutateAsync: toggleLike } = api.post.toggleLike.useMutation();
  const utils = api.useContext();
  const isLiked = Boolean(like);

  const handleTogglePostLike = async () => {
    await toggleLike({ postId: props.postId });
    await utils.post.isPostLikedByCurrentUser.refetch({ postId: props.postId });
  };

  return (
    <SingleActionButton
      onClick={() => void handleTogglePostLike()}
      tooltipText={isLiked ? "Usuń polubienie" : "Polub"}
      tooltipAnchor="right"
    >
      {isLiked ? (
        <SolidHeartIcon className="h-7 text-red-600" />
      ) : (
        <OutlineHeartIcon className="h-7 hover:text-red-500" />
      )}
    </SingleActionButton>
  );
};

export default LikeButton;
