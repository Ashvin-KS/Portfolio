import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
//import StagewiseProvider from "@/components/StagewiseProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ashvin K S - Full-Stack Developer Portfolio",
  description: "Personal portfolio of Ashvin K S, a full-stack developer specializing in React, Next.js, and modern web technologies.",
  keywords: ["Ashvin K S", "portfolio", "full-stack developer", "React", "Next.js", "TypeScript", "web development"],
  authors: [{ name: "Ashvin K S" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Ashvin K S - Full-Stack Developer Portfolio",
    description: "Personal portfolio showcasing projects and skills of a full-stack developer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashvin K S - Full-Stack Developer Portfolio",
    description: "Personal portfolio showcasing projects and skills of a full-stack developer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
           {/* <StagewiseProvider /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
