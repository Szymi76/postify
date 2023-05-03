import React from "react";
import { type ButtonBasedOnFriendshipStatusProps } from ".";
import { api } from "~/utils/api";
import { Button } from "~/components/Shared";

const FriendButton = (props: ButtonBasedOnFriendshipStatusProps) => {
  const { mutateAsync: removeFriend } = api.friendship.remove.useMutation();
  const utils = api.useContext();

  const handleClick = async () => {
    await removeFriend({ friendshipId: props.friendshipId });
    await utils.friendship.getFriendshipWithUser.refetch({ userId: props.otherUserId });
  };

  return (
    <Button color="secondary" onClick={() => void handleClick()}>
      Usuń ze znajomych
    </Button>
  );
};

export default FriendButton;
