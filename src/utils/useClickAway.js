import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function useClickAway(ref) {
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        dispatch({ type: "DISPLAY_MODAL_SEARCH", payload: false });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
