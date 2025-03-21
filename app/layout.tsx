import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "next-themes";



const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
        </ThemeProvider>
        {children}
        
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