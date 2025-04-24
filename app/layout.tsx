
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from "@/components/site-header";
import Footer from '@/components/Footer';
import Script from "next/script";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Thuvarakan's Portfolio",
  description: "A portfolio showcasing Thuvarakan's projects and skills.",
  icons: {
    icon: "/favicon.ico", 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>

        <Script
          id="tawk-to"
          strategy="lazyOnload"
          src={`https://embed.tawk.to/67dc79d209328c1909b93d46/1imqjno1m`}
          async
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}