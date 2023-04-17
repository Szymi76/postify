import { Notification, User } from "@prisma/client";
import React from "react";
import { createNotificationText, timeFromNow } from "~/utils/other";
import Avatar from "./Avatar";
import Link from "next/link";
import { PAGES } from "~/constants";

type NotificationCardProps = { notification: Notification & { creator: User } };
const NotificationCard = (props: NotificationCardProps) => {
  const { type, creator, createdAt } = props.notification;
  const text = createNotificationText(type, creator.name ?? "Ktoś");

  return (
    <Link href={PAGES.PROFILE(creator.id)} className="flex items-center justify-between gap-2">
      <Avatar src={creator.image} placeholderText={creator.name} />
      <div className="text-sm">
        <h5 className="w-min font-semibold">{creator.name}</h5>
        <p>{text}</p>
        <p className="text-gray-500">{timeFromNow(createdAt)}</p>
      </div>
    </Link>
  );
};

export default NotificationCard;
