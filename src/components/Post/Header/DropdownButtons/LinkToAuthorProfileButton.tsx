import React from "react";
import Link from "next/link";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";

type LinkToAuthorProfileButtonProps = { href: string };
const LinkToAuthorProfileButton = (props: LinkToAuthorProfileButtonProps) => {
  return (
    <Link href={props.href} className="flex items-center gap-1">
      <UserCircleIcon className="h-6" />
      <p className="whitespace-nowrap text-sm font-medium">Zobacz profil autora</p>
    </Link>
  );
};

export default LinkToAuthorProfileButton;
