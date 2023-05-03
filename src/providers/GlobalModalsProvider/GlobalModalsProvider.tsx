import React from "react";
import { useGlobalModals } from "./useGlobalModals";
import DeletePostModal from "./Modals/DeletePostModal";
import FriendsModal from "./Modals/FriendsModal";
import NotificationsModal from "./Modals/NotificationsModal";
import PostLikesModal from "./Modals/PostLikesModal";

const ModalsProvider = () => {
  const { deletePostModal, friendsModal, notificationsModal, postLikesModal } = useGlobalModals();

  return (
    <>
      {deletePostModal.id && <DeletePostModal />}
      {friendsModal.id && <FriendsModal />}
      {notificationsModal.show && <NotificationsModal />}
      {postLikesModal.id && <PostLikesModal />}
    </>
  );
};

export default ModalsProvider;
