import React, { useRef } from "react";
import { useInfiniteFriends } from "~/hooks/useInfiniteQueryHelpers";
import { useOnEndOffScroll } from "~/hooks/useOnEndOffScroll";
import * as Modal from "~/components/Utils/Modal";
import { Button, List, ListItem, UserCard } from "~/components/Shared";
import { pages } from "~/constants";
import { useGlobalModals } from "../useGlobalModals";
import { timeFromNow } from "~/utils/other";
import Link from "next/link";

const FriendsModal = () => {
  const { id, setId } = useGlobalModals(state => state.friendsModal);
  const { friends, fetchNextPage } = useInfiniteFriends();
  const listRef = useRef<HTMLUListElement>(null);
  useOnEndOffScroll(listRef, () => void fetchNextPage(), { offsetBottom: 100 });

  const close = () => setId(null);

  if (!id) return <></>;

  return (
    <Modal.Wrapper>
      <Modal.Box onClose={close}>
        <Modal.Title>Znajomi</Modal.Title>
        <Modal.Content>
          <List ref={listRef}>
            {friends.map(friend => {
              return (
                <ListItem key={friend.id}>
                  <Link href={pages.profile(friend.id)}>
                    <UserCard
                      src={friend.image}
                      name={friend.name}
                      secondaryText={timeFromNow(friend.lastActive ?? new Date())}
                    />
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

export default FriendsModal;
