"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AuthProvider } from "./utils/authContext";
import { useAuth } from "./utils/authContext";

const inter = Inter({ subsets: ["latin"] });

function LayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { isLoggedIn, userName, login, logout } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("api/checkauth");
        const { isLoggedIn, userName } = response.data;
        if (isLoggedIn) {
          login(userName);
        }
        console.log(userName);
      } catch (error) {
        console.error("Failed to check authentication:", error);
      }
    };
    checkAuth();
  }, [login]);

  const handleLogout = async () => {
    try {
      await axios.get("/api/logout");
      logout();
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
              {isLoggedIn ? (
                <>
                  <li>
                    Logged as <span className="font-bold">{userName}</span>
                  </li>
                  <li
                    className="hover:underline cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </>
              ) : (
                <>
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
                </>
              )}
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <LayoutContent>{children}</LayoutContent>
    </AuthProvider>
  );
}
