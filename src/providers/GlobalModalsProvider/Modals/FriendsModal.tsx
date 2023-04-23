import React, { useRef } from "react";
import { type User } from "@prisma/client";
import {
  ModalContent,
  ModalTitle,
  Modal,
  ModalFooter,
  ModalScrollableList,
} from "~/hooks/useSetupModal";
import { useInfiniteFriends } from "../../../components/Post/hooks";
import { useOnEndOffScroll } from "~/hooks/useOnEndOffScroll";

import Link from "next/link";
import { UserCard } from "~/components/Global";
import { PAGES } from "~/constants";
import { useGlobalModals } from "~/store/useGlobalModals";
import { timeFromNow } from "~/utils/other";

const FriendsModal = () => {
  const { id, setId } = useGlobalModals((state) => state.friendsModal);
  const { friends, fetchNextPage } = useInfiniteFriends();
  const listRef = useRef<HTMLDivElement>(null);
  useOnEndOffScroll(listRef, () => void fetchNextPage(), { offsetBottom: 100 });

  const close = () => setId(null);

  if (!id) return <></>;

  return (
    <Modal onClose={close}>
      <ModalTitle>Znajomi</ModalTitle>
      <ModalContent>
        <ModalScrollableList ref={listRef}>
          {friends.map((friend) => (
            <UserCardAsLink key={friend.id} friend={friend} href={PAGES.PROFILE(friend.id)} />
          ))}
        </ModalScrollableList>
      </ModalContent>
      <ModalFooter>
        <button className="btn-secondary btn-sm btn" onClick={close}>
          Zamknij
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default FriendsModal;

type UserCardAsLinkProps = { friend: User; href: string };
const UserCardAsLink = (props: UserCardAsLinkProps) => {
  return (
    <Link key={props.friend.id} href={props.href}>
      <UserCard
        avatarUrl={props.friend.image}
        name={props.friend.name}
        secondaryText={timeFromNow(props.friend.lastActive ?? new Date())}
        className="py-2"
      />
    </Link>
  );
};
