import { useEffect, useLayoutEffect } from "react";

export const useScrollWithId = (params: { elementId: string; onScroll: (e: Event) => void }) => {
  const { elementId, onScroll } = params;

  useLayoutEffect(() => {
    const element = document.getElementById(elementId);
    const handleScroll = (e: Event) => onScroll(e);

    element?.addEventListener("scroll", handleScroll);

    return () => element?.removeEventListener("scroll", handleScroll);
  }, []);
};
