import type { Metadata } from "next";
import "./globals.css";

import { TopNav } from "@/components/custom/TopNav";
import { Footer } from "@/components/custom/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen">
          <TopNav />
          <div>{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
