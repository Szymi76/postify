import { User } from "@prisma/client";
import React, { useRef, useState } from "react";
import { Avatar } from "../../Global";
import Link from "next/link";
import LikesDetailText from "./LikesDetailText";
import ModalUsersList from "./ModaUsersList";
import { PAGES } from "~/constants";
import { useModal, Modal, ModalTitle, ModalContent } from "~/hooks/useModal";

type LikesDetailsProps = { users: User[] };
const LikesDetails = (props: LikesDetailsProps) => {
  const modalTriggerRef = useRef<HTMLDivElement>(null);
  const { open, modalProps } = useModal([modalTriggerRef]);

  const limitedUsers = props.users.slice(0, 2);
  const extraLikesCount = props.users.length - limitedUsers.length;

  return (
    <div className="flex items-center">
      <div className="avatar-group -space-x-6">
        {/* AWATARY PIERWSZYCH DWÓCH UŻYTKOWNIK, KTÓRY POLUBILI POST, JEŚLI ISTNIEJĄ */}
        {limitedUsers.map((user) => {
          return (
            <Link
              key={user.id}
              href={PAGES.PROFILE(user.id)}
              className="mr-2 flex items-center duration-100 hover:scale-95"
            >
              <Avatar src={user.image} placeholderText={user.name} size="small" />
            </Link>
          );
        })}

        {/* AVATAR Z LICZBĄ DODATKOWYCH POLUBIEŃ */}
        {extraLikesCount > 0 && (
          <div
            ref={modalTriggerRef}
            className="tooltip"
            data-tip="Pokaż więcej osób"
            onClick={open}
          >
            <div className="placeholder avatar ml-2 cursor-pointer duration-100 hover:scale-90">
              <div className=" h-8 w-8 rounded-full bg-slate-200">
                <span className="text-sm font-medium">+{extraLikesCount}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* TEKST Z INFORMACJĄ O LICZBIE POLUBIEŃ */}
      <LikesDetailText likesCount={props.users.length} />

      {/* MODAL Z LISTĄ UŻYTKOWNIKÓW, KTÓRZY POLUBILI POST */}
      <Modal {...modalProps}>
        <ModalTitle>Lista osób, które polubiła ten post</ModalTitle>
        <ModalContent>
          <ModalUsersList usersIds={props.users.map((user) => user.id)} />
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LikesDetails;
