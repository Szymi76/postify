import { RefObject, useEffect, useRef, useState } from "react";

export const useFloatingElement = <T1 extends HTMLElement, T2 extends HTMLElement>(
  onChange: (isHovering: boolean) => void
) => {
  const triggerRef = useRef<T1>(null);
  const elementRef = useRef<T2>(null);

  const [triggerIsHovered, setTriggerIsHovered] = useState(false);
  const [elementIsHovered, setElementIsHovered] = useState(false);

  useEffect(() => {
    const handleTriggerEnter = (e?: MouseEvent) => setTriggerIsHovered(true);
    const handleTriggerLeave = (e?: MouseEvent) => setTriggerIsHovered(false);
    const handleElementEnter = (e?: MouseEvent) => setElementIsHovered(true);
    const handleElementLeave = (e?: MouseEvent) => setElementIsHovered(false);

    triggerRef.current?.addEventListener("mouseenter", handleTriggerEnter);
    triggerRef.current?.addEventListener("mouseleave", handleTriggerLeave);
    elementRef.current?.addEventListener("mouseenter", handleElementEnter);
    elementRef.current?.addEventListener("mouseleave", handleElementLeave);

    return () => {
      removeEventListener("mouseenter", handleTriggerEnter);
      removeEventListener("mouseleave", handleTriggerLeave);
      removeEventListener("mouseenter", handleElementEnter);
      removeEventListener("mouseleave", handleElementLeave);
    };
  }, []);

  useEffect(() => {
    if (!triggerIsHovered && !elementIsHovered) onChange(false);
    else if (triggerIsHovered) onChange(true);
  }, [triggerIsHovered, elementIsHovered]);

  return [triggerRef, elementRef] as const;
};
