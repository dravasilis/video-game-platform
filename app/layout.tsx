import { Metadata } from "next/types";
import "./globals.css";
import { Play } from "next/font/google";

export const metadata: Metadata = {
  title: "Gamepedia: The IMDb Of Video Games", // Base Title,
  description:
    "Gamepedia | Explore, discover and save all your favourite games in this expanded video game platform.",
  openGraph: {
    title: "Gamepedia: The IMDb Of Video Games",
    description:
      "Gamepedia | Explore, discover and save all your favourite games in this expanded video game platform.",
    images: [
      {
        url: "/images/logo.png",
      },
    ],
    url: "https://video-game-platform.vercel.app/",
  },
  twitter: {
    title: "Gamepedia: The IMDb Of Video Games",
    description:
      "Gamepedia | Explore, discover and save all your favourite games in this expanded video game platform.",
    site: "https://video-game-platform.vercel.app/",
    card: "summary_large_image",
  },
};

const roboto = Play({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={roboto.className} lang="en">
      <body>{children}</body>
    </html>
  );
}
