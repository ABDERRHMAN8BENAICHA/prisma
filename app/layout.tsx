import { EdgeStoreProvider } from '../lib/edgestore';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { getCookie } from '@/lib';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cook = getCookie("token");
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          themes={['dark', 'light']}
        >
          <EdgeStoreProvider>
            <Container>
              <Nav />
              {children}
              <Footer />
            </Container>
          </EdgeStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
