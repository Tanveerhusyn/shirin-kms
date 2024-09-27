"use client"

import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"

type Tab = {
  title: string
  value: string
  content?: string | React.ReactNode | any
}

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[]
  containerClassName?: string
  activeTabClassName?: string
  tabClassName?: string
  contentClassName?: string
}) => {
  const [activeTab, setActiveTab] = useState<Tab>(propTabs[0])

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex flex-row items-center justify-between w-full mb-4",
          containerClassName
        )}
      >
        {propTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "relative py-2 px-1 flex-grow text-center  transition-colors",
              tabClassName,
              activeTab.value === tab.value
                ? "text-white"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            {activeTab.value === tab.value && (
              <motion.div
                layoutId="activeTab"
                className={cn(
                  "absolute inset-0 bg-green-600 rounded-2xl",
                  activeTabClassName
                )}
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 text-sm md:text-base">
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab.value}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={cn("mt-4", contentClassName)}
        >
          {activeTab.content}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
