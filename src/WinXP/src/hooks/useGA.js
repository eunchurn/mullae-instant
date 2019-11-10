import { useEffect } from "react";
import ga from "react-ga";

function useGA(id, route) {
  useEffect(() => {
    ga.initialize(id);
    ga.pageview(route);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useGA;
