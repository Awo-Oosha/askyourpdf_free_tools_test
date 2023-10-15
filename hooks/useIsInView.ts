import { RefObject, useEffect, useMemo, useState } from "react";

export default function useIsInView(
  rootRef: RefObject<HTMLElement> | null,
  elementRef: RefObject<HTMLElement>,
  threshold: number = 1.0
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting);
        },
        { root: rootRef ? rootRef.current : null, threshold: threshold }
      ),
    [elementRef, rootRef]
  );

  useEffect(() => {
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return isIntersecting;
}
