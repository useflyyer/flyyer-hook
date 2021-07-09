import { useMemo } from "react";

import { FlyyerRender, FlyyerRenderParams, Flyyer, FlyyerParams, FlyyerVariables } from "@flyyer/flyyer";

/**
 * Will return the same instance if the parameters are the same. This is useful for performance and prevents unnecessary renders.
 */
export function useFlyyerRender<T extends FlyyerVariables = FlyyerVariables>(args: Partial<FlyyerRenderParams<T>>) {
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
      const flyyer = new FlyyerRender(args as any);
      return flyyer;
    }
    return null;
  }, deps);
}

/**
 * Will return the same instance if the parameters are the same. This is useful for performance and prevents unnecessary renders.
 */
export function useFlyyer<T extends FlyyerVariables = FlyyerVariables>(args: Partial<FlyyerParams<T>>) {
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
      const flyyer = new Flyyer(args as any);
      return flyyer;
    }
    return null;
  }, deps);
}
