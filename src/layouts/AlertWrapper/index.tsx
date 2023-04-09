import React from "react";
import { useAlert } from "~/store";
import SingleAlert from "./SingleAlert";

type AlertWrapperProps = { children: React.ReactNode };
const AlertWrapper = (props: AlertWrapperProps) => {
  const alerts = useAlert((state) => state.alerts);

  return (
    <>
      {props.children}
      <div className="fixed bottom-0 right-0 flex w-full flex-col items-end gap-1 p-1 sm:w-[300px]">
        {alerts.map((alert) => (
          <SingleAlert key={alert.id} alert={alert} />
        ))}
      </div>
    </>
  );
};

export default AlertWrapper;
