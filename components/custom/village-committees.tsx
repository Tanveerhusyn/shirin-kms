import React from "react"
import { Book, Home, Leaf, Lightbulb, ShieldCheck, Users } from "lucide-react"

const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

const CommitteeCard = ({ icon: Icon, name, description, members }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-full mr-4">
          <Icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {name}
        </h3>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((member, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-emerald-500 text-white font-bold text-lg">
              {getInitials(member.name)}
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {member.name}
              </p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const VECCommittees = () => {
  const committees = [
    {
      icon: Users,
      name: "Community Engagement",
      description:
        "Fostering community involvement and organizing local events to build a stronger, more connected village.",
      members: [
        { name: "Alice Johnson", role: "Chair" },
        { name: "Bob Smith", role: "Event Coordinator" },
        { name: "Carol Davis", role: "Volunteer Manager" },
      ],
    },
    {
      icon: Lightbulb,
      name: "Innovation & Technology",
      description:
        "Implementing smart village solutions and digital initiatives to enhance daily life and efficiency.",
      members: [
        { name: "David Lee", role: "Chair" },
        { name: "Emma Wilson", role: "IT Specialist" },
        { name: "Frank Brown", role: "Digital Strategist" },
      ],
    },
    {
      icon: Leaf,
      name: "Environmental Sustainability",
      description:
        "Promoting eco-friendly practices and green initiatives to preserve our natural surroundings for future generations.",
      members: [
        { name: "Grace Taylor", role: "Chair" },
        { name: "Henry Martinez", role: "Sustainability Expert" },
        { name: "Isla Robinson", role: "Green Projects Coordinator" },
      ],
    },
    {
      icon: Book,
      name: "Education & Culture",
      description:
        "Enhancing local education opportunities and preserving our rich cultural heritage through various programs.",
      members: [
        { name: "Jack Thompson", role: "Chair" },
        { name: "Kate Miller", role: "Education Liaison" },
        { name: "Liam Harris", role: "Cultural Programs Director" },
      ],
    },
    {
      icon: Home,
      name: "Infrastructure Development",
      description:
        "Overseeing village infrastructure projects and maintenance to ensure a safe and comfortable living environment.",
      members: [
        { name: "Mia Anderson", role: "Chair" },
        { name: "Noah Clark", role: "Project Manager" },
        { name: "Olivia White", role: "Urban Planner" },
      ],
    },
    {
      icon: ShieldCheck,
      name: "Safety & Welfare",
      description:
        "Ensuring village security and resident well-being through comprehensive safety measures and health initiatives.",
      members: [
        { name: "Peter Young", role: "Chair" },
        { name: "Quinn Evans", role: "Safety Officer" },
        { name: "Rachel Green", role: "Community Health Coordinator" },
      ],
    },
  ]

  return (
    <div className="flex flex-col gap-4 justify-center items-center px-4 py-16 bg-white">
      <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
        Village Executive Committees
      </h2>
      <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
        Meet the dedicated committees working to enhance our village life and
        create a better future for all residents.
      </p>

      <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {committees.map((committee, index) => (
          <CommitteeCard key={index} {...committee} />
        ))}
      </div>
    </div>
  )
}

export default VECCommittees
