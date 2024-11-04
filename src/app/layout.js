"use client";
import { useState } from "react";
import { TbMenuDeep } from "react-icons/tb";
import { FaX } from "react-icons/fa6";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { RiFacebookBoxFill } from "react-icons/ri";
import { RiTwitterXLine } from "react-icons/ri";
import { GrDocumentVerified, GrInstagram } from "react-icons/gr";
import Image from "next/image";
import UnderConstruction from "@/components/UnderConstruction";

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

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <html lang="en">
      <head>
        <title>David Bukola Foundation</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                className="hidden md:block"
                src="/logo_variation 1.svg"
                alt="Foundation Logo"
                width={140}
                height={110}
              />
              <Image
                className="md:hidden"
                src="/symbol.svg"
                alt="Foundation Logo"
                width={70}
                height={70}
              />
              <span className="sr-only">
                DAVIDBUKOLA DEVELOPMENT FOUNDATION
              </span>
            </Link>
            <nav className="hidden md:flex space-x-6 md-lg:space-x-1">
              <Link
                href="/"
                className="text-gray-600 hover:text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                About Us
              </Link>
              <Link
                href="/achievements"
                className="text-gray-600 hover:text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                Achievements
              </Link>
              <Link
                href="/projects"
                className="text-gray-600 hover:text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                Projects
              </Link>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/donate"
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                Donate
              </Link>
              <Link
                href="/join"
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-50 transition duration-300"
              >
                Join Us
              </Link>
            </div>
            <button onClick={toggleMenu} className="md:hidden">
              <TbMenuDeep className="h-12 w-12 text-gray-500" />
            </button>
          </div>
        </header>
        <UnderConstruction />
        {isMenuOpen && (
          <div
            className={`fixed inset-0 bg-white z-50 md:hidden transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            // This transition does not work yet
          >
            <div className="container mx-auto px-6 py-8 flex flex-col h-full gap-10">
              <div className="flex justify-end py-8">
                <button onClick={toggleMenu}>
                  <FaX className="h-8 w-8 text-gray-500" />
                </button>
              </div>
              <nav className="flex flex-col space-y-6 mt-12 ps-5">
                <Link
                  href="/"
                  className="text-blue-500 font-semibold text-2xl"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 text-2xl"
                  onClick={toggleMenu}
                >
                  About Us
                </Link>
                <Link
                  href="/achievements"
                  className="text-gray-600 hover:text-gray-900 text-2xl"
                  onClick={toggleMenu}
                >
                  Achievements
                </Link>
                <Link
                  href="/projects"
                  className="text-gray-600 hover:text-gray-900 text-2xl"
                  onClick={toggleMenu}
                >
                  Projects
                </Link>
              </nav>
              <div className="mt-auto mb-12 space-x-4 flex justify-center">
                <Link
                  href="/donate"
                  className="block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 text-center text-xl"
                  onClick={toggleMenu}
                >
                  Donate
                </Link>
                <Link
                  href="/join"
                  className="block border border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-50 transition duration-300 text-center text-xl"
                  onClick={toggleMenu}
                >
                  Join Us
                </Link>
              </div>
            </div>
          </div>
        )}
        {children}
        {/* Default Footer Section */}
      </body>
    </html>
  );
}
