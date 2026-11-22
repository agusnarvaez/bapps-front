import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("@/lib/sanity/client", () => ({
  imageUrl: vi.fn(),
}));

import { imageUrl } from "@/lib/sanity/client";
import { mapSanityProjectToProject } from "@/lib/sanity/mappers";

const imageUrlMock = vi.mocked(imageUrl);

describe("mapSanityProjectToProject", () => {
  beforeEach(() => {
    imageUrlMock.mockReset();
  });

  it("maps a Sanity image asset to a CDN URL", () => {
    const builder = {
      width: vi.fn().mockReturnThis(),
      fit: vi.fn().mockReturnThis(),
      auto: vi.fn().mockReturnThis(),
      url: vi.fn().mockReturnValue("https://cdn.sanity.io/images/demo/project.jpg"),
    };
    imageUrlMock.mockReturnValue(builder as never);

    const project = mapSanityProjectToProject(
      {
        _id: "project-1",
        _createdAt: "2026-03-23T00:00:00.000Z",
        _updatedAt: "2026-03-23T00:00:00.000Z",
        _rev: "rev-1",
        slug: { current: "barrio-quintas" },
        title: { es: "Barrio Quintas", en: "Barrio Quintas" },
        description: { es: "Desc", en: "Desc" },
        shortDescription: { es: "Corta", en: "Short" },
        image: {
          asset: {
            _ref: "image-asset-ref",
            _type: "reference",
          },
        },
        technologies: ["React"],
        category: "webapp",
        featured: true,
      },
      "es"
    );

    expect(project.image).toBe("https://cdn.sanity.io/images/demo/project.jpg");
    expect(builder.width).toHaveBeenCalledWith(1600);
    expect(builder.fit).toHaveBeenCalledWith("max");
    expect(builder.auto).toHaveBeenCalledWith("format");
  });

  it("maps video and localized case study, dropping empty blocks", () => {
    const base = {
      _id: "project-3",
      _createdAt: "2026-03-23T00:00:00.000Z",
      _updatedAt: "2026-03-23T00:00:00.000Z",
      _rev: "rev-1",
      slug: { current: "fer-net" },
      title: { es: "Fer-Net", en: "Fer-Net" },
    };

    const project = mapSanityProjectToProject(
      {
        ...base,
        videoUrl: "https://cdn.sanity.io/files/demo/tour.mp4",
        caseStudy: {
          problem: { es: "Problema", en: "Problem" },
          result: { es: "", en: "" },
        },
      },
      "en"
    );

    expect(project.video).toBe("https://cdn.sanity.io/files/demo/tour.mp4");
    expect(project.caseStudy).toEqual({ problem: "Problem", solution: undefined, result: undefined });
    expect(mapSanityProjectToProject(base, "es").caseStudy).toBeUndefined();
    expect(mapSanityProjectToProject(base, "es").video).toBeUndefined();
  });

  it("uses the fallback image when the document has no image", () => {
    const project = mapSanityProjectToProject(
      {
        _id: "project-2",
        _createdAt: "2026-03-23T00:00:00.000Z",
        _updatedAt: "2026-03-23T00:00:00.000Z",
        _rev: "rev-2",
        slug: { current: "la-cheminee" },
        title: { es: "La cheminee", en: "La cheminee" },
        description: { es: "Desc", en: "Desc" },
        shortDescription: { es: "Corta", en: "Short" },
        technologies: ["React"],
        category: "landing",
        featured: false,
      },
      "es"
    );

    expect(project.image).toBe("/images/og-default.jpg");
    expect(imageUrlMock).not.toHaveBeenCalled();
  });
});
