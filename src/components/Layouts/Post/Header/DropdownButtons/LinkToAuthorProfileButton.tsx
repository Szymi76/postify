import React from "react";
import Link from "next/link";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import { Flex, Paragraph } from "~/components/Shared";

type LinkToAuthorProfileButtonProps = { href: string };
const LinkToAuthorProfileButton = (props: LinkToAuthorProfileButtonProps) => {
  return (
    <Link href={props.href}>
      <Flex items="center" gap="sm">
        <UserCircleIcon height={28} width={28} />
        <Paragraph style={{ whiteSpace: "nowrap" }}>Zobacz profil autora</Paragraph>
      </Flex>
    </Link>
  );
};

export default LinkToAuthorProfileButton;
