import React from "react";
import { NotificationCard } from "~/components/Shared/NotificationCard";
import WidgetSkeleton from "./WidgetSkeleton";
import { useSession } from "next-auth/react";
import EllipsisHorizontalIcon from "@heroicons/react/24/outline/EllipsisHorizontalIcon";
import { useInfiniteNotifications } from "~/hooks/useInfiniteQueryHelpers";
import { useGlobalModals } from "~/providers/GlobalModalsProvider/useGlobalModals";
import {
  List,
  ListItem,
  Flex,
  Paper,
  Headline,
  Tooltip,
  Icon,
  Description,
} from "~/components/Shared";
import { pages } from "~/constants";
import Link from "next/link";
import styled from "styled-components";
import { WidgetWrapper } from "./WidgetWrapper";

const NotificationsWidget = () => {
  const { open } = useGlobalModals(state => state.notificationsModal);
  const currentUser = useSession().data?.user;
  const { notifications, isLoading } = useInfiniteNotifications({ limit: 3 });

  if (!currentUser) return <></>;
  if (isLoading) return <WidgetSkeleton />;

  const zeroNotifications = notifications?.length == 0 && !isLoading;
  const limitedNotifications = notifications.slice(0, 3);

  return (
    <WidgetWrapper>
      <Flex justify="space-between">
        <Headline>Aktywności</Headline>
        <Tooltip id="NotificationsWidget" content="Pokaż wszystkie powiadomienia">
          <Icon>
            <EllipsisHorizontalIcon height={24} width={24} onClick={open} />
          </Icon>
        </Tooltip>
      </Flex>
      {zeroNotifications && <Description>Brak nowych powiadomień</Description>}
      <List>
        {limitedNotifications?.map(noti => {
          return (
            <ListItem key={noti.id}>
              <Link href={pages.profile(noti.creator.id)}>
                <NotificationCard notification={noti} />
              </Link>
            </ListItem>
          );
        })}
      </List>
    </WidgetWrapper>
  );
};

export default NotificationsWidget;
