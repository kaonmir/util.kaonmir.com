import type { Metadata } from "next";
import "./globals.css";
import "./reset.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL("https://util.kaonmir.com"),
  title: "Son's Utils",
  description: "Every Utility you need!",
  authors: [
    {
      name: "Sunghun Son",
      url: "https://kaonmir.github.io",
    },
  ],
  keywords: ["utils", "tools"],
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "Son's Utils",
    locale: "en_US",
    url: "https://kaonmir.github.io",
    siteName: "Son",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Son's Utils",
      },
    ],
  },
  twitter: {
    title: "Son's Utils",
    site: "@kaonmir",
    card: "summary",
    creator: "@kaonmir",
    description: "Every Utility you need!",
    siteId: "@kaonmir",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Son's Utils",
      },
    ],
    creatorId: "@kaonmir",
  },
  abstract: "Every Utility you need!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 2000,
            style: {
              fontFamily: "Pretendard, -apple-system",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
