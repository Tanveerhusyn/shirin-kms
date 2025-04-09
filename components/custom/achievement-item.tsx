// @ts-nocheck
"use client"

import React, { ReactNode } from "react"

const AchievementItem = ({
  icon,
  children,
}: {
  icon: ReactNode
  children: ReactNode
}) => (
  <div className="flex items-center space-x-3 mb-3 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-sm">
    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full text-white">
      {icon}
    </div>
    <span className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm flex-grow">
      {children}
    </span>
  </div>
)

export default AchievementItem
