import React from "react";
import { FriendshipStatus } from "../FriendshipButton";
import FriendButton from "./FriendButton";
import NotFriendButton from "./NotFriendButton";
import GotFriendRequestButton from "./GotFriendRequestButton";
import WaitingForAcceptionButton from "./WaitingForAcceptionButton";

export type ButtonBasedOnFriendshipStatusProps = {
  currentUserId: string;
  otherUserId: string;
  friendshipId: string;
  refetch: () => void;
};

type ButtonsBasedOnFriendshipStatusProps = ButtonBasedOnFriendshipStatusProps & {
  friendshipStatus: FriendshipStatus;
};
const ButtonBasedOnFriendshipStatus = (props: ButtonsBasedOnFriendshipStatusProps) => {
  const buttonProps = {
    currentUserId: props.currentUserId,
    otherUserId: props.otherUserId,
    friendshipId: props.friendshipId,
    refetch: props.refetch,
  };

  switch (props.friendshipStatus) {
    case "friend":
      return <FriendButton {...buttonProps} />;
    case "not-friend":
      return <NotFriendButton {...buttonProps} />;
    case "got-friend-request":
      return <GotFriendRequestButton {...buttonProps} />;
    case "waiting-for-acception":
      return <WaitingForAcceptionButton {...buttonProps} />;
  }
};

export default ButtonBasedOnFriendshipStatus;
