import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const roboto = localFont({
  src: [
    { path: "../assets/fonts/roboto-medium.ttf", weight: "500", style: "normal" },
    { path: "../assets/fonts/roboto-bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hygiene essentials | SavvyMoney Test",
  description: "Explore Hazmat, Soap, Paper, and Desinfectant in an illustrated product showcase.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>{children}</body>
    </html>
  );
}
