import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "./mocks";
import { team } from "@/lib/data";
import TeamSection from "@/components/sections/TeamSection";

let showTeamPhotosMock = true;

vi.mock("@/hooks/useInView", () => ({
  useInView: () => ({
    ref: { current: null },
    inView: true,
  }),
}));

vi.mock("@/lib/config/client", () => ({
  clientConfig: {
    get showTeamPhotos() {
      return showTeamPhotosMock;
    },
  },
}));

describe("TeamSection", () => {
  afterEach(() => {
    vi.clearAllMocks();
    showTeamPhotosMock = true;
  });

  it("renders team photos when the public flag is enabled", () => {
    showTeamPhotosMock = true;
    const { container } = render(<TeamSection />);

    expect(container.querySelectorAll("img")).toHaveLength(team.length);

    team.forEach((member) => {
      expect(screen.getByAltText(member.name)).toBeInTheDocument();
      expect(screen.getByText(member.name)).toBeInTheDocument();
      expect(screen.getByText(member.role)).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: `${member.name} LinkedIn` })
      ).toBeInTheDocument();
    });
  });

  it("renders initials placeholders when the public flag is disabled", () => {
    showTeamPhotosMock = false;
    const { container } = render(<TeamSection />);

    expect(container.querySelectorAll("img")).toHaveLength(0);
    expect(screen.getByText("M1")).toBeInTheDocument();
    expect(screen.getByText("M2")).toBeInTheDocument();
    expect(screen.getByText("M3")).toBeInTheDocument();

    team.forEach((member) => {
      expect(screen.getByRole("img", { name: member.name })).toBeInTheDocument();
      expect(screen.getByText(member.name)).toBeInTheDocument();
      expect(screen.getByText(member.role)).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: `${member.name} LinkedIn` })
      ).toBeInTheDocument();
    });
  });
});
