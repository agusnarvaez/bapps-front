import { describe, it, expect } from "vitest";
import { projects, team, testimonials, services, stats } from "@/lib/data";
import type {
  Project,
  TeamMember,
  Testimonial,
  Service,
} from "@/lib/data/types";

describe("Data integrity", () => {
  describe("projects", () => {
    it("has at least one project", () => {
      expect(projects.length).toBeGreaterThan(0);
    });

    it("every project has required fields", () => {
      projects.forEach((p: Project) => {
        expect(p.slug).toBeTruthy();
        expect(p.title).toBeTruthy();
        expect(p.description).toBeTruthy();
        expect(p.shortDescription).toBeTruthy();
        expect(p.image).toBeTruthy();
        expect(p.technologies.length).toBeGreaterThan(0);
        expect(["webapp", "mobile", "landing", "ecommerce"]).toContain(
          p.category
        );
        expect(typeof p.featured).toBe("boolean");
      });
    });

    it("slugs are unique", () => {
      const slugs = projects.map((p) => p.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });

    it("has at least one featured project", () => {
      expect(projects.some((p) => p.featured)).toBe(true);
    });
  });

  describe("team", () => {
    it("has at least one member", () => {
      expect(team.length).toBeGreaterThan(0);
    });

    it("every member has name, role, image", () => {
      team.forEach((m: TeamMember) => {
        expect(m.name).toBeTruthy();
        expect(m.role).toBeTruthy();
        expect(m.image).toBeTruthy();
      });
    });
  });

  describe("testimonials", () => {
    it("has at least one testimonial", () => {
      expect(testimonials.length).toBeGreaterThan(0);
    });

    it("every testimonial has required fields", () => {
      testimonials.forEach((t: Testimonial) => {
        expect(t.quote).toBeTruthy();
        expect(t.author).toBeTruthy();
        expect(t.role).toBeTruthy();
        expect(t.company).toBeTruthy();
      });
    });
  });

  describe("services", () => {
    it("has at least one service", () => {
      expect(services.length).toBeGreaterThan(0);
    });

    it("every service has key and icon", () => {
      services.forEach((s: Service) => {
        expect(s.key).toBeTruthy();
        expect(s.icon).toBeTruthy();
      });
    });

    it("keys are unique", () => {
      const keys = services.map((s) => s.key);
      expect(new Set(keys).size).toBe(keys.length);
    });
  });

  describe("stats", () => {
    it("has positive numeric values", () => {
      expect(stats.projects).toBeGreaterThan(0);
      expect(stats.clients).toBeGreaterThan(0);
      expect(stats.years).toBeGreaterThan(0);
    });
  });
});
