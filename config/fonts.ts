import { Fira_Code as FontMono, Inter as FontSans, Plus_Jakarta_Sans as FontJakarta } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
export const fontJakarta = FontJakarta({
  subsets: ["latin"],
  variable: "--font-jakarta",
});
