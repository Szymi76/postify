import React, { useRef } from "react";
import { useDropdown } from "~/hooks";
import * as Dropdown from "~/components/Utils/Dropdown";
import { usePostContext } from "../PostContext";
import { pages } from "~/constants";

import CopyLinkButton from "./ShareDropdownButtons/CopyLinkButton";
import LikeButtonContainer from "./Buttons/LikeButtonContainer";
import ShareButtonContainer from "./Buttons/ShareButtonContainer";
import BookmarkButtonContainer from "./Buttons/BookmarkButtonContainer";
import { Flex } from "~/components/Shared";

const ActionButtonsContainer = () => {
  const { post } = usePostContext();
  const shareDropdownTriggerIconRef = useRef<HTMLElement>(null);
  const { toggle: toggleDropdown, show, ref } = useDropdown([shareDropdownTriggerIconRef]);

  return (
    <Flex items="center" justify="space-between">
      <Flex items="center" gap="md">
        <LikeButtonContainer />

        <Flex style={{ position: "relative" }} items="center">
          <ShareButtonContainer ref={shareDropdownTriggerIconRef} onClick={toggleDropdown} />
          <Dropdown.Wrapper ref={ref} show={show}>
            <Dropdown.Item>
              <CopyLinkButton href={pages.post(post.id)} />
            </Dropdown.Item>
          </Dropdown.Wrapper>
        </Flex>
      </Flex>

      <Flex gap="md">
        <BookmarkButtonContainer />
      </Flex>
    </Flex>
  );
};

export default ActionButtonsContainer;
