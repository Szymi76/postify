import { useEffect, useState } from "react";

export type Breakpoints = "sm" | "md" | "lg" | "xl" | "2xl";
export const breakpoints = new Map<Breakpoints, number>([
  ["sm", 540],
  ["md", 768],
  ["lg", 1024],
  ["xl", 1280],
  ["2xl", 1536],
]);
export type Options = { defaultBreakpoint?: Breakpoints };
export const useBreakpoint = (options?: Options) => {
  const defaultBreakpoint = options?.defaultBreakpoint ?? "lg";
  const [breakpoint, setBreakpoint] = useState<Breakpoints>(defaultBreakpoint);

  useEffect(() => {
    const initialBreakpoint = getCurrentWindowBreakpoint();
    setBreakpoint(initialBreakpoint);

    const handleResize = (e: UIEvent) => {
      const currentBreakpoint = getCurrentWindowBreakpoint();
      setBreakpoint(currentBreakpoint);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getPixels = (breakpoint: Breakpoints) => breakpoints.get(breakpoint)!;

  return { breakpoint, getPixels };
};

function getCurrentWindowBreakpoint(): Breakpoints {
  const windowWidth = window.innerWidth;
  if (windowWidth <= breakpoints.get("sm")!) return "sm";
  else if (windowWidth <= breakpoints.get("md")!) return "md";
  else if (windowWidth <= breakpoints.get("lg")!) return "lg";
  else if (windowWidth <= breakpoints.get("xl")!) return "xl";
  return "2xl";
}
