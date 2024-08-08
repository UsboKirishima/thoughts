import type { Metadata } from "next";
import { Inter, Quicksand } from "next/font/google";
import "./globals.css";

/**
 * Fonts - Configuration
 */
const inter = Inter({ subsets: ["latin"] });
const quicksand = Quicksand({ subsets: ['latin'] });


/**
 * SEO & Metadata
 */
export const metadata: Metadata = {
  title: "333revenge",
  description: "Thoughts is a basic website made to share my sad thoughts <3.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}
