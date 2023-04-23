import React, { useRef } from "react";
import { type User } from "@prisma/client";
import {
  ModalContent,
  ModalTitle,
  Modal,
  ModalFooter,
  ModalScrollableList,
} from "~/hooks/useSetupModal";
import { useInfiniteLikes } from "../../../components/Post/hooks";
import { useOnEndOffScroll } from "~/hooks/useOnEndOffScroll";

import Link from "next/link";
import { UserCard } from "~/components/Global";
import { PAGES } from "~/constants";
import { useGlobalModals } from "~/store/useGlobalModals";

const PostLikesModal = () => {
  const { id, setId } = useGlobalModals((state) => state.postLikesModal);
  const { likes, fetchNextPage } = useInfiniteLikes(id);
  const listRef = useRef<HTMLDivElement>(null);
  useOnEndOffScroll(listRef, () => void fetchNextPage(), { offsetBottom: 100 });

  const close = () => setId(null);

  if (!id) return <></>;

  return (
    <Modal onClose={close}>
      <ModalTitle>Lista osób, które polubiła ten post</ModalTitle>
      <ModalContent>
        <ModalScrollableList ref={listRef}>
          {likes.map((like) => (
            <UserCardAsLink key={like.id} user={like.user} href={PAGES.PROFILE(like.user.id)} />
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

export default PostLikesModal;

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
