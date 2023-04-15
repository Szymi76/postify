import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import { useSession } from "next-auth/react";
import UserAvatar from "./UserAvatar";
import LoginButton from "./LoginButton";

const Header = () => {
  const currentUser = useSession().data?.user;

  return (
    <header className="fixed top-0 left-0 z-30 flex h-14 w-full max-w-[100vw] items-center justify-between bg-primary px-4 py-2 text-white">
      <div className="w-[25%]">
        <Logo />
      </div>
      <Search />
      <div className="flex w-[25%] justify-end">
        {currentUser ? <UserAvatar /> : <LoginButton />}
      </div>
    </header>
  );
};

export default Header;
