import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster as Toaster2 } from "react-hot-toast";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import ThemeProvider from "@/components/layout/ThemeToggle/theme-provider";
import DesignerContextProvider from "@/components/context/DesignerContext";
import { MobileProvider } from "@/context/paymentContext";
import NextTopLoader from "nextjs-toploader";
import QueryProvider from "@/context/react-query";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Evently",
  description: "Evently is a platform for event management.",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.variable}>
          {/* <NextTopLoader /> */}
          <QueryProvider>
            <DesignerContextProvider>
              <MobileProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                >
                  {children}
                  <Toaster />
                  <Toaster2 />
                </ThemeProvider>
              </MobileProvider>
            </DesignerContextProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
