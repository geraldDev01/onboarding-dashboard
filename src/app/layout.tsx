import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Navbar } from "@/components/ui/Navbar";
import { navItems } from "@/utils";
import "./globals.css";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Onboarding Dashboard",
  description: "Onboarding dashboard application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar
            items={navItems}
            brandName="Onboarding Manager"
            logoHref="/"
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
