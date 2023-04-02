import ArrowTopRightOnSquareIcon from "@heroicons/react/24/outline/ArrowTopRightOnSquareIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import ArrowLeftOnRectangleIcon from "@heroicons/react/24/outline/ArrowLeftOnRectangleIcon";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import ListTopContent from "~/components/MainNav/UserMenu/ListTopContent";
import ListItem from "~/components/MainNav/UserMenu/ListItem";
import { useRef, useState } from "react";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import Avatar from "~/components/Actions/Avatar";

export const NavUserMenu = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const currentUser = useSession().data!.user;
  const avatarRef = useRef<HTMLDivElement>(null);
  const menuRef = useOutsideClick<HTMLDivElement>(() => setShow(false), [avatarRef]);

  return (
    <div className="relative">
      {/* AWATAR PO PRAWEJ STRONIE */}
      <div
        ref={avatarRef}
        className="flex cursor-pointer items-center rounded-full border-2 border-transparent duration-100 hover:border-secondary hover:brightness-95 active:scale-90"
        onClick={() => setShow(!show)}
      >
        <Avatar src={currentUser.image} text={currentUser.name} size="12" />
      </div>
      {show && (
        <div
          ref={menuRef}
          className="absolute top-16 -right-1 max-w-[275px] rounded-lg border border-slate-200 bg-white"
        >
          <div className="flex gap-4 border-b border-slate-200 p-4">
            <ListTopContent currentUser={currentUser} />
          </div>
          <ul className="flex flex-col gap-2 py-2 font-semibold text-gray-600">
            <ListItem onClick={() => void router.push(`/profil/${currentUser.id}`)}>
              <ArrowTopRightOnSquareIcon className="h-7" />
              Twój profil
            </ListItem>

            <ListItem onClick={() => void router.push(`/profil/${currentUser.id}`)}>
              <SunIcon className="h-7" />
              Zmień motyw
            </ListItem>

            <ListItem onClick={() => void router.push(`/ustawienia`)}>
              <Cog6ToothIcon className="h-7" />
              Ustawienia
            </ListItem>

            <ListItem onClick={() => void signOut()}>
              <ArrowLeftOnRectangleIcon className="h-7" />
              Wyloguj się
            </ListItem>
          </ul>
        </div>
      )}
    </div>
  );
};
