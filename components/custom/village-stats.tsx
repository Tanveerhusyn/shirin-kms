"use client"

import React from "react"
import {
  ArrowRightIcon,
  Building,
  Home,
  TreeDeciduous,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import AnimatedShinyText from "@/components/magicui/animated-shiny-text"

const stats = [
  {
    title: "Houses",
    value: 250,
    icon: Home,
    description: "Total residential buildings",
    gradient: "from-pink-500 to-purple-500",
  },
  {
    title: "Population",
    value: 1200,
    icon: Users,
    description: "Residents as of last census",
    gradient: "from-green-400 to-blue-500",
  },
  {
    title: "Green Areas",
    value: 5,
    icon: TreeDeciduous,
    description: "Parks and nature reserves",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    title: "Public Buildings",
    value: 15,
    icon: Building,
    description: "Schools, offices, and community centers",
    gradient: "from-indigo-400 to-cyan-400",
  },
]

const StatCard = ({ title, value, icon: Icon, description, gradient }) => (
  <div className={`relative overflow-hidden rounded-xl shadow-lg group`}>
    <div
      className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-75 group-hover:opacity-100 transition-opacity duration-300`}
    ></div>
    <div className="relative p-6 flex flex-col h-full z-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <Icon className="h-6 w-6 text-white opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="text-4xl font-extrabold text-white mb-2">{value}</div>
      <p className="text-sm text-white opacity-75 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
        {description}
      </p>
    </div>
  </div>
)

export default function VillageStats() {
  return (
    <div className="w-full py-20 bg-white">
      <div className=" px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
  )
}
