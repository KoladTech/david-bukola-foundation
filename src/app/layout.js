"use client";
import "./globals.css";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { TbMenuDeep } from "react-icons/tb";
import { FaX } from "react-icons/fa6";
import localFont from "next/font/local";
import Link from "next/link";
import { RiFacebookBoxFill } from "react-icons/ri";
import { RiTwitterXLine } from "react-icons/ri";
import { GrInstagram } from "react-icons/gr";
import { ApiStatsProvider } from "@/context/ApiStatsContext";
import { mediaBaseUrl } from "@/lib/constants";
import { Phone, MapPin, Mail } from "lucide-react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0); // Store header height dynamically
  const headerRef = useRef(null); // Reference to the header element

  useEffect(() => {
    // Measure header height and update state
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > headerHeight) {
        // Scrolling down
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, headerHeight]);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  // const router = useRouter();
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <html lang="en">
      <head>
        <title>David Bukola Foundation</title>
        <meta
          name="description"
          content="Where care meets community. Join us in making a difference today"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <header className="bg-white sticky top-0 z-50 shadow-sm"> */}
        {/* <header
          className={`
        fixed top-0 left-0 right-0 
        transform transition-transform duration-300 ease-in-out 
        bg-white shadow-sm z-50
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
          ref={headerRef}
        > */}
        <header
          ref={headerRef} // Attach the reference
          style={{
            position: "fixed",
            top: showHeader ? "0" : `-${headerHeight}px`, // Dynamically slide based on height
            transition: "top 0.3s ease-in-out",
            width: "100%",
            backgroundColor: "#fff",
            zIndex: 1000,
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="container mx-auto my-8 px-4 py-4 flex items-center justify-between text-sm lg:text-base">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                className="hidden md:block"
                src={`${mediaBaseUrl}/images/dbf-full-logo.svg`}
                alt="Foundation Logo"
                width={140}
                height={110}
              />
              <Image
                className="md:hidden"
                src={`${mediaBaseUrl}/images/dbf-full-logo.svg`}
                alt="Foundation Logo"
                width={140}
                height={140}
              />
              <span className="sr-only">
                DAVIDBUKOLA DEVELOPMENT FOUNDATION
              </span>
            </Link>
            <nav className="hidden md:flex space-x-6 md-lg:space-x-0 md-lg:text-xs sticky top-0">
              {[
                //an object with all the different routes for the header
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/testimonials", label: "Testimonials" },
                { href: "/achievements", label: "Achievements" },
                { href: "/projects", label: "Projects" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 rounded-full transition duration-300 ${
                    //isActive sets the color of the route in the header to blue if that is the route we are in
                    isActive(href)
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:text-white hover:bg-blue-600"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="hidden md:flex md-lg:text-xs items-center space-x-4">
              <Link
                href="/donate"
                onClick={toggleMenu}
                className={`px-4 py-2 rounded-full hover:bg-blue-500 transition duration-300 ${
                  !isActive("/get-involved")
                    ? "bg-blue-600 text-white"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                Donate
              </Link>
              <Link
                href="/get-involved"
                onClick={toggleMenu}
                className={`px-2 lg:px-4 py-2 rounded-full hover:bg-blue-50 transition duration-300 ${
                  isActive("/get-involved")
                    ? "bg-blue-600 text-white"
                    : "bg-blue-50 text-blue-500"
                }`}
              >
                Get Involved
              </Link>
            </div>
            <button onClick={toggleMenu} className="md:hidden">
              <TbMenuDeep className="h-12 w-12 text-gray-500" />
            </button>
          </div>
        </header>
        {/* Mobile Menu - Always in DOM but transforms control visibility */}
        <div
          className={`fixed inset-0 bg-white z-50 md:hidden transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="container mx-auto px-6 py-8 flex flex-col h-full gap-12">
            <div className="flex justify-end py-8">
              <button onClick={toggleMenu}>
                <FaX className="h-8 w-8 text-gray-500" />
              </button>
            </div>
            <nav className="flex flex-col space-y-6 mt-12 ps-5">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/testimonials", label: "Testimonials" },
                { href: "/achievements", label: "Achievements" },
                { href: "/projects", label: "Projects" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={toggleMenu}
                  className={`font-semibold text-2xl transition-all duration-300 ${
                    isActive(href)
                      ? "text-blue-500"
                      : "text-gray-600 hover:bg-blue-500"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto mb-24 space-x-4 flex justify-center">
              <Link
                href="/donate"
                onClick={toggleMenu}
                className={`px-4 py-2 rounded-full hover:bg-blue-500 transition duration-300 ${
                  !isActive("/get-involved")
                    ? "bg-blue-600 text-white"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                Donate
              </Link>
              <Link
                href="/get-involved"
                onClick={toggleMenu}
                className={`px-2 lg:px-4 py-2 rounded-full hover:bg-blue-50 transition duration-300 ${
                  isActive("/get-involved")
                    ? "bg-blue-600 text-white"
                    : "bg-blue-50 text-blue-500"
                }`}
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>
        <main style={{ marginTop: `${headerHeight}px` }}>
          {/* <main className={`mt-[${headerHeight}px]`}> */}
          <ApiStatsProvider>{children}</ApiStatsProvider>
        </main>
        {/* Default Footer Section */}
        <div className="relative mt-auto">
          <div
            className="absolute bottom-0 left-0 right-0 h-[calc(100%+2rem)] bg-cover bg-center w-full"
            style={{
              backgroundImage: `url(${mediaBaseUrl}/images/dbf-footer-image.jpg)`,
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="relative z-10 container mx-auto px-4 md:px-2 md-lg:px-0.5">
            <footer className="bg-white/85 text-gray-600 rounded-t-3xl py-6 lg:mx-8 md:mx-2 md-lg:-mx-4">
              <div className="container mx-auto px-12">
                <div className="flex flex-col md:flex-row md:justify-between md:items-end md:space-x-8">
                  {/* Left Section */}
                  <div className="mb-8 md:mb-0 flex flex-col items-start">
                    <Image
                      className="mb-2"
                      src={`${mediaBaseUrl}/images/dbf-full-logo.svg`}
                      alt="Foundation Logo"
                      width={140}
                      height={110}
                    />
                    {/* Contact Us  */}
                    <p className="text-black font-bold mb-4">Contact Us</p>
                    <div className="flex space-x-4 mb-4">
                      <a
                        href="https://www.instagram.com/davidbukola_foundation/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-black transition-colors"
                      >
                        <GrInstagram className="w-6 h-6" />
                      </a>
                      <a
                        href="https://www.facebook.com/profile.php?id=61567075205637&mibextid=ZbWKwL"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-black transition-colors"
                      >
                        <RiFacebookBoxFill className="w-6 h-6" />
                      </a>
                      {/* <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-black transition-colors"
                      > */}
                      <RiTwitterXLine className="w-6 h-6" />
                      {/* </a> */}
                    </div>
                    {/* Contact us section */}
                    <div className="space-y-2">
                      {/* Mail */}
                      <div className="flex gap-2">
                        <Mail className="h-5 w-5" />
                        <a
                          href="mailto:davidbukolafoundation@gmail.com"
                          className="text-sm text-gray-600 transition-colors"
                        >
                          davidbukolafoundation@gmail.com
                        </a>
                      </div>
                      {/* Phone Number */}
                      <div className="flex gap-2">
                        <Phone className="h-5 w-5" />
                        <p className="text-sm text-gray-600">
                          +234 706 528 6910
                        </p>
                      </div>
                      {/* Business address */}
                      <div className="flex gap-2">
                        <MapPin className="h-5 w-5" />
                        <p className="text-sm text-gray-600">
                          No 2 Karji by Riverfront School, Ungwan waziri,
                          Kaduna.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex flex-col space-y-8 md:text-left md:flex-grow md:items-end items-start md-lg:text-sm">
                    {/* First Row - Navigation Links */}
                    <nav className="flex flex-col md:flex-row gap-4 md:gap-8 md:justify-start font-bold lg:gap-2 md-lg:gap-2 md-lg:text-xs">
                      {[
                        { href: "/", label: "Home" },
                        { href: "/about", label: "About Us" },
                        { href: "/testimonials", label: "Testimonials" },
                        { href: "/achievements", label: "Achievements" },
                        { href: "/projects", label: "Projects" },
                        { href: "/donate", label: "Donate" },
                      ].map(({ href, label }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={toggleMenu}
                          className="text-black hover:font-bold hover:scale-105 transition-transform"
                        >
                          {label}
                        </Link>
                      ))}
                    </nav>

                    {/* Second Row - Copyright Text */}
                    <div>
                      <p>© 2024 DavidBukolaFoundation. All rights reserved.</p>
                    </div>

                    {/* Third Row - Developer and Designer Info */}
                    <div>
                      <p>
                        Designed by Abimbola | Developed by Ibrahim & Kayode
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
