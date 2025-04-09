"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  Clock,
  Filter,
  Home,
  Languages,
  Leaf,
  Scissors,
  Search,
  Tablet,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react"

type KnowledgeCategory =
  | "architecture"
  | "agriculture"
  | "crafts"
  | "medicine"
  | "cuisine"
  | "language"

interface KnowledgeItem {
  id: string
  title: string
  summary: string
  description: string
  mediaUrl: string
  category: KnowledgeCategory
  contributors: string[]
  relatedItems: string[]
  preservationStatus: "thriving" | "endangered" | "reviving" | "lost"
}

// Sample indigenous knowledge data
const knowledgeItems: KnowledgeItem[] = [
  {
    id: "traditional-house",
    title: "Traditional House Construction",
    summary:
      "Ancient methods of building stone and timber houses adapted to mountain conditions",
    description: `The traditional houses of Shirin Kamaris are built using a unique method that has evolved over centuries to withstand harsh mountain winters and occasional earthquakes. The foundation is made of carefully selected river stones set in a specific pattern. The walls combine load-bearing stone corners with timber frame sections filled with a mixture of clay, straw, and pine needles for insulation. Roof construction features a distinctive overlapping timber design that sheds snow effectively while providing ventilation for cooking fires. The south-facing orientation with carefully calculated roof overhangs provides passive solar heating in winter while keeping the interior cool in summer.`,
    mediaUrl: "/images/traditional-house.jpg",
    category: "architecture",
    contributors: ["Ibrahim Khan", "Noor Shah", "Amina Bibi"],
    relatedItems: ["wood-carving", "stone-masonry"],
    preservationStatus: "endangered",
  },
  {
    id: "medicinal-herbs",
    title: "Mountain Medicinal Plants",
    summary:
      "Collection and preparation of local plants for traditional remedies",
    description: `The mountains surrounding Shirin Kamaris are home to dozens of medicinal plants that villagers have used for generations. Each spring, experienced gatherers identify and harvest specific plants at the optimal time for potency. The village maintains strict gathering protocols to ensure sustainability. Plants are dried in specific locations based on their properties - some in direct sunlight, others in shade, and some at night under moonlight. Preparation methods include tinctures, salves, teas, and poultices. Each family maintains a small medicinal garden with the most commonly used varieties, while more rare specimens are wildcrafted. Specific combinations address different ailments, from respiratory problems common in the high altitude to joint pain and digestive issues.`,
    mediaUrl: "/images/medicinal-herbs.jpg",
    category: "medicine",
    contributors: ["Sakina Begum", "Karim Jan", "Leila Shah"],
    relatedItems: ["seasonal-calendar", "traditional-storage"],
    preservationStatus: "endangered",
  },
  {
    id: "water-management",
    title: "Mountain Terrace Irrigation",
    summary:
      "Traditional water channels, gates and timing systems for equitable distribution",
    description: `The village's terraced agricultural fields are sustained by an intricate irrigation system designed centuries ago. Water from mountain springs is directed through stone-lined channels that follow the natural contours of the land. A system of wooden gates controls flow to different sections based on a complex schedule that ensures fair distribution to all families. The water-sharing system is governed by traditional rules passed down through generations, with specific roles assigned to maintain different parts of the system. During dry periods, the village elder oversees a more restricted schedule where fields receive water in rotation. The positioning of terraces and channels maximizes water retention while preventing erosion on the steep mountain slopes. This system operates without modern pumps, using only gravity and carefully calculated gradients.`,
    mediaUrl: "/images/irrigation.jpg",
    category: "agriculture",
    contributors: ["Ahmed Khan", "Fatima Shah", "Mohammad Ali"],
    relatedItems: ["seasonal-calendar", "terrace-building"],
    preservationStatus: "thriving",
  },
  {
    id: "weaving-patterns",
    title: "Traditional Textile Patterns",
    summary:
      "Symbolic designs used in local textiles that tell stories and mark identity",
    description: `The distinctive weaving patterns of Shirin Kamaris textiles are more than decorative elements - they form a complex visual language that records the village's history, beliefs, and relationship with the natural world. Each family maintains certain patterns that are passed through generations, while community patterns are shared. Colors are derived from plant and mineral sources gathered locally. The weaving process follows specific traditional steps from wool processing to the final product. Different patterns serve different purposes - some are protective, others commemorative, and some tell stories of significant events. Fine woolen shawls with these patterns were historically important trade items along the Silk Road, and specific designs identify the wearer's family lineage and status within the community.`,
    mediaUrl: "/images/weaving.jpg",
    category: "crafts",
    contributors: ["Zarina Bibi", "Laila Khan", "Nadia Shah"],
    relatedItems: ["wool-processing", "natural-dyes"],
    preservationStatus: "reviving",
  },
  {
    id: "seasonal-bread",
    title: "Ceremonial Bread Making",
    summary:
      "Special bread varieties prepared for different seasons and celebrations",
    description: `The village maintains a tradition of creating specific types of bread for different seasonal celebrations and life events. These are prepared in the community tandoor ovens using grain grown in the surrounding fields. Each bread variety has a distinctive shape, decoration, and ingredient profile that corresponds to its purpose. Spring festival bread incorporates fresh herbs, while winter solstice bread contains dried fruits and nuts stored from the autumn harvest. Wedding bread features elaborate decorative patterns that symbolize prosperity and fertility. The kneading, shaping, and baking techniques are passed down through generations, with specific songs and stories shared during the communal preparation process. The head baker holds significant status in the village hierarchy and oversees the training of younger bakers to continue the tradition.`,
    mediaUrl: "/images/ceremonial-bread.jpg",
    category: "cuisine",
    contributors: ["Nasreen Begum", "Jamil Shah", "Farida Khan"],
    relatedItems: ["grain-storage", "tandoor-construction"],
    preservationStatus: "thriving",
  },
  {
    id: "oral-storytelling",
    title: "Winter Storytelling Traditions",
    summary:
      "Oral tradition of epic tales and local histories preserved through winter gatherings",
    description: `During the long winter months when outside work is limited, Shirin Kamaris maintains a rich tradition of evening storytelling gatherings. The village has preserved epic tales that take multiple nights to complete, with complex narrative structures that include poetry, song, and prose elements. Story cycles relate to different themes, from mountain spirits to historical events and legendary figures. Expert storytellers employ specific vocal techniques and mnemonic methods to accurately preserve stories that can be hours long. Certain tales are only told at specific times of year or for particular occasions. The communal nature of these gatherings reinforces social bonds while transmitting cultural knowledge, historical information, and ethical guidance to younger generations. Different families are known for preserving different story cycles, creating a distributed archive of cultural memory.`,
    mediaUrl: "/images/storytelling.jpg",
    category: "language",
    contributors: ["Rashid Khan", "Aliya Shah", "Kamal Hassan"],
    relatedItems: ["musical-accompaniment", "memory-techniques"],
    preservationStatus: "endangered",
  },
]

// Category mapping for icons
const categoryIcons: Record<KnowledgeCategory, any> = {
  architecture: Home,
  agriculture: Leaf,
  crafts: Scissors,
  medicine: Tablet,
  cuisine: UtensilsCrossed,
  language: Languages,
}

// Status mapping for UI elements
const statusConfig: Record<string, { color: string; label: string }> = {
  thriving: {
    color:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    label: "Thriving Practice",
  },
  endangered: {
    color:
      "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-800",
    label: "Endangered Knowledge",
  },
  reviving: {
    color:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    label: "Reviving Tradition",
  },
  lost: {
    color:
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700",
    label: "Lost Heritage",
  },
}

export default function KnowledgeRepository() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<
    KnowledgeCategory | "all"
  >("all")
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        expandedItem &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setExpandedItem(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [expandedItem])

  // Filter knowledge items based on search and category
  const filteredItems = knowledgeItems.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Handle opening an item
  const handleItemClick = (itemId: string) => {
    setExpandedItem(itemId)
    // Scroll to top when modal opens
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section
      className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950"
      id="knowledge"
    >
      <div className="absolute inset-0 bg-[url(/paper-pattern.svg)] opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center mb-3 bg-indigo-100 dark:bg-indigo-900/30 px-4 py-1.5 rounded-full">
            <BookOpen
              size={16}
              className="mr-2 text-indigo-600 dark:text-indigo-400"
            />
            <span className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
              INDIGENOUS WISDOM
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">
            Knowledge Repository
          </h2>

          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Preserving the traditional wisdom, practices, and techniques that
            have been passed down through generations in Shirin Kamaris.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search traditional knowledge..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Mobile filter button */}
            <div className="md:hidden w-full">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <Filter
                    size={16}
                    className="mr-2 text-gray-500 dark:text-gray-400"
                  />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Filter by Category
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    showMobileFilters ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {showMobileFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-2 overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
                  >
                    <div className="p-3 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setSelectedCategory("all")
                          setShowMobileFilters(false)
                        }}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          selectedCategory === "all"
                            ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        All Categories
                      </button>

                      {(Object.keys(categoryIcons) as KnowledgeCategory[]).map(
                        (category) => {
                          const Icon = categoryIcons[category]
                          return (
                            <button
                              key={category}
                              onClick={() => {
                                setSelectedCategory(category)
                                setShowMobileFilters(false)
                              }}
                              className={`px-3 py-2 rounded-md text-sm font-medium capitalize transition-colors flex items-center ${
                                selectedCategory === category
                                  ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300"
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              <Icon size={14} className="mr-1.5" />
                              {category}
                            </button>
                          )
                        }
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop filter buttons */}
            <div className="hidden md:flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === "all"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
              >
                All Categories
              </button>

              {(Object.keys(categoryIcons) as KnowledgeCategory[]).map(
                (category) => {
                  const Icon = categoryIcons[category]
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors flex items-center ${
                        selectedCategory === category
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <Icon size={14} className="mr-1.5" />
                      {category}
                    </button>
                  )
                }
              )}
            </div>
          </div>
        </div>

        {/* Knowledge items grid */}
        {filteredItems.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {filteredItems.map((item) => {
              const ItemIcon = categoryIcons[item.category]
              const statusStyle = statusConfig[item.preservationStatus].color

              return (
                <motion.div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-52">
                    <Image
                      src={item.mediaUrl}
                      alt={item.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusStyle}`}
                        >
                          <Clock size={12} className="mr-1" />
                          {item.preservationStatus}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex items-start gap-2 mb-3">
                      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
                        <ItemIcon
                          size={18}
                          className="text-indigo-600 dark:text-indigo-400"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize py-1">
                        {item.category}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                      {item.summary}
                    </p>

                    <div className="mt-auto">
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                        <Users size={14} className="mr-1.5" />
                        <span>
                          Contributors:{" "}
                          {item.contributors.slice(0, 2).join(", ")}
                          {item.contributors.length > 2 &&
                            ` +${item.contributors.length - 2}`}
                        </span>
                      </div>

                      <button
                        onClick={() => handleItemClick(item.id)}
                        className="w-full py-2.5 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 rounded-lg font-medium text-sm flex items-center justify-center transition-colors"
                      >
                        Explore Knowledge{" "}
                        <ArrowUpRight size={14} className="ml-1.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <Search
              size={48}
              className="mx-auto text-gray-300 dark:text-gray-600 mb-4"
            />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Try adjusting your search or filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Knowledge Item Modal */}
        <AnimatePresence>
          {expandedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
            >
              <motion.div
                ref={modalRef}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
              >
                {knowledgeItems.map((item) => {
                  if (item.id !== expandedItem) return null

                  const ItemIcon = categoryIcons[item.category]
                  const statusStyle =
                    statusConfig[item.preservationStatus].color
                  const statusLabel =
                    statusConfig[item.preservationStatus].label

                  return (
                    <div key={item.id} className="flex flex-col h-full">
                      <div className="relative">
                        <div className="h-56 md:h-72 relative">
                          <Image
                            src={item.mediaUrl}
                            alt={item.title}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>

                        <button
                          onClick={() => setExpandedItem(null)}
                          className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                        >
                          <X size={20} />
                        </button>

                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200">
                              <ItemIcon size={12} className="mr-1.5" />
                              {item.category}
                            </span>
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${statusStyle}`}
                            >
                              {statusLabel}
                            </span>
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-6 overflow-y-auto flex-grow">
                        <div className="prose prose-indigo dark:prose-invert max-w-none">
                          <p className="lead text-lg text-gray-600 dark:text-gray-300 font-medium mb-6">
                            {item.summary}
                          </p>

                          <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                            {item.description}
                          </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                            <Users
                              size={18}
                              className="mr-2 text-indigo-500 dark:text-indigo-400"
                            />
                            Knowledge Contributors
                          </h4>

                          <div className="flex flex-wrap gap-2 mb-8">
                            {item.contributors.map((contributor, index) => (
                              <span
                                key={index}
                                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 text-sm"
                              >
                                {contributor}
                              </span>
                            ))}
                          </div>

                          {item.relatedItems.length > 0 && (
                            <>
                              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Related Knowledge
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {item.relatedItems.map((relatedItem, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm border border-indigo-100 dark:border-indigo-800"
                                  >
                                    {relatedItem}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                        <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
                          Contribute to this Knowledge
                        </button>
                      </div>
                    </div>
                  )
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
