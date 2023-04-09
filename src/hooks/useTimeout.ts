import { useEffect } from "react";

export const useTimeout = (callback: () => void, timeout: number) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, timeout);

    return () => clearTimeout(handler);
  }, []);
};
