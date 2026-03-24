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
      expect(screen.getAllByText(member.role).length).toBeGreaterThan(0);
      expect(
        screen.getByRole("link", { name: `${member.name} LinkedIn` })
      ).toBeInTheDocument();
    });
  });

  it("renders initials placeholders when the public flag is disabled", () => {
    showTeamPhotosMock = false;
    const { container } = render(<TeamSection />);

    expect(container.querySelectorAll("img")).toHaveLength(0);

    team.forEach((member) => {
      const initials = member.name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

      expect(screen.getByRole("img", { name: member.name })).toBeInTheDocument();
      expect(screen.getByText(initials)).toBeInTheDocument();
      expect(screen.getByText(member.name)).toBeInTheDocument();
      expect(screen.getAllByText(member.role).length).toBeGreaterThan(0);
      expect(
        screen.getByRole("link", { name: `${member.name} LinkedIn` })
      ).toBeInTheDocument();
    });
  });
});
