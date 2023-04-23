import React, { useState } from "react";
import { Alert } from "~/components/Global";
import { useTimeout } from "~/hooks/useTimeout";
import { Alert as AlertType, useAlert } from "~/store/useAlert";

type SingleAlertProps = { alert: AlertType };
const SingleAlert = (props: SingleAlertProps) => {
  const deleteAlert = useAlert((state) => state.deleteAlert);
  useTimeout(() => deleteAlert(props.alert.id), props.alert.timeout);

  return (
    <Alert
      alert={props.alert}
      withCloseAnimation={true}
      onClose={() => deleteAlert(props.alert.id)}
    />
  );
};

export default SingleAlert;
