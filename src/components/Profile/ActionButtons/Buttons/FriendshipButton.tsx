import { useSession } from "next-auth/react";
import React from "react";
import { RouterOutputs, api } from "~/utils/api";
import ButtonBasedOnFriendshipStatus from "./ButtonsBasedOnFriendshipStatus";

function getFriendshipStatus(
  currentUserId: string,
  friendship: RouterOutputs["friendship"]["getFriendshipWithUser"]
): FriendshipStatus {
  if (friendship == null) return "not-friend";
  if (friendship.status == "accepted") return "friend";
  if (friendship.senderId == currentUserId) return "waiting-for-acception";
  return "got-friend-request";
}

export type FriendshipStatus =
  | "friend"
  | "not-friend"
  | "waiting-for-acception"
  | "got-friend-request";

type FriendshipButtonProps = { userId: string };
const FriendshipButton = (props: FriendshipButtonProps) => {
  const currentUser = useSession().data?.user;
  const { data: friendship } = api.friendship.getFriendshipWithUser.useQuery({
    userId: props.userId,
  });

  if (!currentUser || currentUser.id == props.userId) return <></>;

  const friendshipStatus = getFriendshipStatus(currentUser.id, friendship ?? null);

  return (
    <div className="pt-5">
      <ButtonBasedOnFriendshipStatus
        currentUserId={currentUser.id}
        otherUserId={props.userId}
        friendshipId={friendship?.id ?? ""}
        friendshipStatus={friendshipStatus}
      />
    </div>
  );
};

export default FriendshipButton;
