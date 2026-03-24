import { describe, it, expect } from "vitest";
import { z } from "zod";

// Replicate the schema from CotizadorWizard (not exported, so we recreate it)
const formSchema = z.object({
  projectType: z.string().min(1),
  description: z.string().min(10),
  features: z.string().optional(),
  reference: z.string().optional(),
  timeline: z.string().min(1),
  budget: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
});

const validData = {
  projectType: "webapp",
  description: "Una app completa de gestión",
  features: "Dashboard, reportes",
  reference: "https://ejemplo.com",
  timeline: "1-3 meses",
  budget: "$1000-$5000",
  name: "Juan Pérez",
  email: "juan@test.com",
  phone: "+541112345678",
  company: "MiEmpresa",
};

describe("CotizadorWizard formSchema", () => {
  it("accepts valid complete data", () => {
    const result = formSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("accepts data with only required fields", () => {
    const result = formSchema.safeParse({
      projectType: "mobile",
      description: "App de fitness personalizada",
      timeline: "3-6 meses",
      budget: "$5000-$10000",
      name: "Ana",
      email: "ana@test.com",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty projectType", () => {
    const result = formSchema.safeParse({ ...validData, projectType: "" });
    expect(result.success).toBe(false);
  });

  it("rejects short description (< 10 chars)", () => {
    const result = formSchema.safeParse({ ...validData, description: "corta" });
    expect(result.success).toBe(false);
  });

  it("rejects short name (< 2 chars)", () => {
    const result = formSchema.safeParse({ ...validData, name: "A" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = formSchema.safeParse({ ...validData, email: "no-email" });
    expect(result.success).toBe(false);
  });

  it("rejects missing required fields", () => {
    const result = formSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("allows optional fields to be undefined", () => {
    const result = formSchema.safeParse({
      projectType: "landing",
      description: "Landing page para SaaS",
      timeline: "1 mes",
      budget: "$500-$1000",
      name: "Pedro",
      email: "pedro@test.com",
      features: undefined,
      reference: undefined,
      phone: undefined,
      company: undefined,
    });
    expect(result.success).toBe(true);
  });
});
