import React, { useRef, useState } from "react";

import { RouterOutputs, api } from "~/utils/api";
import LikeButton from "./Buttons/LikeButton";
import ShareButton from "./Buttons/ShareButton";
import BookmarkButton from "./Buttons/BookmarkButton";
import { useDropdown, Dropdown, DropdownItem } from "~/hooks/useDropdown";
import CopyLinkButton from "./ShareDropdownButtons/CopyLinkButton";

type ActionButtonsProps = { post: RouterOutputs["post"]["getPostById"] };
const ActionButtons = (props: ActionButtonsProps) => {
  const post = props.post!;
  const shareDropdownTriggerIconRef = useRef<HTMLElement>(null);
  const { toggle: toggleDropdown, dropdownProps } = useDropdown([shareDropdownTriggerIconRef]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* PRZYCISK DO ZMIANY POLUBIENIA POSTU */}
        <LikeButton postId={post.id} />

        {/* PRZYCISK DO OTWIERANIA/ZAMYKANIA SHARE DROPDOWNA */}
        <div className="relative flex items-center ">
          <ShareButton ref={shareDropdownTriggerIconRef} onClick={toggleDropdown} />
          <Dropdown {...dropdownProps}>
            <DropdownItem>
              <CopyLinkButton postId={post.id} />
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      <div className="flex gap-2">
        {/* PRZYCISK DO ZMIANY ZAZNACZENIA POSTU */}
        <BookmarkButton postId={post.id} />
      </div>
    </div>
  );
};

export default ActionButtons;
