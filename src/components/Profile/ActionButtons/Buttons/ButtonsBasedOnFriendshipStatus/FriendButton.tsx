import React from "react";
import { ButtonBasedOnFriendshipStatusProps } from ".";
import { api } from "~/utils/api";

const FriendButton = (props: ButtonBasedOnFriendshipStatusProps) => {
  const { mutateAsync: removeFriend } = api.friendship.remove.useMutation();
  const utils = api.useContext();

  const handleClick = async () => {
    await removeFriend({ friendshipId: props.friendshipId });
    await utils.friendship.getFriendshipWithUser.refetch({ userId: props.otherUserId });
  };

  return (
    <button className="btn-secondary btn-sm btn" onClick={() => void handleClick()}>
      Usuń ze znajomych
    </button>
  );
};

export default FriendButton;
