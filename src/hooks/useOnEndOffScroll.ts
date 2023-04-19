import { RefObject, useEffect } from "react";

type CurrentTarget = EventTarget & HTMLDivElement;
type Options = { offsetBottom?: number };
export const useOnEndOffScroll = <T extends HTMLElement>(
  ref: RefObject<T>,
  onEndOfScroll: (e: Event) => void,
  options?: Options
) => {
  const offsetBottom = options?.offsetBottom ?? 0;

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const { scrollHeight, scrollTop, clientHeight } = e.currentTarget as CurrentTarget;
      const isScrollAtEnd = scrollHeight - scrollTop - offsetBottom <= clientHeight;
      if (isScrollAtEnd) onEndOfScroll(e);
    };

    ref.current?.addEventListener("scroll", handleScroll);

    return () => ref.current?.removeEventListener("scroll", handleScroll);
  }, []);
};
