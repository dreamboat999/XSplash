import { useEffect, useState } from "react";

export function useMatch() {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
    return () => {
      setMatches(null);
    };
  }, []);

  return matches;
}
