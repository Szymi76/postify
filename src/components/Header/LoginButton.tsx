import React from "react";
import Link from "next/link";

const LoginButton = () => {
  return (
    <Link href="/auth/signin">
      <button className="btn-ghost btn">Zaloguj się</button>
    </Link>
  );
};

export default LoginButton;
