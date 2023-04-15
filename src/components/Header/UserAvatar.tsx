import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import Avatar from "../Global/Avatar";
import PopoutMenu from "./PopoutMenu";
import { useBreakpoint } from "~/hooks/useBreakpoint";
import Link from "next/link";
import { PAGES } from "~/constants";

const UserAvatar = () => {
  const currentUser = useSession().data!.user;
  const avatarRef = useRef<HTMLDivElement>(null);
  const popoutMenuRef = useOutsideClick<HTMLDivElement>(() => setShow(false), [avatarRef]);
  const [show, setShow] = useState(false);
  const { breakpoint, getPixels } = useBreakpoint();

  const currentBreakpointAsPixels = getPixels(breakpoint);

  if (currentBreakpointAsPixels > getPixels("sm")) {
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
  } else {
    return (
      <Link href={PAGES.PROFILE(currentUser.id)} className="flex items-center">
        <Avatar src={currentUser.image} placeholderText={currentUser.name} />
      </Link>
    );
  }
};

export default UserAvatar;
