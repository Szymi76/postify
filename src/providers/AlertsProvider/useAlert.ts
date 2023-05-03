import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

const DEFAULT_ALERT_TIMEOUT = 3500;

export type Alert = {
  id: string;
  text: string;
  type: AlertType;
  timeout: number;
};
// export type AlertType = "info" | "success" | "warning" | "error";
export type AlertType = "primary" | "error";
export type PushAlertRequiredParams = { text: string; type: AlertType };
export type PushAlertOptions = { timeout: number };
export type PushAlertReturn = { id: string | null };

export type AlertState = {
  alerts: Alert[];
  pushAlert: (required: PushAlertRequiredParams, options?: PushAlertOptions) => PushAlertReturn;
  deleteAlert: (id: string) => void;
};

export const useAlert = create<AlertState>((set, get) => ({
  // TABLICA WSZYSTKICH ALERTÓW
  alerts: [],

  // METODA DO DODAWANIA NOWEGO ALERTU
  pushAlert: (required, options) => {
    const { text, type } = required;
    const timeout = options?.timeout ?? DEFAULT_ALERT_TIMEOUT;
    const id = uuidv4();

    const newAlert: Alert = { id, text, type, timeout };
    set({ alerts: [...get().alerts, newAlert] });

    return { id };
  },

  // USUWANIE ALERTU PO ID
  deleteAlert: (id) => {
    const alerts = get().alerts.filter((alert) => alert.id != id);
    set({ alerts });
  },
}));
