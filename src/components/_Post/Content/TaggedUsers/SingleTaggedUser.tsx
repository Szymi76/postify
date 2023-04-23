import { User } from "@prisma/client";
import React, { useState } from "react";
import UserDetails from "./UserDetails";
import { useFloatingElement } from "~/hooks/useFloatingElement";
import Link from "next/link";

type SingleTaggedUserProps = { user: User; isLastInList: boolean };
const SingleTaggedUser = (props: SingleTaggedUserProps) => {
  const [show, setShow] = useState(false);

  const [triggerRef, elementRef] = useFloatingElement<HTMLParagraphElement, HTMLDivElement>(
    (isHovering) => setShow(isHovering)
  );

  return (
    <div className="relative flex">
      <Link href={`/profile/${props.user.id}`}>
        <p
          className="cursor-pointer whitespace-nowrap text-primary hover:underline"
          ref={triggerRef}
        >
          {props.user.name}
        </p>
      </Link>
      <div ref={elementRef} className="absolute top-6 z-20">
        {show && <UserDetails user={props.user} />}
      </div>
      {!props.isLastInList && <p className="px-1">•</p>}
    </div>
  );
};

export default SingleTaggedUser;
