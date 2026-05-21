import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mental Coach",
  description: "A supportive mental coach powered by AI",
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
