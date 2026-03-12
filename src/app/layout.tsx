import type { Metadata } from "next";
import { Commissioner } from "next/font/google";
import "./globals.css";

const commissioner = Commissioner({
  variable: "--font-commissioner",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const siteUrl = "https://bapps.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BApps | Desarrollo de aplicaciones a medida",
    template: "%s | BApps",
  },
  description:
    "Desarrollamos aplicaciones web, móviles y landing pages a medida. Transformamos ideas en experiencias digitales excepcionales.",
  keywords: [
    "desarrollo web",
    "aplicaciones a medida",
    "landing pages",
    "desarrollo móvil",
    "software",
    "BApps",
    "desarrollo a medida",
    "apps Argentina",
  ],
  authors: [{ name: "BApps" }],
  creator: "BApps",
  openGraph: {
    type: "website",
    locale: "es_AR",
    alternateLocale: "en_US",
    siteName: "BApps",
    url: siteUrl,
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "BApps - Desarrollo de aplicaciones a medida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BApps | Desarrollo de aplicaciones a medida",
    description:
      "Desarrollamos aplicaciones web, móviles y landing pages a medida.",
    images: ["/images/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/deltagothicone/v2/H4cjBXyAlmHe0CMFGCV8CYsS_dGrb1R0tHk.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Agregar favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${commissioner.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
