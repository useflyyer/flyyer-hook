/* eslint-disable react-hooks/rules-of-hooks */

import { renderHook } from "@testing-library/react-hooks";

import { useFlayyerAI, useFlayyerIO } from "../src/flayyer-hook";

describe("useFlayyerIO", () => {
  function useHookFlayyerIO(...args: Parameters<typeof useFlayyerIO>) {
    return renderHook(() => useFlayyerIO(...args));
  }

  it("should be defined", () => {
    expect(useFlayyerIO).toBeDefined();
  });

  it("returns null for blank input", () => {
    const { result } = useHookFlayyerIO({});
    expect(result.current).toBeNull();
  });

  it("returns null for partial input", () => {
    const { result } = useHookFlayyerIO({ tenant: "tenant" });
    expect(result.current).toBeNull();
  });

  it("returns flayyer instance", () => {
    const { result } = useHookFlayyerIO({ tenant: "tenant", deck: "deck", template: "template" });
    const href = result.current!.href();
    expect(href.startsWith("https://flayyer.io/v2/tenant/deck/template.jpeg?__v=")).toBeTruthy();
  });

  // TODO: test memoize
});

describe("useFlayyerAI", () => {
  function useHookFlayyerAI(...args: Parameters<typeof useFlayyerAI>) {
    return renderHook(() => useFlayyerAI(...args));
  }

  it("should be defined", () => {
    expect(useFlayyerAI).toBeDefined();
  });

  it("returns null for blank input", () => {
    const { result } = useHookFlayyerAI({});
    expect(result.current).toBeNull();
  });

  it("returns flayyer instance", () => {
    const { result } = useHookFlayyerAI({ project: "project", path: ["products", 1] });
    const href = result.current!.href();
    expect(href).toMatch(/^https:\/\/flayyer.ai\/v2\/project\/_\/__v=(\d+)\/products\/1/);
  });

  it("preserves __v params on next renders to prevent messing with browser cache", () => {
    const { result, rerender } = renderHook(({ initialValue }) => useFlayyerAI(initialValue), {
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
