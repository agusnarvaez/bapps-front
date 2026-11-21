import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "./mocks";
import type { Project } from "@/lib/data/types";

let resolveProjects: (p: Project[]) => void = () => {};
vi.mock("@/lib/sanity/queries", () => ({
  getProjects: () => new Promise<Project[]>((r) => (resolveProjects = r)),
}));

import ProjectsPage from "@/pages/ProjectsPage";

describe("ProjectsPage", () => {
  // El prerender congela lo que se ve antes de que responda Sanity: si fueran
  // los proyectos de ejemplo, Google rastrea links a /projects/proyecto-ejemplo-* (404).
  it("shows a spinner, not the example projects, while Sanity loads", () => {
    const { container } = render(<ProjectsPage locale="es" />);
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
    expect(container.querySelector('a[href*="proyecto-ejemplo"]')).toBeNull();
  });

  it("renders the grid once Sanity responds", async () => {
    render(<ProjectsPage locale="es" />);
    resolveProjects([]);
    expect(await screen.findByText("projectsPage.title")).toBeInTheDocument();
  });
});
