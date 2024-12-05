"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileFooter from "./components/MobileFooter";
import { ToastContainer, toast } from 'react-toast'

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

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

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme); 
      return newTheme;
    });
  };

  return (
    <html lang="en">
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
          style={{
            backgroundColor: theme === "light" ? "#fff" : "#1a202c", 
            color: theme === "light" ? "#000" : "#fff", 
          }}
        >
          <Navbar />
          <main className="sm:mt-[50px] md:mt-0">{children}</main>
          <Footer />
          <MobileFooter />
          <ToastContainer position="bottom-right" delay={5000} />
        </body>
      </ThemeContext.Provider>
    </html>
  );
}
