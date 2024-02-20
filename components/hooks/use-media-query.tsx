import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const isClient = typeof window === "object"; // Check if window is defined

  const [matches, setMatches] = useState<boolean>(() =>
    isClient ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    if (!isClient) {
      return; // Don't execute on the server side
    }

    const mediaQueryList = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener("change", handleChange);

    // Initial check
    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [isClient, query]);

  return isClient ? matches : false; // Ensure returning a value even during SSR
}
