import { useEffect, useRef, useState } from "react";

export const useHover = <T extends HTMLElement>() => {
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleMouseEnter = (e?: MouseEvent) => setIsHovering(true);
    const handleMouseLeave = (e?: MouseEvent) => setIsHovering(false);

    ref.current?.addEventListener("mouseenter", handleMouseEnter);
    ref.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      removeEventListener("mouseenter", handleMouseEnter);
      removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return [ref, isHovering] as const;
};
