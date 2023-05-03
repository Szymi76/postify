import React from "react";
import { type ButtonBasedOnFriendshipStatusProps } from ".";
import { Button } from "~/components/Shared";

const WaitingForAcceptionButton = (props: ButtonBasedOnFriendshipStatusProps) => {
  return (
    <Button color="secondary" disabled>
      Czekanie na akceptacje zaproszenia
    </Button>
  );
};

export default WaitingForAcceptionButton;
