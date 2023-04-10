import React from "react";
import { ButtonBasedOnFriendshipStatusProps } from ".";
import { api } from "~/utils/api";

const NotFriendButton = (props: ButtonBasedOnFriendshipStatusProps) => {
  const { mutateAsync: sendFriendRequest } = api.friendship.send.useMutation();

  const handleClick = async () => {
    await sendFriendRequest({ receiverId: props.otherUserId });
    props.refetch();
  };

  return (
    <button className="btn-secondary btn-sm btn" onClick={() => void handleClick()}>
      Dodaj do znajomcyh
    </button>
  );
};

export default NotFriendButton;
