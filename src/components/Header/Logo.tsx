import Link from "next/link";
import React from "react";

import PostifyLogo from "../../../public/logo_64x64_secondary.png";

const Logo = () => {
  return (
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
  );
};

export default Logo;
