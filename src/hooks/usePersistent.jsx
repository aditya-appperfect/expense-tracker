import { useEffect, useReducer, useRef } from "react";

export function usePersistent(reducer, initialState) {
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("Storage"))
      ? JSON.parse(localStorage.getItem("Storage"))
      : initialState
  );
  const ref = useRef(state);
  const prevState = ref.current;

  useEffect(() => {
    if (prevState != state) {
      localStorage.setItem("Storage", JSON.stringify(state));
    }
    ref.current = state;
  }, [state]);

  return { state, dispatch };
}
