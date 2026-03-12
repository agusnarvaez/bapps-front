import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils/cn";

describe("cn utility", () => {
  it("joins multiple class strings", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("filters out falsy values", () => {
    expect(cn("foo", false, null, undefined, "bar")).toBe("foo bar");
  });

  it("returns empty string when no valid classes", () => {
    expect(cn(false, null, undefined)).toBe("");
  });

  it("returns single class as-is", () => {
    expect(cn("solo")).toBe("solo");
  });

  it("handles empty call", () => {
    expect(cn()).toBe("");
  });
});
