import Head from "next/head";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Video Game Platform", // Base Title
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
