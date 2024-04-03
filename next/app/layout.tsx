import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";

import {cookieToInitialState} from 'wagmi'

import {config} from '@/config'
import Web3ModalProvider from '@/context'
import {headers} from "next/headers";
import React from "react";
import {Toaster} from "sonner";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Unity Web3Modal WAGMI",
  description: "Unity Web3Modal WAGMI Example",
};

export default function RootLayout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
    <body className={inter.className}>
    <Toaster richColors/>
    <Web3ModalProvider initialState={initialState}>{children}</Web3ModalProvider>
    </body>
    </html>
  );
}
