import React from "react";
import { NotificationCard } from "~/components/Global";
import WidgetSkeleton from "../WidgetSkeleton";
import { useSession } from "next-auth/react";
import EllipsisHorizontalIcon from "@heroicons/react/24/outline/EllipsisHorizontalIcon";
import { useInfiniteNotifications } from "./hooks";
import { useGlobalModals } from "~/store/useGlobalModals";

const NotificationsWidget = () => {
  const { open } = useGlobalModals((state) => state.notificationsModal);
  const currentUser = useSession().data?.user;
  const { notifications, isLoading } = useInfiniteNotifications({ limit: 3 });

  if (!currentUser) return <></>;
  if (isLoading) return <WidgetSkeleton />;

  const zeroNotifications = notifications?.length == 0 && !isLoading;
  const limitedNotifications = notifications.slice(0, 3);

  return (
    <div className="layout sticky top-0 hidden h-min w-[300px] 2xl:block">
      <div className="flex justify-between">
        <h2 className="mb-3 text-xl font-semibold">Aktywności</h2>
        <div className="tooltip" data-tip="Pokaż wszystkie powiadomienia">
          <EllipsisHorizontalIcon className="icon h-6" onClick={open} />
        </div>
      </div>
      {zeroNotifications && <p className="text-sm text-gray-500">Brak nowych powiadomień</p>}
      <div className="flex flex-col gap-1">
        {limitedNotifications?.map((noti) => {
          return <NotificationCard key={noti.id} notification={noti} />;
        })}
      </div>
    </div>
  );
};

export default NotificationsWidget;
