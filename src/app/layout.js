
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "BlogOp - Unleash Your Thoughts",
  description: "BlogOp is your ultimate platform to explore, write, and share blogs effortlessly. Dive into a world of creativity and expression.",
  keywords: "blog, blogging platform, write blogs, explore blogs, BlogOp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <ThemeProvider attribute="class">
            <ScrollToTop>
              <Layout>
                {children}
              </Layout>
            </ScrollToTop>
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
