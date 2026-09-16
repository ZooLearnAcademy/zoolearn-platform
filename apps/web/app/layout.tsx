import type { Metadata } from "next"
import { Geist, Geist_Mono, IBM_Plex_Sans, Source_Sans_3 } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { cn } from "@workspace/ui/lib/utils";

export const metadata: Metadata = {
  title: "ZooLearn — Interactive Zoology & Biology Learning Platform",
  description: "Explore interactive NCERT biology modules, 3D anatomy models, NEET preparation blueprints, taxonomy explorer, and animal kingdom deep dives.",
  icons: {
    icon: "/images/logo.png",
  },
};

const sourceSans3Heading = Source_Sans_3({subsets:['latin'],variable:'--font-heading'});

const ibmPlexSans = IBM_Plex_Sans({subsets:['latin'],weight: ['400', '500', '600', '700'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", ibmPlexSans.variable, sourceSans3Heading.variable)}
    >
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
