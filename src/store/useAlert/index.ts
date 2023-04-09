import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import produce from "immer";

const DEFAULT_ALERT_TIMEOUT = 3500;

export type Alert = {
  id: string;
  text: string;
  type: AlertType;
  timeout: number;
};
// export type AlertType = "info" | "success" | "warning" | "error";
export type AlertType = "info" | "error";
export type PushAlertRequiredParams = { text: string; type: AlertType };
export type PushAlertOptions = { timeout: number };
export type PushAlertReturn = { id: string | null };

export type AlertState = {
  alerts: Alert[];
  pushAlert: (required: PushAlertRequiredParams, options?: PushAlertOptions) => PushAlertReturn;
  deleteAlert: (id: string) => void;
  clearAllAlerts: () => void;
};

export const useAlert = create<AlertState>((set, get) => ({
  alerts: [],
  pushAlert: (required, options) => {
    const { text, type } = required;
    const timeout = options?.timeout ?? DEFAULT_ALERT_TIMEOUT;
    const id = uuidv4();

    const newAlert: Alert = { id, text, type, timeout };

    set(
      produce<AlertState>((state) => {
        const alerts = state.alerts;
        state.alerts = [...alerts, newAlert];
      })
    );

    return { id };
  },
  clearAllAlerts: () => {
    set(
      produce<AlertState>((state) => {
        state.alerts = [];
      })
    );
  },
  deleteAlert: (id) => {
    set(
      produce<AlertState>((state) => {
        const alerts = state.alerts.filter((alert) => alert.id != id);
        state.alerts = alerts;
      })
    );
  },
}));
