import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "./mocks";
import Header from "@/components/layout/Header";

describe("Header", () => {
  beforeEach(() => {
    render(<Header />);
  });

  it("renders the logo with alt text", () => {
    const logo = screen.getByAltText("BApps");
    expect(logo).toBeInTheDocument();
  });

  it("renders all 4 nav links", () => {
    expect(screen.getByText("nav.services")).toBeInTheDocument();
    expect(screen.getByText("nav.projects")).toBeInTheDocument();
    expect(screen.getByText("nav.team")).toBeInTheDocument();
    expect(screen.getByText("nav.contact")).toBeInTheDocument();
  });

  it("renders the CTA quote button", () => {
    // There may be two (desktop + mobile), at least one should exist
    const ctas = screen.getAllByText("nav.quoteProject");
    expect(ctas.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the mobile menu toggle button", () => {
    const toggle = screen.getByLabelText("Open menu");
    expect(toggle).toBeInTheDocument();
  });

  it("has main navigation aria-label", () => {
    const nav = screen.getByLabelText("Main navigation");
    expect(nav).toBeInTheDocument();
  });
});
