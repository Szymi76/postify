export const useOnKey = (key: string, onKeyDown: (e: KeyboardEvent) => void) => {
  window.addEventListener("keydown", (e) => {
    if (e.key == key) onKeyDown(e);
  });

  return () =>
    window.removeEventListener("keydown", (e) => {
      if (e.key == key) onKeyDown(e);
    });
};
