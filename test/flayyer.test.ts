/* eslint-disable react-hooks/rules-of-hooks */

import { renderHook } from "@testing-library/react-hooks";

import { useFlayyer } from "../src/flayyer-hook";

describe("useFlayyer", () => {
  function useHook(...args: Parameters<typeof useFlayyer>) {
    return renderHook(() => useFlayyer(...args));
  }

  it("should be defined", () => {
    expect(useFlayyer).toBeDefined();
  });

  it("returns null for blank input", () => {
    const { result } = useHook({});
    expect(result.current).toBeNull();
  });

  it("returns null for partial input", () => {
    const { result } = useHook({ tenant: "tenant" });
    expect(result.current).toBeNull();
  });

  it("returns flayyer instance", () => {
    const { result } = useHook({ tenant: "tenant", deck: "deck", template: "template" });
    const href = result.current!.href();
    expect(href.startsWith("https://flayyer.io/v2/tenant/deck/template.jpeg?__v=")).toBeTruthy();
  });

  // TODO: test memoize
});
