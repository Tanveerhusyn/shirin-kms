"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Calendar,
  Camera,
  Heart,
  Home,
  Info,
  MapPin,
  Menu,
  Moon,
  Sun,
} from "lucide-react"

const menuItems = [
  { name: "Home", icon: Home, path: "/" },
  { name: "About", icon: Info, path: "/#about" },
  // { name: "Location", icon: MapPin, path: "/location" },
  { name: "Events", icon: Calendar, path: "/events" },
  { name: "Gallery", icon: Camera, path: "/gallery" },
  // { name: "Visit Us", icon: Heart, path: "/visit-us" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const smoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement
      if (target.hash === "#about") {
        e.preventDefault()
        const about = document.querySelector(target.hash)
        if (about) {
          const headerHeight =
            document.querySelector("header")?.offsetHeight || 0
          const aboutPosition =
            about.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight

          window.scrollTo({
            top: aboutPosition,
            behavior: "smooth",
          })
        }
      }
    }

    document.addEventListener("click", smoothScroll)
    return () => document.removeEventListener("click", smoothScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      style={{
        zIndex: 999,
      }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`w-full shadow-md fixed top-0 left-0 right-0 z-50 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="w-full mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center group">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-green-600 p-2 rounded-full"
          >
            <MapPin size={24} className="text-white" />
          </motion.div>
          <div className="ml-3 flex flex-col">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-serif font-bold tracking-wide leading-none"
            >
              Shirin Kamaris
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm font-light pt-1 italic tracking-wide leading-none"
            >
              A Beautiful Village in Gulmit Gojal Hunza
            </motion.span>
          </div>
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex space-x-6">
            {menuItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.path}
                  className={`flex items-center space-x-1 hover:text-green-600 transition-colors duration-200 ${
                    isDarkMode
                      ? "text-gray-300 hover:text-green-400"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  <item.icon size={16} />
                  <span>{item.name}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`transition-colors duration-200 ${
              isDarkMode
                ? "text-yellow-400 hover:text-yellow-300"
                : "text-gray-600 hover:text-yellow-500"
            }`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden transition-colors duration-200 ${
              isDarkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Menu size={24} />
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.nav
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className={`lg:hidden overflow-hidden ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <ul className="px-4 py-2">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ delay: index * 0.1 }}
              className="py-2"
            >
              <Link
                href={item.path}
                className={`flex items-center space-x-2 ${
                  isDarkMode
                    ? "text-gray-300 hover:text-green-400"
                    : "text-gray-700 hover:text-green-600"
                } transition-colors duration-200`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
    </motion.header>
  )
}
