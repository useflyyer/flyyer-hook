/* eslint-disable react-hooks/rules-of-hooks */

import { renderHook } from "@testing-library/react-hooks";

import { useFlyyer, useFlyyerRender } from "../src/flyyer-hook";

describe("useFlyyerRender", () => {
  function useHookFlyyerRender(...args: Parameters<typeof useFlyyerRender>) {
    return renderHook(() => useFlyyerRender(...args));
  }

  it("should be defined", () => {
    expect(useFlyyerRender).toBeDefined();
  });

  it("returns null for blank input", () => {
    const { result } = useHookFlyyerRender({});
    expect(result.current).toBeNull();
  });

  it("returns null for partial input", () => {
    const { result } = useHookFlyyerRender({ tenant: "tenant" });
    expect(result.current).toBeNull();
  });

  it("returns flyyer instance", () => {
    const { result } = useHookFlyyerRender({ tenant: "tenant", deck: "deck", template: "template" });
    const href = result.current!.href();
    expect(href.startsWith("https://cdn.flyyer.io/render/v2/tenant/deck/template.jpeg?__v=")).toBeTruthy();
  });

  // TODO: test memoize
});

describe("useFlyyer", () => {
  function useHookFlyyer(...args: Parameters<typeof useFlyyer>) {
    return renderHook(() => useFlyyer(...args));
  }

  it("should be defined", () => {
    expect(useFlyyer).toBeDefined();
  });

  it("returns null for blank input", () => {
    const { result } = useHookFlyyer({});
    expect(result.current).toBeNull();
  });

  it("returns flyyer instance", () => {
    const { result } = useHookFlyyer({ project: "project", path: ["products", 1] });
    const href = result.current!.href();
    expect(href).toMatch(/^https:\/\/cdn.flyyer.io\/v2\/project\/_\/__v=(\d+)\/products\/1/);
  });

  it("preserves __v params on next renders to prevent messing with browser cache", () => {
    const { result, rerender } = renderHook(({ initialValue }) => useFlyyer(initialValue), {
      initialProps: { initialValue: { project: "PROJECT" } },
    });
    const href = result.current!.href();

    rerender({ initialValue: { project: "PROJECT" } });
    expect(result.current!.href()).toBe(href);

    rerender({ initialValue: { project: "PROJECT-2" } });
    expect(result.current!.href()).toBe(href.replace("PROJECT", "PROJECT-2"));
  });

  // TODO: test memoize
});
