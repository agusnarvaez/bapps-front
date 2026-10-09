import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "./mocks";
import MarkTag from "@/components/plano/MarkTag";
import RegistrationMarks from "@/components/plano/RegistrationMarks";
import Stamp from "@/components/plano/Stamp";
import DrawLine from "@/components/plano/DrawLine";
import PlanoSchematic from "@/components/plano/PlanoSchematic";

vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: () => false,
}));

describe("Plano world primitives", () => {
  it("MarkTag renders its children", () => {
    render(<MarkTag>S-01</MarkTag>);
    expect(screen.getByText("S-01")).toBeInTheDocument();
  });

  it("RegistrationMarks renders four corner marks", () => {
    const { container } = render(<RegistrationMarks />);
    expect(container.querySelectorAll("svg")).toHaveLength(4);
  });

  it("Stamp renders its children", () => {
    render(
      <Stamp>
        <span>Contanos tu idea</span>
      </Stamp>
    );
    expect(screen.getByText("Contanos tu idea")).toBeInTheDocument();
  });

  it("DrawLine renders a path inside its svg", () => {
    const { container } = render(<DrawLine d="M0 0 L10 10" viewBox="0 0 10 10" />);
    expect(container.querySelector("svg path")).toBeInTheDocument();
  });

  it("PlanoSchematic renders its nodes and connectors", () => {
    const { container } = render(<PlanoSchematic />);
    expect(container.querySelectorAll("svg rect").length).toBeGreaterThan(0);
    expect(container.querySelectorAll("svg path").length).toBeGreaterThan(0);
  });
});
