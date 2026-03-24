import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "./mocks";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("renders the logo", () => {
    const logo = screen.getByAltText("BApps");
    expect(logo).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    expect(screen.getByText("footer.tagline")).toBeInTheDocument();
  });

  it("renders footer links section", () => {
    expect(screen.getByText("Servicios")).toBeInTheDocument();
    expect(screen.getByText("Proyectos")).toBeInTheDocument();
    expect(screen.getByText("Equipo")).toBeInTheDocument();
    expect(screen.getByText("Contacto")).toBeInTheDocument();
  });

  it("renders social links with aria-labels", () => {
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
  });

  it("social links open in new tab", () => {
    const instagram = screen.getByLabelText("Instagram");
    expect(instagram).toHaveAttribute("target", "_blank");
    expect(instagram).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders copyright with current year", () => {
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(`© ${year} BApps`))).toBeInTheDocument();
  });

  it("renders privacy and terms links", () => {
    expect(screen.getByText("footer.links.privacy")).toBeInTheDocument();
    expect(screen.getByText("footer.links.terms")).toBeInTheDocument();
  });
});
