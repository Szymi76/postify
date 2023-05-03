import React from "react";
import { type ButtonBasedOnFriendshipStatusProps } from ".";
import { api } from "~/utils/api";
import { Button, Flex } from "~/components/Shared";

const GotFriendRequestButton = (props: ButtonBasedOnFriendshipStatusProps) => {
  const { mutateAsync: responseToFriendRequest } = api.friendship.response.useMutation();
  const utils = api.useContext();

  const handleAcceptingFriendRequest = async () => {
    await responseToFriendRequest({ friendshipId: props.friendshipId, action: "accept" });
    await utils.friendship.getFriendshipWithUser.refetch({ userId: props.otherUserId });
  };

  const handleRejectingFriendRequest = async () => {
    await responseToFriendRequest({ friendshipId: props.friendshipId, action: "reject" });
    await utils.friendship.getFriendshipWithUser.refetch({ userId: props.otherUserId });
  };

  return (
    <Flex direction="column" gap="sm">
      <Button color="secondary" onClick={() => void handleAcceptingFriendRequest()}>
        Zaakceptuj zaproszenie do znajomcyh
      </Button>
      <Button color="secondary" onClick={() => void handleRejectingFriendRequest()}>
        Odrzuć zaproszenie do znajomcyh
      </Button>
    </Flex>
  );
};

export default GotFriendRequestButton;
