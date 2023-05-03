import React, { useRef } from "react";
import { useSession } from "next-auth/react";
import { usePostContext } from "../PostContext";
import { pages } from "~/constants";
import { timeFromNow } from "~/utils/other";

import { Box, Flex, Icon, UserCard } from "~/components/Shared";
import { useDropdown } from "~/hooks";
import * as Dropdown from "~/components/Utils/Dropdown";
import Link from "next/link";
import EllipsisHorizontalIcon from "@heroicons/react/24/outline/EllipsisHorizontalIcon";
import LinkToAuthorProfileButton from "./DropdownButtons/LinkToAuthorProfileButton";
import DeletePostButton from "./DropdownButtons/DeletePostButton";
import { useGlobalModals } from "~/providers/GlobalModalsProvider/useGlobalModals";

const HeaderContainer = () => {
  const { post } = usePostContext();
  const currentUser = useSession().data?.user;
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);
  const { toggle: toggleDropdown, ref, show } = useDropdown([dropdownTriggerRef]);
  const { setId } = useGlobalModals(state => state.deletePostModal);

  const openDeleteModal = () => setId(post.id);

  const isCurrentUserAuthor = Boolean(post.author.id == currentUser?.id && currentUser?.id);

  return (
    <Flex justify="space-between">
      <Link href={pages.profile(post.author.id)}>
        <UserCard
          name={post.author.name}
          src={post.author.image}
          secondaryText={timeFromNow(post.createdAt)}
        />
      </Link>
      <Box style={{ position: "relative" }}>
        <Icon ref={dropdownTriggerRef} onClick={toggleDropdown}>
          <EllipsisHorizontalIcon />
        </Icon>

        <Dropdown.Wrapper ref={ref} show={show}>
          {!isCurrentUserAuthor && (
            <Dropdown.Item>
              <LinkToAuthorProfileButton href={pages.profile(post.author.id)} />
            </Dropdown.Item>
          )}

          {isCurrentUserAuthor && (
            <Dropdown.Item onClick={openDeleteModal}>
              <DeletePostButton />
            </Dropdown.Item>
          )}
        </Dropdown.Wrapper>
      </Box>
    </Flex>
  );
};

export default HeaderContainer;
