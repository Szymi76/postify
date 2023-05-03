import { type KeyboardEvent } from "react";

export const useOnKey = (key: string, onKeyDown: (e: globalThis.KeyboardEvent) => void) => {
  const handleKeyDown = (e: globalThis.KeyboardEvent) => {
    if (e.key == key) onKeyDown(e);
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => window.removeEventListener("keydown", handleKeyDown);
};
