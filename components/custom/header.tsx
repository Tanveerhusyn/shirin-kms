"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Calendar,
  Camera,
  Globe,
  Home,
  Image as ImageIcon,
  Info,
  Map,
  MapPin,
  Menu,
  Sun,
  Users,
  X,
} from "lucide-react"

const menuItems = [
  { name: "Home", icon: Home, path: "/" },
  // { name: "About", icon: Info, path: "/#about" },
  // { name: "Digital Village", icon: Map, path: "/digital-village" },
  { name: "Local Life", icon: Users, path: "/local-life" },
  // { name: "Media Hub", icon: ImageIcon, path: "/media-hub" },
  // { name: "Events", icon: Calendar, path: "/events" },
  { name: "Gallery", icon: Camera, path: "/gallery" },
  // { name: "Explore", icon: Globe, path: "/explore" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/90 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-lg shadow-md"
          >
            <MapPin size={24} className="text-white" />
          </motion.div>
          <div className="ml-3">
            <div
              className={`text-xl font-bold ${
                scrolled ? "text-gray-800 dark:text-white" : "text-white"
              } transition-colors duration-300`}
            >
              Shirin Kamaris
            </div>
            <div
              className={`text-xs font-light ${
                scrolled ? "text-gray-600 dark:text-gray-300" : "text-white/80"
              } transition-colors duration-300`}
            >
              Gulmit Gojal Hunza
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {menuItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ y: -2 }}
              className="relative group"
            >
              <Link
                href={item.path}
                className={`flex flex-col items-center ${
                  scrolled ? "text-gray-700 dark:text-gray-200" : "text-white"
                } hover:text-emerald-500 transition-colors duration-300`}
              >
                <item.icon size={18} className="mb-1" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                className="h-0.5 bg-emerald-500 absolute -bottom-1 left-0"
              />
            </motion.div>
          ))}

          {/* Language selector */}
          <motion.div
            whileHover={{ y: -2 }}
            className={`flex items-center ${
              scrolled ? "text-gray-700 dark:text-gray-200" : "text-white"
            } cursor-pointer px-2 py-1 rounded-full border border-transparent hover:border-emerald-400/30 transition-all duration-300`}
          >
            <Globe size={16} className="mr-1" />
            <span className="text-xs font-medium">EN</span>
          </motion.div>

          {/* Theme toggle */}
          <motion.button
            whileHover={{ rotate: 30 }}
            className={`flex items-center justify-center p-2 rounded-full ${
              scrolled
                ? "bg-gray-100 text-amber-500 dark:bg-gray-800"
                : "bg-white/10 text-yellow-300"
            } hover:bg-amber-100 dark:hover:bg-gray-700 transition-colors duration-300`}
            aria-label="Toggle dark mode"
          >
            <Sun size={18} />
          </motion.button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-full ${
              scrolled
                ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white"
                : "bg-white/10 text-white"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-lg"
        >
          <div className="px-6 py-4 space-y-1">
            {menuItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ x: 5 }}
                className="border-b border-gray-100 dark:border-gray-800 last:border-0"
              >
                <Link
                  href={item.path}
                  className="flex items-center py-3 text-gray-700 dark:text-gray-200 hover:text-emerald-500 dark:hover:text-emerald-400"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={18} className="mr-3" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </motion.div>
            ))}
            <div className="flex items-center justify-between py-3 text-gray-700 dark:text-gray-200">
              <div className="flex items-center">
                <Globe size={18} className="mr-3" />
                <span>English</span>
              </div>
              <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-amber-500">
                <Sun size={18} />
              </button>
            </div>
          </div>
        </motion.nav>
      )}
    </header>
  )
}
