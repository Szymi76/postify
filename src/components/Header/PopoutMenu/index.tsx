import { User } from "@prisma/client";
import React, { forwardRef } from "react";
import BaseInformations from "./BaseInformations";
import ArrowTopRightOnSquareIcon from "@heroicons/react/24/outline/ArrowTopRightOnSquareIcon";
import ActionListItem from "./ActionListItem";
import { useRouter } from "next/router";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import ArrowLeftOnRectangleIcon from "@heroicons/react/24/outline/ArrowLeftOnRectangleIcon";
import { signOut } from "next-auth/react";

type PopoutMenuProps = { user: Partial<User> };
const PopoutMenu = forwardRef<HTMLDivElement, PopoutMenuProps>((props, ref) => {
  const router = useRouter();

  return (
    <div
      ref={ref}
      className="absolute top-16 -right-1 z-30 max-w-[275px] rounded-lg border border-slate-200 bg-white"
    >
      <BaseInformations user={props.user} />
      <ul className="flex flex-col gap-2 py-2 font-medium text-black">
        <ActionListItem onClick={() => void router.push(`/profil/${props.user.id!}`)}>
          <ArrowTopRightOnSquareIcon className="h-7" />
          Twój profil
        </ActionListItem>

        <ActionListItem onClick={() => void router.push(`/profil/${props.user.id!}`)}>
          <SunIcon className="h-7" />
          Zmień motyw
        </ActionListItem>

        <ActionListItem onClick={() => void router.push(`/ustawienia`)}>
          <Cog6ToothIcon className="h-7" />
          Ustawienia
        </ActionListItem>

        <ActionListItem onClick={() => void signOut()}>
          <ArrowLeftOnRectangleIcon className="h-7" />
          Wyloguj się
        </ActionListItem>
      </ul>
    </div>
  );
});

PopoutMenu.displayName = "PopoutMenu";
export default PopoutMenu;
