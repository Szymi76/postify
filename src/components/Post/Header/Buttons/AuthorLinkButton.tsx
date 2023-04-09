import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import Link from "next/link";
import React from "react";
import { PAGES } from "~/constants";

type AuthorLinkButtonProps = { authorId: string };
const AuthorLinkButton = (props: AuthorLinkButtonProps) => {
  return (
    <div className="dropdown-secondary-item border-b-0">
      <div className="dropdown-secondary-item-content ">
        <Link href={PAGES.PROFILE(props.authorId)} className="flex items-center gap-1">
          <UserCircleIcon className="h-6" />
          <p className="whitespace-nowrap text-sm font-medium">Zobacz profil autora</p>
        </Link>
      </div>
    </div>
  );
};

export default AuthorLinkButton;
