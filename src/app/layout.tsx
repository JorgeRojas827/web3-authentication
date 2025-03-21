"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/config/web3";
import ErrorBoundary from "@/components/ErrorBoundary";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <SessionProvider refetchInterval={0}>
                <RainbowKitProvider>
                  <RainbowKitSiweNextAuthProvider>
                    {children}
                  </RainbowKitSiweNextAuthProvider>
                </RainbowKitProvider>
              </SessionProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
