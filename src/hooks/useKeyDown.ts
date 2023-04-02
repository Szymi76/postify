import { RefObject, useEffect } from "react";

export const useKeyDown = (ref: RefObject<HTMLElement>, callback: () => void, keys: string[]) => {
  useEffect(() => {
    // sprawdzanie czy ref został podpięty pod jakiś element
    if (!ref.current) return;

    // funkcja, która odpala callback w momencie gdy został wciśnięty przycisk podany w parametrach
    const onKeyDown = (e: KeyboardEvent) => {
      if (keys.includes(e.key)) callback();
    };

    // dodawanie event listenera
    ref.current.addEventListener("keydown", onKeyDown);

    // usuwanie listenera w momencie odmontowania komponentu
    return () => {
      if (ref.current) ref.current.removeEventListener("keydown", onKeyDown);
    };
  }, [ref.current]);
};
