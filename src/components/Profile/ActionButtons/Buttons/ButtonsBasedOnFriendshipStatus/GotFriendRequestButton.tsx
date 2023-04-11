import React from "react";
import { ButtonBasedOnFriendshipStatusProps } from ".";
import { api } from "~/utils/api";

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
    <div className="flex flex-col gap-1">
      <button
        className="btn-secondary btn-sm btn"
        onClick={() => void handleAcceptingFriendRequest()}
      >
        Zaakceptuj zaproszenie do znajomcyh
      </button>
      <button
        className="btn-secondary btn-sm btn"
        onClick={() => void handleRejectingFriendRequest()}
      >
        Odrzuć zaproszenie do znajomcyh
      </button>
    </div>
  );
};

export default GotFriendRequestButton;
