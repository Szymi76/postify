import React, { useRef } from "react";
import { useDropdown, Dropdown, DropdownItem } from "~/hooks/useDropdown";
import { usePostContext } from "../PostContext";
import { ReactChild } from "~/types";
import { PAGES } from "~/constants";

import CopyLinkButton from "./ShareDropdownButtons/CopyLinkButton";
import LikeButtonContainer from "./Buttons/LikeButtonContainer";
import ShareButtonContainer from "./Buttons/ShareButtonContainer";
import BookmarkButtonContainer from "./Buttons/BookmarkButtonContainer";

const ActionButtonsContainer = () => {
  const { post } = usePostContext();
  const shareDropdownTriggerIconRef = useRef<HTMLElement>(null);
  const { toggle: toggleDropdown, dropdownProps } = useDropdown([shareDropdownTriggerIconRef]);

  return (
    <div className="flex items-center justify-between">
      <LeftSideButtons>
        <LikeButtonContainer />

        <div className="relative flex items-center ">
          <ShareButtonContainer ref={shareDropdownTriggerIconRef} onClick={toggleDropdown} />
          <Dropdown {...dropdownProps}>
            <DropdownItem>
              <CopyLinkButton href={PAGES.POST(post.id)} />
            </DropdownItem>
          </Dropdown>
        </div>
      </LeftSideButtons>

      <RightSideButtons>
        <BookmarkButtonContainer />
      </RightSideButtons>
    </div>
  );
};

export default ActionButtonsContainer;

const LeftSideButtons = (props: ReactChild) => (
  <div className="flex items-center gap-2">{props.children}</div>
);

const RightSideButtons = (props: ReactChild) => <div className="flex gap-2">{props.children}</div>;
