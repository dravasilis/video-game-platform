import { Metadata } from "next/types";
import "./globals.css";
import { Play } from "next/font/google";

export const metadata: Metadata = {
  title: "Gamepedia: Explore Now The Largest Video Game Platform", // Optimized title capitalization
  description:
    "Discover, explore, and track your favorite video games with Gamepedia – the ultimate gaming platform.", // SEO-friendly and under 160 chars
  openGraph: {
    title: "Gamepedia: Explore Now The Largest Video Game Platform",
    description:
      "Discover, explore, and track your favorite video games with Gamepedia – the ultimate gaming platform.",
    url: "https://video-game-platform.vercel.app/",
    type: "website", // Added Open Graph type
    images: [
      {
        url: "https://video-game-platform.vercel.app/images/logo.png", // Changed to absolute URL
      },
    ],
  },
  twitter: {
    title: "Gamepedia: Explore Now The Largest Video Game Platform",
    description:
      "Discover, explore, and track your favorite video games with Gamepedia – the ultimate gaming platform.",
    site: "@yourtwitterhandle", // Replace with your actual Twitter handle
    card: "summary_large_image",
    images: ["https://video-game-platform.vercel.app/images/logo.png"], // Added Twitter image
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
