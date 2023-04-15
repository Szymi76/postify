import React from "react";
import Link from "next/link";
import { PAGES } from "~/constants";

const LoginButton = () => {
  return (
    <Link href={PAGES.SINGIN}>
      <button className="btn-ghost btn whitespace-nowrap">Zaloguj się</button>
    </Link>
  );
};

export default LoginButton;
