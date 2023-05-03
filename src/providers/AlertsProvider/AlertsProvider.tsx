import React from "react";
import { type Alert as AlertType, useAlert } from "./useAlert";
import { Alert } from "~/components/Utils/Alert";
import { useTimeout } from "~/hooks";
import styled from "styled-components";

const AlertsProvider = () => {
  const alerts = useAlert((state) => state.alerts);

  return (
    <AlertsWrapper>
      {alerts.map((alert) => (
        <SingleAlert key={alert.id} alert={alert} />
      ))}
    </AlertsWrapper>
  );
};

export default AlertsProvider;

type SingleAlertProps = { alert: AlertType };
const SingleAlert = (props: SingleAlertProps) => {
  const { alert } = props;
  const deleteAlert = useAlert((state) => state.deleteAlert);
  useTimeout(() => deleteAlert(alert.id), alert.timeout);

  return <Alert alert={alert} onClose={() => deleteAlert(alert.id)} />;
};

const AlertsWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 300px;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.md};
  @media (max-width: ${(props) => props.theme.breakpoint.sm}) {
    width: 100%;
    margin-bottom: ${(props) => props.theme.layouts.bottomNavigation.height + 10}px;
  }
`;
