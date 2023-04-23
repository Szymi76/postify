import React, { Ref, useRef } from "react";
import { NotificationCard } from "~/components/Global";
import WidgetSkeleton from "../WidgetSkeleton";
import { useSession } from "next-auth/react";
import EllipsisHorizontalIcon from "@heroicons/react/24/outline/EllipsisHorizontalIcon";
import { Modal, ModalContent, ModalFooter, ModalTitle, useModal } from "~/hooks/useModal";
import { useInfiniteNotifications } from "./hooks";
import { useBottomNav } from "~/store";

const LIMIT = 3;

const NotificationsWidget = () => {
  const currentUser = useSession().data?.user;
  const show = useBottomNav((state) => state.showNotifications);
  const changeShowTo = useBottomNav((state) => state.changeNotificationsShowTo);
  const { notifications, isLoading, hasNextPage, fetchNextPage } = useInfiniteNotifications({
    limit: LIMIT,
  });
  const iconRef = useRef(null);
  const { ref } = useModal([iconRef], () => changeShowTo(false));

  if (!currentUser) return <></>;
  if (isLoading) return <WidgetSkeleton />;

  const zeroNotifications = notifications?.length == 0 && !isLoading;
  const limitedNotifications = notifications.slice(0, LIMIT);

  return (
    <>
      <div className="layout sticky top-0 hidden h-min w-[300px] 2xl:block">
        <div className="flex justify-between">
          <h2 className="mb-3 text-xl font-semibold">Aktywności</h2>
          <EllipsisHorizontalIcon
            ref={iconRef}
            className="icon h-6"
            onClick={() => changeShowTo(true)}
          />
        </div>
        {zeroNotifications && <p className="text-sm text-gray-500">Brak nowych powiadomień</p>}
        <div className="flex flex-col gap-1">
          {limitedNotifications?.map((noti) => {
            return <NotificationCard key={noti.id} notification={noti} />;
          })}
        </div>
      </div>
      <Modal ref={ref} show={show} onClose={() => changeShowTo(false)}>
        <ModalTitle>Aktywności</ModalTitle>
        <ModalContent className="max-h-[325px] justify-start overflow-y-auto">
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
        </ModalContent>
        <ModalFooter>
          <button className="btn-secondary btn-sm btn" onClick={() => changeShowTo(false)}>
            Zamknij
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default NotificationsWidget;
