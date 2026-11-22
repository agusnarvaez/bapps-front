import { afterEach, describe, expect, it, vi } from "vitest";
import { navigateTo, setScrollReset } from "@/lib/router";

describe("navigateTo", () => {
  afterEach(() => {
    setScrollReset(null);
    window.history.replaceState(null, "", "/");
  });

  it("vuelve el scroll arriba al navegar a otra página", () => {
    const reset = vi.fn();
    setScrollReset(reset);

    navigateTo("/es/projects/demo");

    expect(window.location.pathname).toBe("/es/projects/demo");
    expect(reset).toHaveBeenCalledTimes(1);
  });

  it("no hace nada si ya está en esa página", () => {
    const reset = vi.fn();
    setScrollReset(reset);

    navigateTo(window.location.pathname);

    expect(reset).not.toHaveBeenCalled();
  });
});
