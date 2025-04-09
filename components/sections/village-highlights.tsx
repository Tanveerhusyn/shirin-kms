"use client"

import { motion } from "framer-motion"
import { Award, Home, Trees, Users } from "lucide-react"

const highlights = [
  {
    icon: Users,
    title: "Population",
    value: "5,000+",
    description: "Residents in our community",
  },
  {
    icon: Home,
    title: "Heritage",
    value: "150+",
    description: "Years of rich history",
  },
  {
    icon: Trees,
    title: "Green Space",
    value: "40%",
    description: "Of total village area",
  },
  {
    icon: Award,
    title: "Recognition",
    value: "12",
    description: "Community awards",
  },
]

export default function VillageHighlights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {highlights.map((highlight, index) => (
        <motion.div
          key={highlight.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="p-6 rounded-xl bg-card border shadow-sm"
        >
          <highlight.icon className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-2xl font-bold mb-2">{highlight.value}</h3>
          <p className="text-lg font-medium mb-1">{highlight.title}</p>
          <p className="text-muted-foreground">{highlight.description}</p>
        </motion.div>
      ))}
    </div>
  )
}
