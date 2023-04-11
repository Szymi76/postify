import React from "react";
import FriendshipButton from "./Buttons/FriendshipButton";

type ActionButtonsProps = { userId: string };
const ActionButtons = (props: ActionButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-1">
      <FriendshipButton userId={props.userId} />
    </div>
  );
};

export default ActionButtons;
