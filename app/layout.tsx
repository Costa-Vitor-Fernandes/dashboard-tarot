import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
export const dynamic = "force-dynamic";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard Tarot",
  description: "Database Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
