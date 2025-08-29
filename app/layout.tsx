import type { Metadata } from "next";
import { UiProvider } from "@/components/providers/ui-provider";
import {Instrument_Sans} from "next/font/google"
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Linky",
  description: "linky is link tree app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${instrumentSans.variable} font-sans`}>
        <UiProvider>{children}</UiProvider>
      </body>
    </html>
  );
}
