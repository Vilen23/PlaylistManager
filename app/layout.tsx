import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Appbar from "./Components/Appbar";
import { SparklesCore } from "@/components/ui/sparkles";

const inter = Poppins({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
          <div className="z-10">
            <Appbar />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
