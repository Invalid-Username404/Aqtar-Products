import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import ToastProvider from "@/components/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Products App - Store",
  description: "A product management application using the Store API",
  keywords: ["products", "e-commerce", "Store", "product management"],
  authors: [{ name: "Products App Team" }],
  openGraph: {
    title: "Products App - Store",
    description: "A product management application using the Store API",
    url: "https://aqtar-products.vercel.app/",
    siteName: "Products App",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Products App - Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products App - Store",
    description: "A product management application using the Store API",
    images: ["/twitter-image.jpg"],
  },
  robots: "index, follow",
  metadataBase: new URL("https://aqtar-products.vercel.app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:p-4 focus:bg-white focus:text-black"
        >
          Skip to content
        </a>

        <header className="py-4 border-b" role="banner">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link
              href="/"
              className="text-xl font-bold"
              aria-label="Products App Home"
            >
              Products App
            </Link>
            <nav aria-label="Main navigation">
              <Link
                href="/product/new"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Add New Product"
              >
                Add New Product
              </Link>
            </nav>
          </div>
        </header>

        <main
          id="main-content"
          className="container mx-auto px-4 py-8 flex-grow"
          role="main"
        >
          {children}
        </main>

        <footer className="border-t py-6" role="contentinfo">
          <div className="container mx-auto px-4 text-center text-gray-500">
            &copy; {new Date().getFullYear()} Products App - Using Store API
          </div>
        </footer>

        <ToastProvider />
      </body>
    </html>
  );
}
