import React from "react";
import { ButtonBasedOnFriendshipStatusProps } from ".";
import { api } from "~/utils/api";

const NotFriendButton = (props: ButtonBasedOnFriendshipStatusProps) => {
  const { mutateAsync: sendFriendRequest } = api.friendship.send.useMutation();
  const utils = api.useContext();

  const handleClick = async () => {
    await sendFriendRequest({ receiverId: props.otherUserId });
    await utils.friendship.getFriendshipWithUser.refetch({ userId: props.otherUserId });
  };

  return (
    <button className="btn-secondary btn-sm btn" onClick={() => void handleClick()}>
      Dodaj do znajomcyh
    </button>
  );
};

export default NotFriendButton;
