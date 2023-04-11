import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import Avatar from "../Global/Avatar";
import PopoutMenu from "./PopoutMenu";

const UserAvatar = () => {
  const currentUser = useSession().data!.user;
  const avatarRef = useRef<HTMLDivElement>(null);
  const popoutMenuRef = useOutsideClick<HTMLDivElement>(() => setShow(false), [avatarRef]);
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <div
        ref={avatarRef}
        className="flex cursor-pointer items-center rounded-full border-2 border-transparent duration-100 hover:border-secondary hover:brightness-95 active:scale-90"
        onClick={() => setShow(!show)}
      >
        <Avatar src={currentUser.image} placeholderText={currentUser.name} />
      </div>
      {show && <PopoutMenu ref={popoutMenuRef} user={currentUser} />}
    </div>
  );
};

export default UserAvatar;
