import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "./mocks";
import ProjectImage from "@/components/ui/ProjectImage";

describe("ProjectImage", () => {
  it("renders the provided image src initially", () => {
    render(
      <ProjectImage
        src="https://cdn.sanity.io/images/demo/project.jpg"
        alt="Proyecto"
        width={320}
        height={180}
      />
    );

    expect(screen.getByAltText("Proyecto")).toHaveAttribute(
      "src",
      "https://cdn.sanity.io/images/demo/project.jpg"
    );
  });

  it("switches to the fallback image when the source fails", () => {
    render(
      <ProjectImage
        src="https://cdn.sanity.io/images/demo/missing.jpg"
        alt="Proyecto"
        width={320}
        height={180}
      />
    );

    const image = screen.getByAltText("Proyecto");
    fireEvent.error(image);

    expect(image).toHaveAttribute("src", "/images/og-default.jpg");
  });
});
