"use client"

import React, { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Home,
  Mountain,
  Sun,
  Tree,
  Users,
} from "lucide-react"
import * as LucideIcons from "lucide-react"

import VillageProfile from "@/components/custom/VillageProfile.tsx"
import VillageDataSection from "@/components/custom/VillateDataSection.tsx"

export default function ShirinKamarisProfile() {
  const [activeTab, setActiveTab] = useState(0)
  const [expandedSection, setExpandedSection] = useState(null)

  const villageData = [
    {
      icon: Tree,
      title: "Natural Beauty",
      value: "4,000 hectares",
      description:
        "of pristine forests and meadows surrounding the village, offering breathtaking views and diverse flora and fauna.",
    },
    {
      icon: Users,
      title: "Population",
      value: "2,500",
      description:
        "residents living in harmony, preserving traditional customs while embracing sustainable development.",
    },
    {
      icon: Home,
      title: "Traditional Houses",
      value: "200+",
      description:
        "beautifully preserved traditional houses showcasing the unique architectural style of the region.",
    },
  ]

  const villageProfileData = [
    {
      title: "History",
      content:
        "Shirin Kamaris, nestled in the heart of the Karakoram mountains, has a rich history dating back to the 15th century. Originally a small settlement along an ancient trade route, it has evolved into a vibrant community that beautifully preserves its cultural heritage. Key historical events include the construction of the central mosque in 1680 and the establishment of the first school in 1920.",
      image:
        "https://images.unsplash.com/photo-1566419808810-658178380987?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGlzdG9yaWNhbCUyMHZpbGxhZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Culture",
      content:
        "The culture of Shirin Kamaris is a vibrant tapestry of traditions, music, and festivals. The village is renowned for its intricate woodcarving, colorful textiles, and traditional music played on instruments like the rubab and daf. Annual festivals celebrate harvests, changing seasons, and important cultural milestones, drawing visitors from far and wide.",
      image:
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cnVyYWwlMjBjb21tdW5pdHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Economy",
      content:
        "The economy of Shirin Kamaris is diverse and sustainable. Agriculture forms the backbone, with terraced fields producing high-quality fruits, nuts, and vegetables. Traditional handicrafts, including woodcarving and textile weaving, contribute significantly to the local economy. In recent years, eco-tourism has emerged as a growing sector, providing new opportunities for the community.",
      image:
        "https://images.unsplash.com/photo-1501180984405-c4b9d9c6efe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJhbCUyMHJlc291cmNlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
  ]

  return (
    <main className="bg-gradient-to-b from-green-50 to-white py-20">
      <div className="container mx-auto px-4">
        {/* Village Statistics Section */}
        <VillageDataSection />
        <VillageProfile />
        {/* Attractions Section with Accordion */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-green-800 mb-12 text-center">
            Explore Shirin Kamaris
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Natural Wonders",
                icon: Mountain,
                items: [
                  "Breathtaking mountain vistas",
                  "Crystal-clear streams and waterfalls",
                  "Lush alpine meadows",
                  "Diverse wildlife including rare species",
                ],
              },
              {
                title: "Cultural Heritage",
                icon: Home,
                items: [
                  "15th-century central mosque",
                  "Traditional wood-carved houses",
                  "Local handicraft workshops",
                  "Folk music and dance performances",
                ],
              },
              {
                title: "Seasonal Attractions",
                icon: Sun,
                content:
                  "Experience the changing beauty of Shirin Kamaris throughout the year. Spring brings colorful wildflower blooms, summer offers perfect hiking weather, autumn paints the landscape in golden hues, and winter transforms the village into a serene snow-covered wonderland.",
              },
            ].map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedSection(expandedSection === index ? null : index)
                  }
                  className="w-full px-6 py-4 text-left font-semibold text-green-600 flex justify-between items-center"
                >
                  <span className="flex items-center">
                    <section.icon className="w-6 h-6 mr-2" />
                    {section.title}
                  </span>
                  {expandedSection === index ? <ChevronUp /> : <ChevronDown />}
                </button>
                {expandedSection === index && (
                  <div className="px-6 py-4">
                    {section.items ? (
                      <ul className="space-y-2">
                        {section.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-center text-green-700"
                          >
                            <ArrowRight className="h-5 w-5 mr-2 text-green-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-green-700">{section.content}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
