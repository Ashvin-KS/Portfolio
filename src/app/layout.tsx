import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "John Doe - Full-Stack Developer Portfolio",
  description: "Personal portfolio of John Doe, a full-stack developer specializing in React, Next.js, and modern web technologies.",
  keywords: ["John Doe", "portfolio", "full-stack developer", "React", "Next.js", "TypeScript", "web development"],
  authors: [{ name: "John Doe" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "John Doe - Full-Stack Developer Portfolio",
    description: "Personal portfolio showcasing projects and skills of a full-stack developer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "John Doe - Full-Stack Developer Portfolio",
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
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
