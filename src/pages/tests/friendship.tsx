import { Friendship, Notification, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

import { api } from "~/utils/api";

type FriendshipStatus = "friend" | "sent" | "received" | "no-friend";

type ExtendedFriendship = Friendship & {
  sender: User;
  receiver: User;
};

const Page = () => {
  const session = useSession();
  const { data: friendships } = api.friendship.list.useQuery({ userId: undefined });
  const { data: users } = api.users.getAll.useQuery(undefined, { refetchOnMount: false });
  const { mutate: sendFriendRequest } = api.friendship.send.useMutation();
  const { mutate: responseToFriendRequest } = api.friendship.response.useMutation();
  const { mutate: removeUserFromFriends } = api.friendship.remove.useMutation();
  const { data: notifications, refetch } = api.notification.notSeen.useQuery();
  const { mutate: markAsSeen, isSuccess } = api.notification.markAsSeen.useMutation();

  useEffect(() => void refetch(), [isSuccess]);

  if (!session || !session.data) return <h1>Nie jesteś zalogowany</h1>;

  const currentUser = session.data.user;

  const usersWithoutMe =
    users && friendships ? users.filter((user) => user.id != currentUser.id) : [];

  // pobieranie znajomości z danym użytkownikiem
  const getFriendship = (userId: string) => {
    return friendships!.find(
      ({ senderId, receiverId }) =>
        (senderId == currentUser.id && receiverId == userId) ||
        (senderId == userId && receiverId == currentUser.id)
    );
  };

  // zwracanie statusu znajomości z danym użytkownikiem
  const getFriendshipStatus = (userId: string, friendship?: ExtendedFriendship) => {
    let status: FriendshipStatus = "no-friend";
    if (friendship) {
      if (friendship.status == "pending") {
        if (friendship.senderId == userId) status = "received";
        else status = "sent";
      } else status = "friend";
    }

    return status;
  };

  const handleActionBasedOnStatus = (
    status: FriendshipStatus,
    userId: string,
    friendshipId?: string,
    action?: "accept" | "reject"
  ) => {
    if (status == "no-friend") sendFriendRequest({ receiverId: userId });
    if (!friendshipId) return;
    if (status == "friend") removeUserFromFriends({ friendshipId });
    if (!action) return;
    if (status == "received") responseToFriendRequest({ friendshipId, action });
  };

  const getButtonText = (status: FriendshipStatus) => {
    if (status == "friend") return "Usuń ze znajomych";
    if (status == "no-friend") return "Dodaj do znajomych";
    if (status == "sent") return "Oczekiwanie na przyjęcie do znajomych";
    return "";
  };

  return (
    <main>
      <div className="m-2 w-min whitespace-nowrap border border-primary p-2">
        <p className="font-semibold text-primary">LOGGED AS:</p>
        <p className=" text-primary">{session.data.user.name}</p>
        <p className=" text-primary">{session.data.user.email}</p>
      </div>
      {usersWithoutMe.map((user) => {
        const friendship = getFriendship(user.id);
        const status = getFriendshipStatus(user.id, friendship);
        const text = getButtonText(status);

        const onClick = (action?: "accept" | "reject") =>
          handleActionBasedOnStatus(status, user.id, friendship?.id, action);

        return <UserCard key={user.id} user={user} status={status} text={text} onClick={onClick} />;
      })}
      <div className="m-2 border p-2">
        <h4 className="mb-2 underline">POWIADOMIENIA</h4>
        {notifications &&
          notifications.map((noti) => {
            return (
              <NotificationCard
                key={noti.id}
                noti={noti}
                onClick={() => markAsSeen({ notificationsIds: [noti.id] })}
              />
            );
          })}
      </div>
    </main>
  );
};

export default Page;

const UserCard = ({
  user,
  onClick,
  text,
  status,
}: {
  user: User;
  onClick: (action?: "accept" | "reject") => void;
  text: string;
  status: FriendshipStatus;
}) => {
  return (
    <li className="m-2 flex justify-between gap-5 border p-2">
      <h4>NAME: {user.email}</h4>
      <h5>EMAIL: {user.name}</h5>
      <h6>ID: {user.id}</h6>
      {status == "received" ? (
        <div className="flex flex-col gap-1">
          <button className="btn-success btn" onClick={() => onClick("accept")}>
            Zaakcteptuj zaproszenie
          </button>
          <button className="btn-error btn" onClick={() => onClick("reject")}>
            Odrzuć zaproszenie
          </button>
        </div>
      ) : (
        <button className="btn-primary btn" onClick={() => void onClick()}>
          {text}
        </button>
      )}
    </li>
  );
};

const NotificationCard = ({ noti, onClick }: { noti: Notification; onClick: () => void }) => {
  return (
    <div className="border p-2">
      <h5>TEXT: {noti.text}</h5>
      <h6>TYPE: {noti.type}</h6>
      <button className="btn-warning btn" onClick={onClick}>
        ZANACZ JAKO ZOBACZONE
      </button>
    </div>
  );
};
