import { useMemo, useState } from "react";
import Flayyer, { FlayyerParams, FlayyerVariables } from "@flayyer/flayyer";

/**
 * Will return the same instance if the parameters are the same. This is useful for performance and prevents unnecessary renders.
 */
export function useFlayyer<T extends FlayyerVariables = FlayyerVariables>(args: Partial<FlayyerParams<T>>) {
  const [defaultV] = useState(() => (new Date().getTime() / 1000).toFixed(0));

  return useMemo(() => {
    const meta = { v: defaultV, ...args.meta };
    if (args.tenant && args.deck && args.template) {
      const variables = args.variables;
      const flayyer = new Flayyer({
        ...(args as any),
        variables,
        meta,
      });
      return flayyer;
    }
    return null;
  }, [
    args.tenant,
    args.deck,
    args.template,
    args.version,
    args.extension,
    args.variables ? JSON.stringify(args.variables) : "",
    args.meta?.agent,
    args.meta?.width,
    args.meta?.height,
    args.meta?.resolution,
    args.meta?.id,
    args.meta?.v,
  ]);
}
