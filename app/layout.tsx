import { Metadata } from "next/types";
import "./globals.css";
import { Play } from "next/font/google";

export const metadata: Metadata = {
  title: "Video Game Platform", // Base Title,
};

const roboto = Play({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={roboto.className}>
      <body>{children}</body>
    </html>
  );
}
