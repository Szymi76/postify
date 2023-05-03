import React from "react";
import { api } from "~/utils/api";
import { usePostContext } from "../../PostContext";

import OutlineHeartIcon from "@heroicons/react/24/outline/HeartIcon";
import SolidHeartIcon from "@heroicons/react/24/solid/HeartIcon";
import { Icon, Tooltip } from "~/components/Shared";
import styled from "styled-components";

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
    <Tooltip id="LikeButtonContainer" content={isLiked ? "Usuń polubienie" : "Polub"}>
      <Icon onClick={() => void handleTogglePostLike()}>
        {isLiked ? (
          <SolidHeartIcon height={28} width={28} color="rgb(220 38 38)" />
        ) : (
          <StyledOutlineHeartIcon height={28} width={28} />
        )}
      </Icon>
    </Tooltip>
  );
};

export default LikeButtonContainer;

const StyledOutlineHeartIcon = styled(OutlineHeartIcon)`
  :hover {
    color: rgb(220 38 38);
  }
`;
