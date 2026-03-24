import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "./mocks";
import CotizadorWizard from "@/components/pages/CotizadorWizard";

describe("CotizadorWizard", () => {
  beforeEach(() => {
    render(<CotizadorWizard />);
  });

  it("renders the title and subtitle", () => {
    expect(screen.getByText("contact.title")).toBeInTheDocument();
    expect(screen.getByText("contact.subtitle")).toBeInTheDocument();
  });

  it("renders step 1 (project type selection) initially", () => {
    // Text appears in both step indicator and step heading
    const matches = screen.getAllByText("contact.steps.projectType");
    expect(matches.length).toBeGreaterThanOrEqual(1);
    // Project type buttons
    expect(screen.getByText("contact.projectTypes.webapp")).toBeInTheDocument();
    expect(screen.getByText("contact.projectTypes.mobile")).toBeInTheDocument();
    expect(screen.getByText("contact.projectTypes.landing")).toBeInTheDocument();
    expect(screen.getByText("contact.projectTypes.ecommerce")).toBeInTheDocument();
  });

  it("shows 4 step indicators", () => {
    // projectType appears in both step indicator and step heading
    expect(screen.getAllByText("contact.steps.projectType").length).toBeGreaterThanOrEqual(1);
    // Other step labels appear only in the step indicator
    expect(screen.getByText("contact.steps.details")).toBeInTheDocument();
    expect(screen.getByText("contact.steps.timeline")).toBeInTheDocument();
    expect(screen.getByText("contact.steps.contactInfo")).toBeInTheDocument();
  });

  it("shows next button on step 1", () => {
    expect(screen.getByText("contact.next")).toBeInTheDocument();
  });

  it("does not show back button on step 1", () => {
    expect(screen.queryByText("contact.back")).not.toBeInTheDocument();
  });

  it("can select a project type and advance to step 2", async () => {
    const user = userEvent.setup();

    // Select webapp
    await user.click(screen.getByText("contact.projectTypes.webapp"));

    // Click next
    await user.click(screen.getByText("contact.next"));

    // Step 2 should show description field label
    // Label includes " *" suffix, so use regex
    expect(await screen.findByText(/contact\.fields\.description/)).toBeInTheDocument();
  });

  it("cannot advance without selecting project type", async () => {
    const user = userEvent.setup();

    // Click next without selecting type
    await user.click(screen.getByText("contact.next"));

    // Should still be on step 1 (error shown or still showing project types)
    expect(screen.getByText("contact.projectTypes.webapp")).toBeInTheDocument();
  });

  it("shows back button on step 2", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText("contact.projectTypes.webapp"));
    await user.click(screen.getByText("contact.next"));

    expect(screen.getByText("contact.back")).toBeInTheDocument();
  });

  it("can go back from step 2 to step 1", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText("contact.projectTypes.webapp"));
    await user.click(screen.getByText("contact.next"));

    // Go back
    await user.click(screen.getByText("contact.back"));

    // Should see step 1 content again
    expect(screen.getByText("contact.projectTypes.webapp")).toBeInTheDocument();
  });
});
