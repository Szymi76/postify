import React from "react";
import { api } from "~/utils/api";
import {
  Description,
  Flex,
  Headline,
  Icon,
  List,
  ListItem,
  Tooltip,
  UserCard,
} from "~/components/Shared";
import { timeFromNow } from "~/utils/other";
import Link from "next/link";
import { pages } from "~/constants";
import WidgetSkeleton from "./WidgetSkeleton";
import { useSession } from "next-auth/react";
import EllipsisHorizontalIcon from "@heroicons/react/24/outline/EllipsisHorizontalIcon";
import { useGlobalModals } from "~/providers/GlobalModalsProvider/useGlobalModals";
import { WidgetWrapper } from "./WidgetWrapper";

const FriendsWidget = () => {
  const { setId } = useGlobalModals(state => state.friendsModal);
  const currentUser = useSession().data?.user;
  const { data: friends, isLoading } = api.friendship.friendsList.useQuery({ limit: 5 });

  const open = () => setId(currentUser!.id);

  if (!currentUser) return <></>;
  if (isLoading) return <WidgetSkeleton />;

  const zeroFriends = friends?.length == 0 && !isLoading;

  return (
    <WidgetWrapper>
      <Flex justify="space-between">
        <Headline>Znajomi</Headline>
        <Tooltip id="NotificationsWidget" content="Pokaż wszystkich znajomych">
          <Icon>
            <EllipsisHorizontalIcon height={24} width={24} onClick={open} />
          </Icon>
        </Tooltip>
      </Flex>
      {zeroFriends && <Description>Nie masz jeszcze żadnych znajomych</Description>}
      <List>
        {friends?.map(friend => {
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
    </WidgetWrapper>
  );
};

export default FriendsWidget;
