import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "./mocks";
import NotFoundContent from "@/components/pages/NotFoundContent";

describe("NotFoundContent", () => {
  beforeEach(() => {
    render(<NotFoundContent />);
  });

  it("renders the 404 subtitle", () => {
    expect(screen.getByText("notFound.subtitle")).toBeInTheDocument();
  });

  it("renders the title", () => {
    expect(screen.getByText("notFound.title")).toBeInTheDocument();
  });

  it("renders the description", () => {
    expect(screen.getByText("notFound.description")).toBeInTheDocument();
  });

  it("renders a back-home link to locale root", () => {
    const link = screen.getByText("notFound.backHome");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/es");
  });
});
