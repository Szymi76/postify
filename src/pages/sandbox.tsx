import React, { useRef, useState } from "react";

import PostifyLogo from "../../public/logo_64x64_secondary.png";
import Link from "next/link";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import Avatar from "~/components/Actions/Avatar";
import { useSession } from "next-auth/react";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import { NavUserMenu } from "~/components/MainNav/UserMenu/NavUserMenu";
import { useRouter } from "next/router";
import { Nav } from "~/components/MainNav/Nav";

const Page = () => {
  return <Nav />;
};

export default Page;
