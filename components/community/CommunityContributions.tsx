"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Camera, FileAudio, Mic, Upload, User, Video } from "lucide-react"

interface Contributor {
  id: string
  name: string
  age: number
  image: string
  village: string
  contributions: number
  specialty: string
}

interface Contribution {
  id: string
  type: "audio" | "video" | "photo" | "text" | "document"
  title: string
  description: string
  contributor: string
  contributorId: string
  date: string
  media: string
  likes: number
  topic: string
  featured: boolean
}

// Sample data
const contributors: Contributor[] = [
  {
    id: "khan-ali",
    name: "Khan Ali",
    age: 82,
    image: "/images/elder-1.jpg",
    village: "Upper Shirin Kamaris",
    contributions: 24,
    specialty: "Historical Narratives",
  },
  {
    id: "bibi-fatima",
    name: "Bibi Fatima",
    age: 78,
    image: "/images/elder-2.jpg",
    village: "Central Shirin Kamaris",
    contributions: 18,
    specialty: "Textile Traditions",
  },
  {
    id: "karim-shah",
    name: "Karim Shah",
    age: 75,
    image: "/images/elder-3.jpg",
    village: "Lower Shirin Kamaris",
    contributions: 32,
    specialty: "Agricultural Practices",
  },
  {
    id: "amina-begum",
    name: "Amina Begum",
    age: 80,
    image: "/images/elder-4.jpg",
    village: "Western Shirin Kamaris",
    contributions: 15,
    specialty: "Medicinal Knowledge",
  },
  {
    id: "hassan-khan",
    name: "Hassan Khan",
    age: 65,
    image: "/images/elder-5.jpg",
    village: "Eastern Shirin Kamaris",
    contributions: 21,
    specialty: "Musical Traditions",
  },
]

const contributions: Contribution[] = [
  {
    id: "story-water-ceremony",
    type: "audio",
    title: "Ancient Water Distribution Ceremony",
    description:
      "Recording of Elder Khan Ali describing the ritual of the seasonal water rights allocation that has continued for over 300 years.",
    contributor: "Khan Ali",
    contributorId: "khan-ali",
    date: "2023-04-12",
    media: "/media/water-ceremony.mp3",
    likes: 42,
    topic: "cultural-rituals",
    featured: true,
  },
  {
    id: "wedding-traditions",
    type: "video",
    title: "Traditional Wedding Ceremonies",
    description:
      "Bibi Fatima explains the intricate wedding rituals that vary between the different family lineages in our village.",
    contributor: "Bibi Fatima",
    contributorId: "bibi-fatima",
    date: "2023-06-22",
    media: "/media/wedding-traditions.mp4",
    likes: 37,
    topic: "ceremonies",
    featured: true,
  },
  {
    id: "terrace-farming",
    type: "photo",
    title: "Mountain Terrace Farming Techniques",
    description:
      "A collection of photographs documenting the traditional methods of creating and maintaining mountain terraces for farming.",
    contributor: "Karim Shah",
    contributorId: "karim-shah",
    date: "2023-05-09",
    media: "/media/terrace-farming.jpg",
    likes: 28,
    topic: "agriculture",
    featured: false,
  },
  {
    id: "medicinal-plants",
    type: "text",
    title: "Seasonal Medicinal Plants Guide",
    description:
      "Detailed knowledge about when and where to gather specific mountain herbs, and how to prepare them for various ailments.",
    contributor: "Amina Begum",
    contributorId: "amina-begum",
    date: "2023-07-14",
    media: "/media/medicinal-plants.jpg",
    likes: 54,
    topic: "medicine",
    featured: true,
  },
  {
    id: "folk-songs",
    type: "audio",
    title: "Harvest Festival Songs Collection",
    description:
      "Recordings of traditional songs that are sung during the autumn harvest festival, with explanations of their meanings.",
    contributor: "Hassan Khan",
    contributorId: "hassan-khan",
    date: "2023-08-30",
    media: "/media/harvest-songs.mp3",
    likes: 33,
    topic: "music",
    featured: false,
  },
  {
    id: "village-myths",
    type: "text",
    title: "Mountain Spirit Folklore",
    description:
      "Collection of stories about the mountain spirits that are believed to protect the village and influence the weather.",
    contributor: "Khan Ali",
    contributorId: "khan-ali",
    date: "2023-09-05",
    media: "/media/myths.jpg",
    likes: 41,
    topic: "folklore",
    featured: false,
  },
]

// Helper function to get icon for contribution type
const getContributionIcon = (type: Contribution["type"]) => {
  switch (type) {
    case "audio":
      return <FileAudio className="w-5 h-5" />
    case "video":
      return <Video className="w-5 h-5" />
    case "photo":
      return <Camera className="w-5 h-5" />
    case "text":
    case "document":
    default:
      return <Upload className="w-5 h-5" />
  }
}

export default function CommunityContributions() {
  const [activeTab, setActiveTab] = useState<
    "featured" | "recent" | "contributors"
  >("featured")
  const [selectedContributor, setSelectedContributor] =
    useState<Contributor | null>(null)

  // Filter contributions based on the active tab or selected contributor
  const filteredContributions = selectedContributor
    ? contributions.filter((c) => c.contributorId === selectedContributor.id)
    : activeTab === "featured"
    ? contributions.filter((c) => c.featured)
    : [...contributions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )

  return (
    <section className="py-16 bg-gradient-to-b from-emerald-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900">Community Voices</h2>
          <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto">
            Discover stories, traditions, and knowledge shared by our community
            members. Every contribution enriches our collective heritage and
            ensures these treasures are preserved for future generations.
          </p>
        </motion.div>

        {/* Navigation tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-white shadow-md rounded-lg inline-flex p-1">
            <button
              onClick={() => {
                setActiveTab("featured")
                setSelectedContributor(null)
              }}
              className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${
                activeTab === "featured" && !selectedContributor
                  ? "bg-emerald-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Featured Contributions
            </button>
            <button
              onClick={() => {
                setActiveTab("recent")
                setSelectedContributor(null)
              }}
              className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${
                activeTab === "recent" && !selectedContributor
                  ? "bg-emerald-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Recent Additions
            </button>
            <button
              onClick={() => {
                setActiveTab("contributors")
                setSelectedContributor(null)
              }}
              className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${
                activeTab === "contributors"
                  ? "bg-emerald-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Knowledge Keepers
            </button>
          </div>
        </div>

        {/* Knowledge contributors view */}
        {activeTab === "contributors" && !selectedContributor ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {contributors.map((contributor) => (
              <motion.div
                key={contributor.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => setSelectedContributor(contributor)}
              >
                <div className="relative h-48">
                  <Image
                    src={contributor.image}
                    alt={contributor.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900">
                    {contributor.name}
                  </h3>
                  <p className="text-emerald-600 text-sm mb-2">
                    {contributor.specialty}
                  </p>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <span>
                      {contributor.age} years old • {contributor.village}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {contributor.contributions} Contributions
                    </span>
                    <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                      View Profile
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Contributions view (featured, recent, or from a specific contributor)
          <div>
            {selectedContributor && (
              <div className="mb-8 flex items-center">
                <button
                  onClick={() => setSelectedContributor(null)}
                  className="mr-4 text-gray-600 hover:text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </button>
                <div className="flex items-center">
                  <div className="h-16 w-16 mr-4 rounded-full overflow-hidden">
                    <Image
                      src={selectedContributor.image}
                      alt={selectedContributor.name}
                      width={64}
                      height={64}
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedContributor.name}
                    </h3>
                    <p className="text-emerald-600">
                      {selectedContributor.specialty}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContributions.map((contribution) => (
                <motion.div
                  key={contribution.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative h-48 bg-gray-100">
                    {contribution.type === "video" ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="bg-white bg-opacity-80 rounded-full p-3">
                          <svg
                            className="w-10 h-10 text-emerald-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </button>
                      </div>
                    ) : contribution.type === "audio" ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-emerald-100 p-6 rounded-full">
                          <Mic className="w-12 h-12 text-emerald-600" />
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={contribution.media}
                        alt={contribution.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    )}
                    <div className="absolute top-0 right-0 m-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white text-gray-800">
                        {getContributionIcon(contribution.type)}
                        <span className="ml-1 capitalize">
                          {contribution.type}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {contribution.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {contribution.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">
                          {contribution.contributor}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {contribution.date}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <span className="ml-1">{contribution.likes}</span>
                      </div>
                      <button className="px-3 py-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                        Explore
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Contribution CTA */}
        <motion.div
          className="mt-16 bg-white rounded-2xl shadow-xl p-8 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 opacity-10 bg-pattern-heritage"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Share Your Heritage Knowledge
            </h3>
            <p className="max-w-2xl mx-auto mb-8 text-gray-600">
              Your memories, skills, and traditions are valuable pieces of our
              collective heritage. Contribute your stories, photos, recordings,
              or knowledge to help us create a living digital archive for future
              generations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
              <div className="bg-emerald-50 rounded-lg p-5 text-center">
                <div className="mx-auto bg-emerald-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <Mic className="h-6 w-6 text-emerald-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Record a Story
                </h4>
                <p className="text-sm text-gray-600">
                  Share oral histories and personal memories
                </p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-5 text-center">
                <div className="mx-auto bg-emerald-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <Camera className="h-6 w-6 text-emerald-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Upload Photos
                </h4>
                <p className="text-sm text-gray-600">
                  Contribute historical or contemporary images
                </p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-5 text-center">
                <div className="mx-auto bg-emerald-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <Upload className="h-6 w-6 text-emerald-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Document Knowledge
                </h4>
                <p className="text-sm text-gray-600">
                  Record traditional skills and practices
                </p>
              </div>
            </div>
            <button className="px-8 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors shadow-md">
              Start Contributing
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
