import { useMemo, useState } from "react";

import { FlayyerIO, FlayyerIOParams, FlayyerAI, FlayyerAIParams, __V, FlayyerVariables } from "@flayyer/flayyer";

/**
 * Will return the same instance if the parameters are the same. This is useful for performance and prevents unnecessary renders.
 */
export function useFlayyerIO<T extends FlayyerVariables = FlayyerVariables>(args: Partial<FlayyerIOParams<T>>) {
  const meta = args.meta || {};
  const [v] = useState(() => __V(meta.v));
  const deps = [
    args.tenant,
    args.deck,
    args.template,
    args.version,
    args.extension,
    args.variables ? JSON.stringify(args.variables) : "",
    meta.agent,
    meta.width,
    meta.height,
    meta.resolution,
    meta.id,
    v,
  ];

  return useMemo(() => {
    if (args.tenant && args.deck && args.template) {
      const params = Object.assign({}, args, { meta: Object.assign({}, meta, { v }) }) as any;
      const flayyer = new FlayyerIO(params);
      return flayyer;
    }
    return null;
  }, deps);
}

/**
 * Will return the same instance if the parameters are the same. This is useful for performance and prevents unnecessary renders.
 */
export function useFlayyerAI<T extends FlayyerVariables = FlayyerVariables>(args: Partial<FlayyerAIParams<T>>) {
  const meta = args.meta || {};
  const [v] = useState(() => __V(meta.v));
  const deps = [
    args.project,
    args.extension,
    args.variables ? JSON.stringify(args.variables) : "",
    meta.agent,
    meta.width,
    meta.height,
    meta.resolution,
    meta.id,
    v,
  ];

  return useMemo(() => {
    if (args.project) {
      const params = Object.assign({}, args, { meta: Object.assign({}, meta, { v }) }) as any;
      const flayyer = new FlayyerAI(params);
      return flayyer;
    }
    return null;
  }, deps);
}

/**
 * @deprecated Import `useFlayyerIO` or `useFlayyerAI` instead of `useFlayyer`.
 */
export const useFlayyer = useFlayyerIO;
