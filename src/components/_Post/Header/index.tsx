import React, { useRef, useState } from "react";
import { RouterOutputs } from "~/utils/api";
import EllipsisHorizontalIcon from "@heroicons/react/24/outline/EllipsisHorizontalIcon";
import { Avatar } from "~/components/Global";
import { timeFromNow } from "~/utils/other";
import Link from "next/link";
import { PAGES } from "~/constants";
import { useDropdown, Dropdown, DropdownItem } from "~/hooks/useDropdown";
import { useModal, Modal } from "~/hooks/useModal";
import DeletePostModalContent from "./DropdownModals/DeletePostModalContent";
import { useSession } from "next-auth/react";
import AuthorLinkButton from "./DropdownButtons/AuthorLinkButton";
import OpenDeleteModalButton from "./DropdownButtons/OpenDeleteModalButton";

type HeaderProps = { post: RouterOutputs["post"]["getPostById"]; refetch: () => void };
const Header = (props: HeaderProps) => {
  const post = props.post!;
  const currentUser = useSession().data?.user;
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);
  const deleteModalTriggerRef = useRef<HTMLDivElement>(null);
  const { toggle: toggleDropdown, dropdownProps } = useDropdown([dropdownTriggerRef]);
  const { open, close, modalProps } = useModal([deleteModalTriggerRef]);

  const isCurrentUserAuthor = Boolean(props.post?.author.id == currentUser?.id && currentUser?.id);

  return (
    <div className="flex justify-between">
      <div className="flex gap-3">
        <Avatar src={post.author.image} placeholderText={post.author.name} />
        <div>
          <Link href={PAGES.PROFILE(post.author.id)}>
            <h3 className="font-semibold">{post?.author.name}</h3>
          </Link>
          <p className="text-sm text-gray-500">{timeFromNow(post.createdAt)}</p>
        </div>
      </div>
      <div className="relative">
        <button
          ref={dropdownTriggerRef}
          className="duration-100 hover:scale-95 active:scale-75"
          onClick={toggleDropdown}
        >
          <EllipsisHorizontalIcon className="h-7 text-gray-500" />
        </button>

        <Dropdown {...dropdownProps} anchor="left">
          {!isCurrentUserAuthor && (
            <DropdownItem>
              <AuthorLinkButton authorId={post.author.id} />
            </DropdownItem>
          )}

          {isCurrentUserAuthor && (
            <DropdownItem ref={deleteModalTriggerRef} onClick={open}>
              <OpenDeleteModalButton />
            </DropdownItem>
          )}

          <Modal {...modalProps}>
            <DeletePostModalContent postId={post.id} closeModal={close} />
          </Modal>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
