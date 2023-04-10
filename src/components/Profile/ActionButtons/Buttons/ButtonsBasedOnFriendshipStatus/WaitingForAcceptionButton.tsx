import React from "react";
import { ButtonBasedOnFriendshipStatusProps } from ".";

const WaitingForAcceptionButton = (props: ButtonBasedOnFriendshipStatusProps) => {
  return (
    <button className="btn-disabled btn-secondary btn-sm btn">
      Czekanie na akceptacje zaproszenia
    </button>
  );
};

export default WaitingForAcceptionButton;
