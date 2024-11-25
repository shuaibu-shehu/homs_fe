import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Linkedin, Instagram, Send } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Branding Section */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center overflow-hidden space-x-2">
            <Image src="/logo.png" className=' rounded-full m-' alt="Hospital Logo" width={40} height={40} />
            <span className="text-xl font-bold">OxygenWatch</span>
          </Link>
          <p className="text-sm text-gray-400">
            Revolutionizing hospital oxygen monitoring for improved patient care and efficiency.
          </p>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-4">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            {['About', 'Features', 'Pricing', 'Testimonials', 'FAQs', 'Contact'].map((item) => (
              <li key={item}>
                <Link href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-green-400 transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <address className="text-sm text-gray-400 not-italic">
            <p>123 Hospital Street, City, State 12345</p>
            <p>Email: info@oxygenwatch.com</p>
            <p>Phone: (123) 456-7890</p>
          </address>
          <Link
            href="/contact"
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* Newsletter Subscription Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Stay Updated</h3>
          <form className="flex">
            <input
              type="email"
              placeholder="Subscribe for updates"
              className="flex-grow px-4 py-2 bg-gray-800 text-white rounded-l focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-green-700 transition-colors"
              aria-label="Subscribe"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* Social Media and Legal Section */}
      <div className="mt-8 pt-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 sm:mb-0">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
              <Link key={index} href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Icon size={24} />
              </Link>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-green-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-green-400 transition-colors">
              Terms of Service
            </Link>
            <p className="text-sm text-gray-400">© 2024 OxygenWatch. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

