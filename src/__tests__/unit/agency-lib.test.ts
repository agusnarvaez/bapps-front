import { describe, expect, it } from "vitest";
import { cleanPitch, mockupHtml, phoneKind, rubroOf, shortAddress, waLink, waNumber } from "../../../scripts/agency/lib.mjs";

describe("prospección: teléfonos", () => {
  it("arma el número de wa.me con 549, esté o no el 9", () => {
    expect(waNumber("+54 221 555-1234")).toBe("5492215551234");
    expect(waNumber("+54 9 221 555-1234")).toBe("5492215551234");
    expect(waNumber("0221 555-1234")).toBe("5492215551234");
    expect(waNumber("")).toBe("");
  });

  it("distingue celulares de fijos de La Plata y no adivina el resto", () => {
    expect(phoneKind("+54 9 221 555-1234")).toBe("movil");
    expect(phoneKind("+54 221 555-1234")).toBe("movil");
    expect(phoneKind("+54 221 427-7444")).toBe("fijo");
    expect(phoneKind("+54 11 4803-3647")).toBe("desconocido");
    expect(phoneKind("")).toBe("desconocido");
  });
});

describe("prospección: mensaje", () => {
  it("saca la nota [imagen] sin dejar espacios sueltos", () => {
    expect(cleanPitch("Te armé una muestra [imagen 👆]. Respondeme acá.")).toBe("Te armé una muestra. Respondeme acá.");
    expect(cleanPitch("Sin nota.")).toBe("Sin nota.");
  });

  it("el link lleva el número con 9 y el mensaje ya limpio", () => {
    const link = waLink("+54 221 555-1234", "Hola [imagen 👆] ¿cómo va?");
    expect(link.startsWith("https://wa.me/5492215551234?text=")).toBe(true);
    expect(decodeURIComponent(link.split("text=")[1])).toBe("Hola ¿cómo va?");
  });
});

describe("prospección: mockup", () => {
  const lead = { name: "Vete <Sol>", rubro: "veterinary_care", address: "Diag. 75 149, B1900 La Plata, Provincia de Buenos Aires", phone: "+54 221 555-1234" };

  it("usa la propuesta del rubro y los datos reales del negocio", () => {
    const html = mockupHtml(lead);
    expect(html).toContain("Cuidamos a tu mascota");
    expect(html).toContain("Urgencias");
    expect(html).toContain("Diag. 75 149, La Plata");
    expect(html).toContain("+54 221 555-1234");
  });

  it("escapa el nombre del negocio", () => {
    expect(mockupHtml(lead)).toContain("Vete &lt;Sol&gt;");
    expect(mockupHtml(lead)).not.toContain("<Sol>");
  });

  it("cae en una plantilla genérica para rubros que no conoce", () => {
    expect(rubroOf({ rubro: "florist" }).label).toBe("Comercio");
    expect(rubroOf({ rubro: "gastropub" }).label).toBe("Restaurante");
  });

  it("acorta la dirección a calle y localidad", () => {
    expect(shortAddress("C. 50 515, La Plata, Provincia de Buenos Aires")).toBe("C. 50 515, La Plata");
    expect(shortAddress("Solo calle")).toBe("Solo calle");
  });
});
