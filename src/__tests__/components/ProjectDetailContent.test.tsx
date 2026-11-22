import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "./mocks";
import ProjectDetailContent from "@/components/pages/ProjectDetailContent";
import type { Project } from "@/lib/data/types";

vi.mock("@/lib/sanity/live", () => ({
  getProjectBySlugLive: vi.fn().mockResolvedValue(null),
  getNextProjectLive: vi.fn().mockResolvedValue(null),
}));

const base: Project = {
  slug: "fer-net",
  title: "Fer-Net",
  description: "Desc",
  shortDescription: "Corta",
  image: "/images/projects/project-1.jpg",
  technologies: ["React"],
  category: "webapp",
  featured: false,
};

describe("ProjectDetailContent", () => {
  it("shows the cover image and no case study blocks by default", () => {
    const { container } = render(<ProjectDetailContent project={base} locale="es" />);

    expect(container.querySelector("video")).toBeNull();
    expect(screen.getByAltText("Fer-Net")).toBeInTheDocument();
    expect(screen.queryByText("projectDetail.caseStudy.problem")).toBeNull();
  });

  it("shows the demo video and only the case study blocks that have text", () => {
    const { container } = render(
      <ProjectDetailContent
        project={{
          ...base,
          video: "https://cdn.sanity.io/files/demo/tour.mp4",
          caseStudy: { problem: "Planillas sueltas", result: "Menos errores" },
        }}
        locale="es"
      />
    );

    const video = container.querySelector("video");
    expect(video).toHaveAttribute("src", "https://cdn.sanity.io/files/demo/tour.mp4");
    expect(video).toHaveAttribute("poster", base.image);
    expect(screen.getByText("Planillas sueltas")).toBeInTheDocument();
    expect(screen.getByText("Menos errores")).toBeInTheDocument();
    expect(screen.queryByText("projectDetail.caseStudy.solution")).toBeNull();
  });
});
