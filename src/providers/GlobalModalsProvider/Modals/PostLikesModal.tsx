import React, { useRef } from "react";
import { useInfiniteLikes } from "~/hooks/useInfiniteQueryHelpers";
import { useOnEndOffScroll } from "~/hooks/useOnEndOffScroll";
import * as Modal from "~/components/Utils/Modal";
import { Button, List, ListItem, UserCard } from "~/components/Shared";
import { pages } from "~/constants";
import { useGlobalModals } from "../useGlobalModals";
import Link from "next/link";

const PostLikesModal = () => {
  const { id, setId } = useGlobalModals(state => state.postLikesModal);
  const { likes, fetchNextPage } = useInfiniteLikes(id);
  const listRef = useRef<HTMLUListElement>(null);
  useOnEndOffScroll(listRef, () => void fetchNextPage(), { offsetBottom: 100 });

  const close = () => setId(null);

  return (
    <Modal.Wrapper>
      <Modal.Box onClose={close}>
        <Modal.Title>Lista osób, które polubiła ten post</Modal.Title>
        <Modal.Content>
          <List ref={listRef}>
            {likes.map(like => {
              return (
                <ListItem key={like.user.id}>
                  <Link href={pages.profile(like.user.id)}>
                    <UserCard src={like.user.image} name={like.user.name} />
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Modal.Content>
        <Modal.Footer>
          <Button color="secondary" onClick={close}>
            Zamknij
          </Button>
        </Modal.Footer>
      </Modal.Box>
    </Modal.Wrapper>
  );
};

export default PostLikesModal;
