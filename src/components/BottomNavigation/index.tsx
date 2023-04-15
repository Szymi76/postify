import React, { forwardRef } from "react";
import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import Link from "next/link";
import { PAGES } from "~/constants";
import { useSession } from "next-auth/react";
import { useSearch } from "~/store";

const BottomNavigation = forwardRef<HTMLDivElement>((props, ref) => {
  const { isOpen, setOpen, forceClose } = useSearch();
  const currentUser = useSession().data?.user;

  const toggleResults = () => {
    if (!isOpen) setOpen(true);
    else forceClose();
  };

  return (
    <div ref={ref} className="btm-nav bg-primary text-white sm:hidden">
      <button>
        <Link href={PAGES.HOME} className="flex h-full w-full items-center justify-center">
          <HomeIcon className="h-7" />
        </Link>
      </button>
      <button onClick={toggleResults}>
        <MagnifyingGlassIcon className="h-7" />
      </button>
      {currentUser && (
        <button>
          <Link
            href={PAGES.PROFILE(currentUser.id)}
            className="flex h-full w-full items-center justify-center"
          >
            <UserIcon className="h-7" />
          </Link>
        </button>
      )}
    </div>
  );
});

BottomNavigation.displayName = "BottomNavigation";
export default BottomNavigation;
