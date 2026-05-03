import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "胡子师傅 Master Mustache",
  description: "Master Mustache Signature Cake",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}