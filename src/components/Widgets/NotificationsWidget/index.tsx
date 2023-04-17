import React from "react";
import { api } from "~/utils/api";
import { NotificationCard } from "~/components/Global";
import WidgetSkeleton from "../WidgetSkeleton";

const NotificationsWidget = () => {
  const { data: notifications, isLoading } = api.notification.notSeen.useQuery({ limit: 5 });

  if (isLoading) return <WidgetSkeleton />;

  const zeroNotifications = notifications?.length == 0 && !isLoading;

  return (
    <div className="layout sticky top-0 hidden h-min w-[300px] 2xl:block">
      <h2 className="mb-2 text-xl font-semibold">Aktywności</h2>
      {zeroNotifications && <p className="text-sm text-gray-500">Brak nowych powiadomień</p>}
      <div className="flex flex-col gap-2">
        {notifications?.map((noti) => {
          return <NotificationCard key={noti.id} notification={noti} />;
        })}
      </div>
    </div>
  );
};

export default NotificationsWidget;
