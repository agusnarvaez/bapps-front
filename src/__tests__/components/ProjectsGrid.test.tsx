import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "./mocks";
import { projects } from "@/lib/data";
import ProjectsGrid from "@/components/pages/ProjectsGrid";

describe("ProjectsGrid", () => {
  beforeEach(() => {
    render(<ProjectsGrid projects={projects} />);
  });

  it("renders the title", () => {
    expect(screen.getByText("projectsPage.title")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    expect(screen.getByText("projectsPage.subtitle")).toBeInTheDocument();
  });

  it("renders filter buttons including 'all'", () => {
    expect(screen.getByText("projectsPage.filterAll")).toBeInTheDocument();
    expect(screen.getByText("projectsPage.categories.webapp")).toBeInTheDocument();
    expect(screen.getByText("projectsPage.categories.mobile")).toBeInTheDocument();
  });

  it("renders project cards with titles", () => {
    // Projects from data: "App de Gestión", "E-Commerce Premium", etc.
    expect(screen.getByText("App de Gestión")).toBeInTheDocument();
    expect(screen.getByText("E-Commerce Premium")).toBeInTheDocument();
  });

  it("renders project links with correct hrefs", () => {
    const link = screen.getByText("App de Gestión").closest("a");
    expect(link).toHaveAttribute("href", "/es/projects/proyecto-ejemplo-1");
  });

  it("filters projects when clicking a category", async () => {
    const user = userEvent.setup();
    // Click "mobile" filter
    await user.click(screen.getByText("projectsPage.categories.mobile"));

    // "App Móvil Fitness" (mobile) should be visible
    expect(screen.getByText("App Móvil Fitness")).toBeInTheDocument();

    // "App de Gestión" (webapp) should NOT be visible
    expect(screen.queryByText("App de Gestión")).not.toBeInTheDocument();
  });

  it("shows all projects when clicking 'all' filter", async () => {
    const user = userEvent.setup();
    // First filter to mobile
    await user.click(screen.getByText("projectsPage.categories.mobile"));
    // Then back to all
    await user.click(screen.getByText("projectsPage.filterAll"));

    expect(screen.getByText("App de Gestión")).toBeInTheDocument();
    expect(screen.getByText("App Móvil Fitness")).toBeInTheDocument();
  });
});
