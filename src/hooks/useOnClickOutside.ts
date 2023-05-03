import { useRef, useEffect, type RefObject, useCallback, useMemo } from "react";

export const useOnClickOutside = <T extends HTMLElement>(
  callback: () => void,
  ommitedElements?: RefObject<HTMLElement>[]
) => {
  const ref = useRef<T>(null);

  const isElementBelongToOmitted = useCallback((event: MouseEvent) => {
    if (!ommitedElements) return false;

    for (let i = 0; i < ommitedElements.length; i++) {
      const omittedRef = ommitedElements[i];
      if (
        omittedRef &&
        omittedRef.current &&
        omittedRef.current.contains(event.target as Node | null)
      ) {
        return true;
      }
    }

    return false;
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node | null) &&
        !isElementBelongToOmitted(event)
      ) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref]);

  return ref;
};
