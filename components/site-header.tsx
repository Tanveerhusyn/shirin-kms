// components/Header.js
"use client"

import Image from "next/image"
import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Village Logo" width={50} height={50} />
          <span className="ml-2 text-2xl font-bold">Shirin Kamaris</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/who-we-are" className="hover:text-green-600">
                WHO WE ARE
              </Link>
            </li>
            <li>
              <Link href="/what-we-do" className="hover:text-green-600">
                WHAT WE DO
              </Link>
            </li>
            <li>
              <Link href="/where-we-work" className="hover:text-green-600">
                WHERE WE WORK
              </Link>
            </li>
            <li>
              <Link href="/how-we-work" className="hover:text-green-600">
                HOW WE WORK
              </Link>
            </li>
            <li>
              <Link
                href="/resources-and-media"
                className="hover:text-green-600"
              >
                RESOURCES AND MEDIA
              </Link>
            </li>
            <li>
              <Link href="/get-involved" className="hover:text-green-600">
                GET INVOLVED
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center">
          <button className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <select className="bg-transparent border-none">
            <option>EN</option>
            {/* Add other language options as needed */}
          </select>
        </div>
      </div>
    </header>
  )
}
