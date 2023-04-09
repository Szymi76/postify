import React, { useState } from "react";
import { Alert as AlertType } from "~/store/useAlert";
import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { useTimeout } from "~/hooks/useTimeout";

const SLIDE_TO_RIGHT_ANIMATION_TIME = 100;

type AlertProps = { alert: AlertType; onClose?: () => void; withCloseAnimation?: boolean };
export const Alert = (props: AlertProps) => {
  const [appendCloseAnimation, setAppendCloseAnimation] = useState(false);
  useTimeout(
    () => setAppendCloseAnimation(true),
    props.alert.timeout - SLIDE_TO_RIGHT_ANIMATION_TIME
  );

  let Icon = InformationCircleIcon;
  if (props.alert.type == "error") Icon = XCircleIcon;

  let alertTypeClassName = "alert-info";
  if (props.alert.type == "error") alertTypeClassName = "alert-error";

  const showCloseAnimation = props.withCloseAnimation && appendCloseAnimation;

  return (
    <div
      className={`alert ${alertTypeClassName} ${
        showCloseAnimation ? "animate-sliding-in-to-right" : "animate-sliding-in-from-right"
      }`}
    >
      <div className="flex items-center justify-start">
        <Icon className="h-7" />
        <p>{props.alert.text}</p>
      </div>
      {props.onClose && <XMarkIcon className="icon h-7" onClick={props.onClose} />}
    </div>
  );
};

export default Alert;
