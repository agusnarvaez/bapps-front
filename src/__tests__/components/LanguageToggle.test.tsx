import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { pushMock } from "./mocks";
import LanguageToggle from "@/components/layout/LanguageToggle";

describe("LanguageToggle", () => {
  beforeEach(() => {
    pushMock.mockClear();
    render(<LanguageToggle />);
  });

  it("renders ES and EN buttons", () => {
    expect(screen.getByText("ES")).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("marks current locale as active (aria-current)", () => {
    const esButton = screen.getByText("ES");
    expect(esButton).toHaveAttribute("aria-current", "true");
  });

  it("EN button does not have aria-current", () => {
    const enButton = screen.getByText("EN");
    expect(enButton).not.toHaveAttribute("aria-current");
  });

  it("has proper aria-labels", () => {
    expect(screen.getByLabelText("Switch to Spanish")).toBeInTheDocument();
    expect(screen.getByLabelText("Switch to English")).toBeInTheDocument();
  });

  it("calls router.push when switching locale", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText("EN"));
    expect(pushMock).toHaveBeenCalledWith("/en");
  });
});
