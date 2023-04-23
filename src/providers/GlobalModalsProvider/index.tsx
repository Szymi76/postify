import React from "react";
import NotificationsModal from "./Modals/NotificationsModal";
import DeletePostModal from "./Modals/DeletePostModal";
import PostLikesModal from "./Modals/PostLikesModal";
import FriendsModal from "./Modals/FriendsModal";

type GlobalModalsProviderProps = { children: React.ReactNode };
const GlobalModalsProvider = (props: GlobalModalsProviderProps) => {
  return (
    <>
      <NotificationsModal />
      <DeletePostModal />
      <PostLikesModal />
      <FriendsModal />
      {props.children}
    </>
  );
};

export default GlobalModalsProvider;
