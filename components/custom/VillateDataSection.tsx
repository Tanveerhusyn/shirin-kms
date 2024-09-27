"use client"

import React from "react"
import { motion } from "framer-motion"

const VillageStatsSection: React.FC = () => {
  const villageStats = [
    {
      value: "4,000",
      unit: "hectares",
      description: "of pristine forests and meadows",
    },
    {
      value: "2,500",
      unit: "residents",
      description: "living in harmony with nature",
    },
    {
      value: "200+",
      unit: "houses",
      description: "showcasing traditional architecture",
    },
    {
      value: "15th",
      unit: "century",
      description: "origins of our historic village",
    },
  ]

  return (
    <div className="py-16 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {villageStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-green-600 mb-2">
                {stat.value}
                <span className="text-2xl font-medium text-green-500 ml-1">
                  {stat.unit}
                </span>
              </p>
              <p className="text-sm text-green-700">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VillageStatsSection
