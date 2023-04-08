import { User } from "@prisma/client";
import React, { useRef, useState } from "react";
import { Avatar, Modal } from "../../Global";
import Link from "next/link";
import LikesDetailText from "./LikesDetailText";
import ModalUsersList from "./ModaUsersList";

type LikesDetailsProps = { users: User[] };
const LikesDetails = (props: LikesDetailsProps) => {
  const [showModal, setShowModal] = useState(false);
  const modalTriggerRef = useRef<HTMLDivElement>(null);

  const limitedUsers = props.users.slice(0, 2);
  const extraLikesCount = props.users.length - limitedUsers.length;

  return (
    <div className="flex items-center">
      <div className="avatar-group -space-x-7">
        {/* AWATARY PIERWSZYCH DWÓCH UŻYTKOWNIK, KTÓRY POLUBILI POST, JEŚLI ISTNIEJĄ */}
        {limitedUsers.map((user) => {
          return (
            <Link
              key={user.id}
              href={`profile/${user.id}`}
              className="mr-2 flex items-center duration-100 hover:scale-95"
            >
              <Avatar src={user.image} text={user.name} size="8" />
            </Link>
          );
        })}

        {/* AVATAR Z LICZBĄ DODATKOWYCH POLUBIEŃ */}
        {extraLikesCount > 0 && (
          <div
            ref={modalTriggerRef}
            className="tooltip"
            data-tip="Pokaż więcej osób"
            onClick={() => setShowModal(true)}
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
      <Modal open={showModal} onClose={() => setShowModal(false)} ref={modalTriggerRef}>
        <h2 className="mb-3 text-2xl font-semibold">Lista osób, które polubiła ten post</h2>
        <ModalUsersList usersIds={props.users.map((user) => user.id)} />
      </Modal>
    </div>
  );
};

export default LikesDetails;
