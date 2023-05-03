import React from "react";
import Link from "next/link";
import { pages } from "~/constants/pages";
import { Button } from "~/components/Shared";

const LoginButton = () => {
  return (
    <Link href={pages.signin}>
      <Button>Zaloguj się</Button>
    </Link>
  );
};

export default LoginButton;
