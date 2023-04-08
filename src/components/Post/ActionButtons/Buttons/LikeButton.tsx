import React from "react";
import SingleActionButton from "../SingleActionButton";
import OutlineHeartIcon from "@heroicons/react/24/outline/HeartIcon";
import SolidHeartIcon from "@heroicons/react/24/solid/HeartIcon";

type LikeButtonProps = { onClick: () => void; isLiked: boolean };
const LikeButton = (props: LikeButtonProps) => {
  return (
    <SingleActionButton
      onClick={props.onClick}
      tooltipText={props.isLiked ? "Usuń polubienie" : "Polub"}
    >
      {props.isLiked ? (
        <SolidHeartIcon className="h-7 text-red-600" />
      ) : (
        <OutlineHeartIcon className="h-7 hover:text-red-500" />
      )}
    </SingleActionButton>
  );
};

export default LikeButton;
