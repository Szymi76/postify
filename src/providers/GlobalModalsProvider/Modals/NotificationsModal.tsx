import React from "react";
import { useGlobalModals } from "../useGlobalModals";
import { useInfiniteNotifications } from "~/hooks/useInfiniteQueryHelpers/useInfiniteNotifications";
import { NotificationCard, Button, List, ListItem, ActionText } from "~/components/Shared";
import { pages } from "~/constants";
import Link from "next/link";
import * as Modal from "~/components/Utils/Modal";

const NotificationsModal = () => {
  const { close } = useGlobalModals(state => state.notificationsModal);
  const { notifications, hasNextPage, fetchNextPage } = useInfiniteNotifications({
    limit: 3,
  });

  return (
    <Modal.Wrapper>
      <Modal.Box onClose={close}>
        <Modal.Title>Aktywności</Modal.Title>
        <Modal.Content>
          <List>
            {notifications?.map(noti => {
              return (
                <ListItem key={noti.id}>
                  <Link href={pages.profile(noti.creatorId)}>
                    <NotificationCard notification={noti} />
                  </Link>
                </ListItem>
              );
            })}
            {hasNextPage && (
              <ActionText onClick={() => void fetchNextPage()}>Pokaż więcej</ActionText>
            )}
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

export default NotificationsModal;
