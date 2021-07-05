import { useMemo } from "react";

import { FlayyerIO, FlayyerIOParams, FlayyerAI, FlayyerAIParams, FlayyerVariables } from "@flayyer/flayyer";

/**
 * Will return the same instance if the parameters are the same. This is useful for performance and prevents unnecessary renders.
 */
export function useFlayyerIO<T extends FlayyerVariables = FlayyerVariables>(args: Partial<FlayyerIOParams<T>>) {
  const meta = args.meta || {};
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
    meta.locale,
    meta.id,
    meta.v,
  ];

  return useMemo(() => {
    if (args.tenant && args.deck && args.template) {
      const flayyer = new FlayyerIO(args as any);
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
  const deps = [
    args.project,
    args.path,
    args.version,
    args.extension,
    args.variables ? JSON.stringify(args.variables) : "",
    meta.agent,
    meta.width,
    meta.height,
    meta.resolution,
    meta.locale,
    meta.id,
    meta.v,
  ];

  return useMemo(() => {
    if (args.project) {
      const flayyer = new FlayyerAI(args as any);
      return flayyer;
    }
    return null;
  }, deps);
}
