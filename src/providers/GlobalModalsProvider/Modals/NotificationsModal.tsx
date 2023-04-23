import React from "react";
import {
  Modal,
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalScrollableList,
} from "../../../hooks/useSetupModal";
import { useGlobalModals } from "~/store/useGlobalModals";
import { useInfiniteNotifications } from "~/components/Widgets/NotificationsWidget/hooks";
import { NotificationCard } from "~/components/Global";

const NotificationsModal = () => {
  const { show, close } = useGlobalModals((state) => state.notificationsModal);
  const { notifications, hasNextPage, fetchNextPage } = useInfiniteNotifications({
    limit: 3,
  });

  if (!show) return <></>;

  return (
    <Modal onClose={close}>
      <ModalTitle>Aktywności</ModalTitle>
      <ModalContent>
        <ModalScrollableList>
          {notifications?.map((noti) => {
            return <NotificationCard key={noti.id} notification={noti} />;
          })}
          {hasNextPage && (
            <p
              className="mt-2 cursor-pointer text-center text-sm text-primary"
              onClick={() => void fetchNextPage()}
            >
              Załaduj więcej
            </p>
          )}
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

export default NotificationsModal;
