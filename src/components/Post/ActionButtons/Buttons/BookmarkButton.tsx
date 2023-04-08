import React from "react";
import SingleActionButton from "../SingleActionButton";
import OutlineBookmarkIcon from "@heroicons/react/24/outline/BookmarkIcon";
import SolidBookmarkIcon from "@heroicons/react/24/solid/BookmarkIcon";

type BookmarkButtonProps = { isBookmarked: boolean; onClick: () => void };
const BookmarkButton = (props: BookmarkButtonProps) => {
  return (
    <SingleActionButton
      onClick={props.onClick}
      tooltipText={props.isBookmarked ? "Usuń z zaznaczonych" : "Dodaj do zaznaczonych"}
    >
      {props.isBookmarked ? (
        <SolidBookmarkIcon className="h-7 text-yellow-500" />
      ) : (
        <OutlineBookmarkIcon className="h-7 hover:text-yellow-500" />
      )}
    </SingleActionButton>
  );
};

export default BookmarkButton;
