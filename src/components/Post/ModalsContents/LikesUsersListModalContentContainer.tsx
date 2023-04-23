import React, { useRef } from "react";
import { User } from "@prisma/client";
import { ModalContent, ModalTitle } from "~/hooks/useModal";
import { useInfiniteUsers } from "../hooks";
import { useOnEndOffScroll } from "~/hooks/useOnEndOffScroll";

import Link from "next/link";
import { UserCard } from "~/components/Global";
import { PAGES } from "~/constants";

type LikesUsersListModalContentContainerProps = { usersIds: string[] };
const LikesUsersListModalContentContainer = (props: LikesUsersListModalContentContainerProps) => {
  const { users, fetchNextPage } = useInfiniteUsers({ ids: props.usersIds });
  const listRef = useRef<HTMLUListElement>(null);
  useOnEndOffScroll(listRef, () => void fetchNextPage(), { offsetBottom: 100 });

  return (
    <>
      <ModalTitle>Lista osób, które polubiła ten post</ModalTitle>
      <ModalContent>
        <ul ref={listRef} className="max-h-[190px] overflow-y-scroll">
          {users.map((user) => (
            <UserCardAsLink key={user.id} user={user} href={PAGES.PROFILE(user.id)} />
          ))}
        </ul>
      </ModalContent>
    </>
  );
};

export default LikesUsersListModalContentContainer;

type UserCardAsLinkProps = { user: User; href: string };
const UserCardAsLink = (props: UserCardAsLinkProps) => {
  return (
    <Link href={props.href}>
      <UserCard
        name={props.user.name}
        avatarUrl={props.user.image}
        className="border-b border-slate-200 py-2 duration-100 hover:bg-gray-100"
      />
    </Link>
  );
};
