import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Image
              src="/images/daniels-logo.png"
              alt="The Daniels Company"
              width={200}
              height={50}
              className="h-8 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 mb-6 max-w-md">
              Leading coal processing solutions with over 35 years of experience. We deliver innovative, efficient, and
              sustainable processing technologies for the global energy industry.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-gray-300 hover:text-orange-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#news" className="text-gray-300 hover:text-orange-500 transition-colors">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link href="#careers" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-gray-300">
                  1234 Industrial Blvd
                  <br />
                  Coal Valley, WV 25301
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-gray-300">info@danielscompany.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 The Daniels Company. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
