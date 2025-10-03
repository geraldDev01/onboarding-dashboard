import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Navbar, Footer } from "@/components/ui";
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
          <div className="min-h-screen bg-background dark:bg-background flex flex-col">
            <Navbar
              items={navItems}
              brandName="Onboarding Manager"
              logoHref="/"
            />
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
