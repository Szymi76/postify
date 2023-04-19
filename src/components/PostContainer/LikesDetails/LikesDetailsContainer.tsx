import React, { useRef } from "react";
import { User } from "@prisma/client";
import { PAGES } from "~/constants";
import { usePostContext } from "../PostContext";

import { Avatar } from "../../Global";
import { useModal, Modal } from "~/hooks/useModal";
import LikesTextInfo from "./LikesTextInfo";
import Link from "next/link";
import LikesUsersListModalContentContainer from "../ModalsContents/LikesUsersListModalContentContainer";

const LikesDetailsContainer = () => {
  const { post } = usePostContext();
  const modalTriggerRef = useRef<HTMLDivElement>(null);
  const { open, modalProps } = useModal([modalTriggerRef]);

  const users = post.likes.map((user) => user.user);
  const limitedUsers = users.slice(0, 2);
  const extraLikesCount = users.length - limitedUsers.length;
  const usersIds = users.map((user) => user.id);

  return (
    <div className="flex items-center">
      <div className="avatar-group -space-x-6">
        {limitedUsers.map((user) => (
          <UserAvatarAsLink key={user.id} user={user} />
        ))}

        {extraLikesCount > 0 && (
          <div
            ref={modalTriggerRef}
            className="tooltip"
            data-tip="Pokaż więcej osób"
            onClick={open}
          >
            <UserAvatarPlaceholder extraLikesCount={extraLikesCount} />
          </div>
        )}
      </div>

      <LikesTextInfo likesCount={users.length} />

      <Modal {...modalProps}>
        <LikesUsersListModalContentContainer usersIds={usersIds} />
      </Modal>
    </div>
  );
};

export default LikesDetailsContainer;

type UserAvatarAsLinkProps = { user: User };
const UserAvatarAsLink = (props: UserAvatarAsLinkProps) => {
  return (
    <Link
      key={props.user.id}
      href={PAGES.PROFILE(props.user.id)}
      className="mr-2 flex items-center duration-100 hover:scale-95"
    >
      <Avatar src={props.user.image} placeholderText={props.user.name} size="small" />
    </Link>
  );
};

type UserAvatarPlaceholder = { extraLikesCount: number };
const UserAvatarPlaceholder = (props: UserAvatarPlaceholder) => {
  return (
    <div className="placeholder avatar ml-2 cursor-pointer duration-100 hover:scale-90">
      <div className=" h-8 w-8 rounded-full bg-slate-200">
        <span className="text-sm font-medium">+{props.extraLikesCount}</span>
      </div>
    </div>
  );
};
