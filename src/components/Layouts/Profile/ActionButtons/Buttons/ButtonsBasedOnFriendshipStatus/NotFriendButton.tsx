import React from "react";
import { type ButtonBasedOnFriendshipStatusProps } from ".";
import { api } from "~/utils/api";
import { Button } from "~/components/Shared";

const NotFriendButton = (props: ButtonBasedOnFriendshipStatusProps) => {
  const { mutateAsync: sendFriendRequest } = api.friendship.send.useMutation();
  const utils = api.useContext();

  const handleClick = async () => {
    await sendFriendRequest({ receiverId: props.otherUserId });
    await utils.friendship.getFriendshipWithUser.refetch({ userId: props.otherUserId });
  };

  return (
    <Button color="secondary" onClick={() => void handleClick()}>
      Dodaj do znajomcyh
    </Button>
  );
};

export default NotFriendButton;
