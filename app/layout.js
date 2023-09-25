"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { UserProvider } from "../context/UserContext";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "NodeScribe",
//   description: "Social Media That Matters",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <UserProvider> */}
      <body className={inter.className}>{children}</body>
      {/* </UserProvider> */}
    </html>
  );
}
