import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "@/components/custom/Navbar";
import {ThemeProvider} from "@/components/theme-provider";
import Footer from "@/components/custom/Footer";
import {ApolloWrapper} from "@/lib/apollo-wrapper";


const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: 'AnotherBlog',
  description: 'A blog.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
      <ApolloWrapper>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Navbar />
              {children}
              <Footer />
          </ThemeProvider>
      </ApolloWrapper>
      </body>
    </html>
  );
}
