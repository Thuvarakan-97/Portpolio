// app/layout.tsx

import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Thuvarakan's Portfolio",
  description: "A portfolio showcasing Thuvarakan's projects and skills.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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