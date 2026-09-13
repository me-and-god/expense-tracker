import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/features/components/frontpage/Header";

const PoppinsSans = Poppins({
  variable: "--font-Poppins-sans",
  subsets: ["latin"],
  weight: "100"
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "A money management system",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${PoppinsSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header/>
        {children}
        </body>
    </html>
  );
}
