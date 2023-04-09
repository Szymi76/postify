import { DependencyList, useEffect } from "react";

export const useOnEndOfWindowScroll = (
  callback: () => void,
  offsetBottom = 0,
  deps?: DependencyList
) => {
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const isBottom =
        window.scrollY + window.innerHeight + offsetBottom >= document.body.offsetHeight;
      if (isBottom) callback();
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, deps);
};
