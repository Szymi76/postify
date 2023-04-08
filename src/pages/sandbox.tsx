import React, { useRef, useState } from "react";

import PostifyLogo from "../../public/logo_64x64_secondary.png";
import Link from "next/link";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import Avatar from "~/components/Global/Avatar";
import { useSession } from "next-auth/react";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import { useRouter } from "next/router";
import Header from "~/components/Header";
import { LoadingButton } from "~/components/Global";
import Post from "~/components/Post";

const Page = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Header />
      <div className="mt-20 flex w-full justify-center">
        <Post id="clfyox89v0000v2qk78227hcn" />
      </div>
    </>
  );
};

export default Page;
