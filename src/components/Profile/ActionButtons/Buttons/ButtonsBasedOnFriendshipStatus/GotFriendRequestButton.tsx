import React from "react";
import { ButtonBasedOnFriendshipStatusProps } from ".";
import { api } from "~/utils/api";

const GotFriendRequestButton = (props: ButtonBasedOnFriendshipStatusProps) => {
  const { mutateAsync: responseToFriendRequest } = api.friendship.response.useMutation();

  const handleAcceptingFriendRequest = async () => {
    await responseToFriendRequest({ friendshipId: props.friendshipId, action: "accept" });
    props.refetch();
  };

  const handleRejectingFriendRequest = async () => {
    await responseToFriendRequest({ friendshipId: props.friendshipId, action: "reject" });
    props.refetch();
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
