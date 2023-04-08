import React, { useRef, useState } from "react";

import { RouterOutputs, api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import ShareDropwon from "./ShareDropwon";
import LikeButton from "./Buttons/LikeButton";
import ShareButton from "./Buttons/ShareButton";
import BookmarkButton from "./Buttons/BookmarkButton";

type ActionButtonsProps = { post: RouterOutputs["post"]["getPostById"]; refetch: () => void };
const ActionButtons = (props: ActionButtonsProps) => {
  const post = props.post!;
  const { mutateAsync: togglePostLike } = api.post.toggleLike.useMutation();
  const { mutateAsync: togglePostBookmark } = api.post.toggleBookmarked.useMutation();
  const { data: bookmarked, refetch: refetchBookmarked } =
    api.post.isPostBookmarkedByCurrentUser.useQuery({ postId: post.id });
  const currentUser = useSession().data?.user;
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const shareIconRef = useRef(null);
  const shareDropdownRef = useOutsideClick<HTMLDivElement>(
    () => setShowShareDropdown(false),
    [shareIconRef]
  );

  const isLiked = post?.likes.map((like) => like.user.id).includes(currentUser?.id ?? "");
  const isBookmarked = Boolean(bookmarked);

  const handleTogglePostLike = async () => {
    try {
      await togglePostLike({ postId: post.id });
      props.refetch();
    } catch (err) {
      console.warn("Aby polubić post musisz być zalogowany");
    }
  };

  const handleTogglePostBookmark = async () => {
    try {
      await togglePostBookmark({ postId: post.id });
      await refetchBookmarked();
      props.refetch();
    } catch (err) {
      console.warn("Aby zaznaczyć post musisz być zalogowany");
    }
  };

  const toggleShareDropdown = () => setShowShareDropdown(!showShareDropdown);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* PRZYCISK DO ZMIANY POLUBIENIA POSTU */}
        <LikeButton isLiked={isLiked} onClick={() => void handleTogglePostLike()} />

        {/* PRZYCISK DO OTWIERANIA/ZAMYKANIA SHARE DROPDOWNA */}
        <div className="relative flex items-center ">
          <ShareButton ref={shareIconRef} onClick={toggleShareDropdown} />
          {showShareDropdown && <ShareDropwon ref={shareDropdownRef} postId={post.id} />}
        </div>
      </div>
      <div className="flex gap-2">
        {/* PRZYCISK DO ZMIANY ZAZNACZENIA POSTU */}
        <BookmarkButton
          isBookmarked={isBookmarked}
          onClick={() => void handleTogglePostBookmark()}
        />
      </div>
    </div>
  );
};

export default ActionButtons;
