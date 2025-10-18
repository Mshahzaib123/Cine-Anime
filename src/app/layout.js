import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "../context/theme-provider";
import AnimationProvider from "../context/animation-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CineSphere - Movie & Anime Discovery",
  description: "A Next.js demo showcasing animated headings using GSAP and custom styles.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <AnimationProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Navbar/>
            {children}
            <Footer/>
          </body>
        </AnimationProvider>
      </ThemeProvider>
    </html>
  );
}
