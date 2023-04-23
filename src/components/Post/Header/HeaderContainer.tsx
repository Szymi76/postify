import React, { useRef } from "react";
import { useSession } from "next-auth/react";
import { usePostContext } from "../PostContext";
import { PAGES } from "~/constants";
import { timeFromNow } from "~/utils/other";

import { UserCard } from "~/components/Global";
import { Dropdown, DropdownItem, useDropdown } from "~/hooks/useDropdown";
import Link from "next/link";
import EllipsisHorizontalIcon from "@heroicons/react/24/outline/EllipsisHorizontalIcon";
import LinkToAuthorProfileButton from "./DropdownButtons/LinkToAuthorProfileButton";
import DeletePostButton from "./DropdownButtons/DeletePostButton";
import { useGlobalModals } from "~/store/useGlobalModals";

const HeaderContainer = () => {
  const { post } = usePostContext();
  const currentUser = useSession().data?.user;
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);
  const { toggle: toggleDropdown, dropdownProps } = useDropdown([dropdownTriggerRef]);
  const { setId } = useGlobalModals((state) => state.deletePostModal);

  const openDeleteModal = () => setId(post.id);

  const isCurrentUserAuthor = Boolean(post.author.id == currentUser?.id && currentUser?.id);

  return (
    <div className="flex justify-between">
      <Link href={PAGES.PROFILE(post.author.id)}>
        <UserCard
          name={post.author.name}
          avatarUrl={post.author.image}
          secondaryText={timeFromNow(post.createdAt)}
          nameStyles={{ fontWeight: "large", size: "md" }}
        />
      </Link>
      <div className="relative">
        <button ref={dropdownTriggerRef} className="icon" onClick={toggleDropdown}>
          <EllipsisHorizontalIcon className="h-7 text-gray-500" />
        </button>

        <Dropdown {...dropdownProps} anchor="left">
          {!isCurrentUserAuthor && (
            <DropdownItem>
              <LinkToAuthorProfileButton href={PAGES.PROFILE(post.author.id)} />
            </DropdownItem>
          )}

          {isCurrentUserAuthor && (
            <DropdownItem onClick={openDeleteModal}>
              <DeletePostButton />
            </DropdownItem>
          )}
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderContainer;
