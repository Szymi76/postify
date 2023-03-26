import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import LoadingPage from "./LoadingPage";

export type ProtectedPageProps = { component: JSX.Element };

const ProtectedPage = (props: ProtectedPageProps) => {
  const { status } = useSession();
  const router = useRouter();

  // przenoszenie użytkownika do strony głównej jeśli nie jest zalogowany
  if (status == "unauthenticated") void router.replace("/");

  // wyświtlanie ładowania jeśli nie wiadomo czy użytkownik jest lub nie jest uwierzytelniony
  if (status == "loading") return <LoadingPage />;
  // zwracanie strony jeśli użytkownik jest uwierzytelniony

  const Comp = () => {
    return <p>{props.component}</p>;
  };

  console.log(props.component, Comp);

  if (status == "authenticated") return <Comp />;

  return <></>;
};

export default ProtectedPage;
