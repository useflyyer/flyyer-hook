import { useMemo, useState } from "react";
import Flayyer, { FlayyerParams, FlayyerVariables } from "@flayyer/flayyer";

const DEFAULT_STATE = () => (new Date().getTime() / 1000).toFixed(0);

/**
 * Will return the same instance if the parameters are the same. This is useful for performance and prevents unnecessary renders.
 */
export function useFlayyer<T extends FlayyerVariables = FlayyerVariables>(args: Partial<FlayyerParams<T>>) {
  const [defaultV] = useState(DEFAULT_STATE);

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
    meta.id,
    meta.v,
  ];

  return useMemo(() => {
    if (args.tenant && args.deck && args.template) {
      const flayyer = new Flayyer({
        ...(args as any),
        meta: { v: defaultV, ...args.meta },
      });
      return flayyer;
    }
    return null;
  }, deps);
}
