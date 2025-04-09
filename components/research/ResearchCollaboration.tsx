"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowUpRight,
  BookOpenCheck,
  Building2,
  CalendarDays,
  ExternalLink,
  FileSymlink,
  FileText,
  Globe,
  GraduationCap,
  Library,
  Link2,
  MapPin,
  Microscope,
  User,
  Users,
} from "lucide-react"

// Research project type definition
interface ResearchProject {
  id: string
  title: string
  summary: string
  description: string
  leadResearcher: string
  institution: string
  collaborators: string[]
  timeline: string
  location: string
  keywords: string[]
  status: "active" | "completed" | "proposed" | "seeking-partners"
  publications?: Publication[]
  mainImage: string
}

// Publication type definition
interface Publication {
  id: string
  title: string
  journal: string
  year: number
  authors: string[]
  url: string
  doi?: string
}

// Sample research projects data
const researchProjects: ResearchProject[] = [
  {
    id: "botanical-survey",
    title: "Medicinal Flora of Shirin Kamaris",
    summary:
      "Comprehensive survey of medicinal plants and their traditional uses in the region",
    description:
      "This project aims to document, analyze, and preserve knowledge of medicinal plants used by the Shirin Kamaris community. Our team is working with local healers to catalog plant species, their preparation methods, and therapeutic applications. The project includes DNA barcoding of species, chemical analysis of active compounds, and creation of a digital database to preserve this invaluable knowledge for future generations. Field research includes seasonal collection trips with knowledge holders, laboratory analysis, and documentation through photography and video recordings of preparation techniques.",
    leadResearcher: "Dr. Amina Hassan",
    institution: "Karakoram Botanical Institute",
    collaborators: [
      "Shirin Kamaris Herbalists Association",
      "University of Ethnobotany",
      "Indigenous Knowledge Preservation Foundation",
    ],
    timeline: "2022-2025",
    location: "Shirin Kamaris and surrounding mountain valleys",
    keywords: [
      "ethnobotany",
      "medicinal plants",
      "traditional medicine",
      "bioprospecting",
    ],
    status: "active",
    publications: [
      {
        id: "pub-1",
        title:
          "Preliminary Findings on Ethnomedicinal Practices in Shirin Kamaris",
        journal: "Journal of Mountain Ethnobotany",
        year: 2023,
        authors: ["Hassan, A.", "Khan, S.", "Bibi, F."],
        url: "https://example.com/publications/1",
        doi: "10.1234/jme.2023.01",
      },
    ],
    mainImage: "/images/medicinal-herbs.jpg",
  },
  {
    id: "traditional-architecture",
    title: "Adaptive Architecture of Mountain Communities",
    summary:
      "Study of traditional building techniques and their climate resilience",
    description:
      "This research documents and analyzes the traditional architecture of Shirin Kamaris, focusing on how historical building techniques provide natural climate control, earthquake resistance, and sustainable resource use. Our team is creating detailed architectural drawings, thermal performance models, and material analyses. The study examines the potential of these techniques to inform contemporary sustainable building practices. Community elders and local builders are key collaborators, sharing their knowledge of construction methods passed down through generations.",
    leadResearcher: "Prof. Ibrahim Shah",
    institution: "School of Traditional Architecture",
    collaborators: [
      "Mountain Resilience Institute",
      "Sustainable Building Coalition",
      "Shirin Kamaris Builders Guild",
    ],
    timeline: "2021-2024",
    location: "Shirin Kamaris village structures",
    keywords: [
      "traditional architecture",
      "climate adaptation",
      "sustainable building",
      "seismic resistance",
    ],
    status: "active",
    mainImage: "/images/traditional-house.jpg",
  },
  {
    id: "language-preservation",
    title: "Digital Preservation of Kamaris Dialect",
    summary:
      "Recording and analyzing the unique dialect and oral traditions of the region",
    description:
      "This linguistic research project focuses on documenting the endangered dialect spoken in Shirin Kamaris. Our team is creating audio recordings of conversations, traditional stories, and songs, accompanied by transcriptions and translations. The project includes developing a digital lexicon, grammatical analysis, and interactive learning materials. Community elders are central participants, sharing their knowledge of specialized vocabulary, idioms, and narrative forms. The research aims to support language revitalization efforts and preserve this unique cultural heritage.",
    leadResearcher: "Dr. Nadia Rahman",
    institution: "Linguistic Heritage Institute",
    collaborators: [
      "Digital Language Archive",
      "Regional Cultural Foundation",
      "Community Elders Council",
    ],
    timeline: "2023-2026",
    location: "Shirin Kamaris community",
    keywords: [
      "linguistics",
      "endangered languages",
      "oral traditions",
      "cultural preservation",
    ],
    status: "active",
    mainImage: "/images/storytelling.jpg",
  },
  {
    id: "water-management",
    title: "Traditional Water Conservation Systems",
    summary:
      "Analysis of historical irrigation methods and their modern applications",
    description:
      "This research examines the sophisticated water management systems developed in Shirin Kamaris over centuries. We are mapping the network of channels, reservoirs, and distribution mechanisms, while documenting the social institutions that govern water sharing. The project analyzes how these traditional methods maximize efficiency in a water-scarce environment and their potential applications for modern water conservation. Using hydrological modeling and historical data, we're evaluating system performance under changing climate conditions.",
    leadResearcher: "Dr. Malik Anwar",
    institution: "Center for Water Resources",
    collaborators: [
      "Sustainable Irrigation Coalition",
      "Mountain Hydrology Lab",
      "Traditional Knowledge Network",
    ],
    timeline: "2022-2024",
    location: "Shirin Kamaris irrigation systems",
    keywords: [
      "water management",
      "traditional irrigation",
      "resource governance",
      "climate adaptation",
    ],
    status: "active",
    mainImage: "/images/irrigation.jpg",
  },
  {
    id: "textile-traditions",
    title: "Symbolic Language of Textile Patterns",
    summary:
      "Decoding the cultural meanings embedded in traditional textile designs",
    description:
      "This research project analyzes the rich symbolic language expressed through the textile traditions of Shirin Kamaris. We are documenting pattern elements, their meanings, variations, and the techniques used to create them. Working with master weavers, we're exploring how motifs relate to historical events, belief systems, and social structures. The project includes creating a digital pattern library, conducting comparative analysis with textiles from neighboring regions, and tracing the evolution of designs over time.",
    leadResearcher: "Prof. Farida Malik",
    institution: "Textile Arts Research Center",
    collaborators: [
      "Cultural Symbolism Institute",
      "Master Weavers Association",
      "Digital Heritage Archive",
    ],
    timeline: "2023-2025",
    location: "Shirin Kamaris weaving workshops",
    keywords: [
      "textile arts",
      "cultural symbols",
      "material culture",
      "artistic traditions",
    ],
    status: "proposed",
    mainImage: "/images/weaving.jpg",
  },
]

// Status configuration for UI elements
const statusConfig: Record<string, { color: string; label: string }> = {
  active: {
    color:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    label: "Active Research",
  },
  completed: {
    color:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    label: "Completed Study",
  },
  proposed: {
    color:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    label: "Proposed Project",
  },
  "seeking-partners": {
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    label: "Seeking Collaborators",
  },
}

export default function ResearchCollaboration() {
  const [selectedProject, setSelectedProject] =
    useState<ResearchProject | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState<
    "all" | "active" | "completed" | "proposed" | "seeking-partners"
  >("all")
  const modalRef = useRef<HTMLDivElement>(null)

  // Filter projects based on search term and status filter
  const filteredProjects = researchProjects.filter((project) => {
    const matchesSearch =
      searchTerm === "" ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
      )

    const matchesFilter =
      activeFilter === "all" || project.status === activeFilter

    return matchesSearch && matchesFilter
  })

  // Handle project selection
  const handleProjectClick = (project: ResearchProject) => {
    setSelectedProject(project)
  }

  // Close modal
  const handleCloseModal = () => {
    setSelectedProject(null)
  }

  return (
    <section
      className="py-20 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950"
      id="research"
    >
      <div className="absolute inset-0 bg-[url(/research-pattern.svg)] opacity-5"></div>

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
            <Microscope
              size={16}
              className="mr-2 text-indigo-600 dark:text-indigo-400"
            />
            <span className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
              ACADEMIC PARTNERSHIPS
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">
            Research & Collaboration
          </h2>

          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ongoing studies and academic partnerships that document, analyze,
            and preserve the unique cultural heritage and traditional knowledge
            of Shirin Kamaris.
          </p>
        </motion.div>

        {/* Search and filters */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            {/* Search input */}
            <div className="relative w-full md:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BookOpenCheck className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search research projects..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status filters */}
            <div className="flex flex-wrap gap-2">
              {[
                "all",
                "active",
                "completed",
                "proposed",
                "seeking-partners",
              ].map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveFilter(status as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                    activeFilter === status
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {status === "all" ? "All Projects" : status.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Research Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const statusStyle = statusConfig[project.status].color

              return (
                <motion.div
                  key={project.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="relative h-48">
                    <Image
                      src={project.mainImage}
                      alt={project.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusStyle}`}
                        >
                          {statusConfig[project.status].label}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col">
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                      {project.summary}
                    </p>

                    <div className="mt-auto space-y-3">
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <User size={14} className="mr-1.5 flex-shrink-0" />
                        <span className="truncate">
                          Lead: {project.leadResearcher}
                        </span>
                      </div>

                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Building2 size={14} className="mr-1.5 flex-shrink-0" />
                        <span className="truncate">{project.institution}</span>
                      </div>

                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <CalendarDays
                          size={14}
                          className="mr-1.5 flex-shrink-0"
                        />
                        <span>Timeline: {project.timeline}</span>
                      </div>

                      <button className="w-full mt-4 py-2.5 px-4 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-lg font-medium text-sm flex items-center justify-center transition-colors">
                        Project Details{" "}
                        <ArrowUpRight size={14} className="ml-1.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <BookOpenCheck
              size={48}
              className="mx-auto text-gray-300 dark:text-gray-600 mb-4"
            />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Try adjusting your search or filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("")
                setActiveFilter("all")
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Collaboration CTA */}
        <motion.div
          className="mt-16 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl p-8 text-center shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-800/50 rounded-full mb-4">
            <GraduationCap
              size={24}
              className="text-indigo-600 dark:text-indigo-400"
            />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Interested in Conducting Research?
          </h3>

          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            We welcome researchers, universities, and cultural organizations
            interested in studying and documenting the unique heritage of Shirin
            Kamaris. Our community values ethical, collaborative approaches that
            respect local knowledge.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm font-medium transition-colors">
              Submit Research Proposal
            </button>
            <button className="px-6 py-3 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700 rounded-lg shadow-sm font-medium hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors">
              Research Ethics Guidelines
            </button>
          </div>
        </motion.div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
              onClick={handleCloseModal}
            >
              <motion.div
                ref={modalRef}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-64 sm:h-72">
                  <Image
                    src={selectedProject.mainImage}
                    alt={selectedProject.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                  <button
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                  >
                    <FileSymlink size={20} className="rotate-180" />
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 border ${
                        statusConfig[selectedProject.status].color
                      }`}
                    >
                      {statusConfig[selectedProject.status].label}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <div className="prose prose-indigo dark:prose-invert max-w-none">
                        <p className="lead text-lg text-gray-600 dark:text-gray-300 font-medium mb-4">
                          {selectedProject.summary}
                        </p>

                        <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                          {selectedProject.description}
                        </p>

                        {selectedProject.publications &&
                          selectedProject.publications.length > 0 && (
                            <>
                              <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
                                <Library
                                  size={18}
                                  className="mr-2 text-indigo-500 dark:text-indigo-400"
                                />
                                Related Publications
                              </h3>

                              <div className="space-y-3">
                                {selectedProject.publications.map((pub) => (
                                  <div
                                    key={pub.id}
                                    className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                                  >
                                    <h4 className="font-medium text-gray-900 dark:text-white">
                                      {pub.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      {pub.authors.join(", ")} ({pub.year})
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      {pub.journal}
                                    </p>
                                    <div className="mt-2 flex items-center gap-3">
                                      <a
                                        href={pub.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                                      >
                                        <ExternalLink
                                          size={12}
                                          className="mr-1"
                                        />{" "}
                                        Read Paper
                                      </a>
                                      {pub.doi && (
                                        <a
                                          href={`https://doi.org/${pub.doi}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                                        >
                                          <FileText
                                            size={12}
                                            className="mr-1"
                                          />{" "}
                                          DOI: {pub.doi}
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                      </div>
                    </div>

                    <div>
                      <div className="bg-gray-50 dark:bg-gray-800/30 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                          Project Details
                        </h3>

                        <div className="space-y-4">
                          <div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                              Lead Researcher
                            </div>
                            <div className="flex items-center">
                              <User
                                size={16}
                                className="mr-2 text-indigo-500 dark:text-indigo-400"
                              />
                              <span className="text-gray-900 dark:text-white">
                                {selectedProject.leadResearcher}
                              </span>
                            </div>
                          </div>

                          <div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                              Institution
                            </div>
                            <div className="flex items-center">
                              <Building2
                                size={16}
                                className="mr-2 text-indigo-500 dark:text-indigo-400"
                              />
                              <span className="text-gray-900 dark:text-white">
                                {selectedProject.institution}
                              </span>
                            </div>
                          </div>

                          <div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                              Timeline
                            </div>
                            <div className="flex items-center">
                              <CalendarDays
                                size={16}
                                className="mr-2 text-indigo-500 dark:text-indigo-400"
                              />
                              <span className="text-gray-900 dark:text-white">
                                {selectedProject.timeline}
                              </span>
                            </div>
                          </div>

                          <div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                              Location
                            </div>
                            <div className="flex items-center">
                              <MapPin
                                size={16}
                                className="mr-2 text-indigo-500 dark:text-indigo-400"
                              />
                              <span className="text-gray-900 dark:text-white">
                                {selectedProject.location}
                              </span>
                            </div>
                          </div>

                          <div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                              Collaborators
                            </div>
                            <div className="flex items-start">
                              <Users
                                size={16}
                                className="mr-2 text-indigo-500 dark:text-indigo-400 mt-1 flex-shrink-0"
                              />
                              <ul className="list-disc ml-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                {selectedProject.collaborators.map(
                                  (collab, index) => (
                                    <li key={index}>{collab}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>

                          <div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                              Keywords
                            </div>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {selectedProject.keywords.map(
                                (keyword, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 rounded-lg text-xs"
                                  >
                                    {keyword}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5">
                        <button className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center">
                          <Link2 size={16} className="mr-2" />
                          Contact Research Team
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
