import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Settings = () => {
  const router = useRouter();

  useEffect(() => {
    void router.replace("/settings/account");
  }, []);

  return <h1>Ładowanie...</h1>;
};

export default Settings;
