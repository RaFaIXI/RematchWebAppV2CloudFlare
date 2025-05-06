import '@/styles/global.css';

import clsx from 'clsx';
import { Inter } from 'next/font/google';

import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { ClientLanguageHandler } from "@/components/client-language-handler";
import Script from "next/script";



interface RootLayoutProps {
  children: React.ReactNode;
}




// app/layout.tsx - Server Component

// Set up the Google Font
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the page (this is the Next.js way)
export const metadata = {
  title: "Master Rematch: Guides, Tutorials & Training | Rematch CookBook",
  description: "Master Rematch with detailed soccer tutorials, training guides, and techniques for dribbling, shooting, and goalkeeping. Your ultimate Rematch guide.",
  keywords: ["Rematch","Rematch Guide","Guide", "soccer", "tutorials", "training", "techniques", "goalkeeper", "shooting", "dribbling","Rematch",
    "Rematch Tutorial",
    "Master Rematch",
    "soccer guide",
    "training video",
    "dribbling tutorial",
    "goalkeeper techniques"
  ],
  authors: [{ name: "RaFa", url: "https://discord.com/invite/ua8D567NAp" }],
  creator: "RaFa",
  siteName: "Rematch CookBook",
  other: {
    "google-site-verification": "WMwlYdrRXd3vYBa2i5cgQENMA5FPl6Xs_d2osN49Llc",
  },
  type: "website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>

        <link rel="icon" href="/assets/favicon-32x32.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CM8EWL1MJ7"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CM8EWL1MJ7');
          `}
        </Script>


        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Rematch CookBook",
            "url": "rematch-guide.com",
            "description": "Learn the essential techniques to improve your game with our detailed video tutorials.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "rematch-guide.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Master Rematch",
            "url": "rematch-guide.com",
            "description": "Learn the essential techniques to improve your game with our detailed video tutorials.",
            "logo": "rematch-guide.com/favicon-32x32.png", 
            "sameAs": [
              "https://www.youtube.com/@rafassbm",
              "https://discord.com/invite/ua8D567NAp"
            ]
          })
        }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <ClientLanguageHandler />
            <div className="flex-1">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}