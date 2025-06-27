"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        scrolled ? "bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Image
                src="/images/daniels-logo.png"
                alt="The Daniels Company"
                width={200}
                height={50}
                className={`h-8 w-auto transition-all duration-300 cursor-pointer`}
              />
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="/about"
              className={`transition-colors duration-300 ${
                scrolled ? "text-gray-700 hover:text-orange-500" : "text-white hover:text-orange-300"
              }`}
            >
              About
            </Link>
            <Link
              href="/services"
              className={`transition-colors duration-300 ${
                scrolled ? "text-gray-700 hover:text-orange-500" : "text-white hover:text-orange-300"
              }`}
            >
              Services
            </Link>
            <Link
              href="/equipments"
              className={`transition-colors duration-300 ${
                scrolled ? "text-gray-700 hover:text-orange-500" : "text-white hover:text-orange-300"
              }`}
            >
              Equipments
            </Link>
            <Link
              href="/sample-projects"
              className={`transition-colors duration-300 ${
                scrolled ? "text-gray-700 hover:text-orange-500" : "text-white hover:text-orange-300"
              }`}
            >
              Sample Projects
            </Link>
            <Link
              href="/contact"
              className={`transition-colors duration-300 ${
                scrolled ? "text-gray-700 hover:text-orange-500" : "text-white hover:text-orange-300"
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`transition-colors duration-300 ${
                scrolled ? "text-gray-700 hover:text-orange-500" : "text-white hover:text-orange-300"
              }`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div
              className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t transition-colors duration-300 ${
                scrolled ? "bg-white" : "bg-black/90 backdrop-blur-sm"
              }`}
            >
              <Link
                href="/about"
                className={`block px-3 py-2 transition-colors duration-300 ${
                  scrolled ? "text-gray-700 hover:text-orange-500" : "text-white hover:text-orange-300"
                }`}
              >
                About
              </Link>
              <Link
                href="/services"
                className={`block px-3 py-2 transition-colors duration-300 ${
                  scrolled ? "text-gray-700 hover:text-orange-500" : "text-white hover:text-orange-300"
                }`}
              >
                Services
              </Link>
              <Link
                href="/equipments"
                className={`block px-3 py-2 transition-colors duration-300 ${
                  scrolled ? "text-gray-700 hover:text-orange-500" : "text-white hover:text-orange-300"
                }`}
              >
                Equipments
              </Link>
              <Link
                href="/sample-projects"
                className={`block px-3 py-2 transition-colors duration-300 ${
                  scrolled ? "text-gray-700 hover:text-orange-500" : "text-white hover:text-orange-300"
                }`}
              >
                Sample Projects
              </Link>
              <Link
                href="/contact"
                className={`block px-3 py-2 transition-colors duration-300 ${
                  scrolled ? "text-gray-700 hover:text-orange-500" : "text-white hover:text-orange-300"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
