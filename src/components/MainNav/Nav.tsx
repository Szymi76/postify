import React from "react";

import PostifyLogo from "../../../public/logo_64x64_secondary.png";
import Link from "next/link";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { useSession } from "next-auth/react";
import { NavUserMenu } from "~/components/MainNav/UserMenu/NavUserMenu";
import { useRouter } from "next/router";

export const Nav = () => {
  const currentUser = useSession().data?.user;
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 flex h-14 w-full items-center justify-between bg-primary px-4 py-2 text-white">
      {/* LINK JAKO LOGO PO LEWEJ STRONIE */}
      <Link href="/" className="flex gap-2">
        <img
          src={PostifyLogo.src}
          alt="postify logo"
          className="object-contain"
          height={32}
          width={32}
        />
        <h2 className="text-2xl font-medium">Postify</h2>
      </Link>

      {/* POLE TEKSTOWE DO WYSZUKIWANIA */}
      <div className="relative hidden text-gray-500 sm:block">
        <input
          type="text"
          className="input-secondary input input-sm w-[350px] pl-10"
          placeholder="Szukaj osób, społeczności..."
        />
        <div className="absolute left-2 top-2 text-gray-500">
          <MagnifyingGlassIcon className="h-6" />
        </div>
      </div>

      {currentUser ? (
        <NavUserMenu />
      ) : (
        <button className="btn-ghost btn" onClick={() => void router.push("/auth/signin")}>
          Zaloguj się
        </button>
      )}
    </nav>
  );
};
