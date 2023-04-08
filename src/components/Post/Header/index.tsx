import React, { useRef, useState } from "react";
import { RouterOutputs } from "~/utils/api";
import EllipsisHorizontalIcon from "@heroicons/react/24/outline/EllipsisHorizontalIcon";
import { Avatar } from "~/components/Global";
import { timeFromNow } from "~/utils/other";
import Dropdown from "./Dropdown";

type HeaderProps = { post: RouterOutputs["post"]["getPostById"]; refetch: () => void };
const Header = (props: HeaderProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const post = props.post!;

  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex justify-between">
      <div className="flex gap-3">
        <Avatar src={post?.author.image} text={post?.author.name} />
        <div>
          <h3 className="font-semibold">{post?.author.name}</h3>
          <p className="text-sm text-gray-500">{timeFromNow(post.createdAt)}</p>
        </div>
      </div>
      <div className="relative">
        <button
          ref={dropdownTriggerRef}
          className="duration-100 hover:scale-95 active:scale-75"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <EllipsisHorizontalIcon className="h-7 text-gray-500" />
        </button>
        <Dropdown
          ref={dropdownTriggerRef}
          show={showDropdown}
          onClose={() => setShowDropdown(false)}
          refetch={props.refetch}
          post={props.post}
        />
      </div>
    </div>
  );
};

export default Header;
