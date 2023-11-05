import { Outfit, Philosopher } from "next/font/google";

export const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const philosopher = Philosopher({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-philosopher",
});
