"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.get("/api/logout");
      console.log("Logout successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex justify-between items-center p-4 bg-blue-500 text-white">
          <h1 className="text-2xl font-bold">
            <Link href="/">To Do List</Link>
          </h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/signup" className="hover:underline">
                  Signup
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
              </li>
              <li
                className="hover:underline cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
