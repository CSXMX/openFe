import React, { useEffect, useRef } from "react";
/**
 * 只在更新时运行的effect  实现来自官方推荐思路:https://react.docschina.org/docs/hooks-faq.html#can-i-run-an-effect-only-on-updates
 * @param effectFn
 * @param deps 依赖项
 */
export type updateEffectType = {
  effectFn: React.EffectCallback;
  deps: any[];
};
export default function useUpdateEffect({
  effectFn,
  deps = [],
}: updateEffectType): React.FC {
  const isMounted = useRef(true);
  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
    } else {
      return effectFn();
    }
  }, deps);
  return () => null;
}
