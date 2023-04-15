import React, { useRef } from "react";
import Images from "./Images";
import { api } from "~/utils/api";
import ActionButtons from "./ActionButtons";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import { useSession } from "next-auth/react";
import { useDropdown, Dropdown, DropdownItem } from "~/hooks/useDropdown";
import ProfileSkeleton from "./ProfileSkeleton";
import Link from "next/link";
import { PAGES } from "~/constants";

type ProfileProps = { userId: string };
const Profile = (props: ProfileProps) => {
  const { data, isLoading } = api.user.getByIds.useQuery({ ids: [props.userId] });
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);
  const { toggle: toggleDropdown, dropdownProps } = useDropdown([dropdownTriggerRef]);
  const currentUser = useSession().data?.user;

  const user = data && data.length == 1 ? data[0]! : null;
  const isItCurrentUserProfile = Boolean(user?.id == currentUser?.id && currentUser?.id);

  if (isLoading) return <ProfileSkeleton />;
  if (!isLoading && !user) return <h1>Profil nie istnieje!!!</h1>;

  return (
    <div className="layout p-0">
      <Images user={user!} />
      <div className="relative px-[28px] pt-[65px] pb-5">
        <h2 className="text-2xl font-semibold">{user?.name}</h2>
        <p className="mt-1 max-w-[400px] text-sm text-gray-500">{user?.description}</p>
        <ActionButtons userId={user!.id} />
        <div className="absolute top-3 right-2">
          <div className="relative">
            <button ref={dropdownTriggerRef} className="icon" onClick={toggleDropdown}>
              <EllipsisVerticalIcon className="h-7 text-gray-500" />
            </button>
            <Dropdown {...dropdownProps}>
              {isItCurrentUserProfile && (
                <DropdownItem>
                  <Link href={PAGES.SETTINGS.ACCOUNT}>Zaktualizuj profil</Link>
                </DropdownItem>
              )}
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
