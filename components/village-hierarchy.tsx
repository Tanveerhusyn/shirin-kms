import React, { useState } from "react"
import {
  Building,
  ChevronDown,
  ChevronRight,
  Droplet,
  GraduationCap,
  Heart,
  Home,
  Leaf,
  PiggyBank,
  School,
  Users,
} from "lucide-react"

const IconComponent = ({ iconName, className }) => {
  const IconMap = {
    Home,
    Users,
    Droplet,
    Heart,
    Building,
    GraduationCap,
    PiggyBank,
    Leaf,
    School,
  }
  const Icon = IconMap[iconName]
  return Icon ? <Icon className={className} /> : null
}

const TreeNode = ({ node, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(true)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div style={{ marginLeft: `${level * 20}px` }} className="mb-2">
      <div
        className="flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 bg-white bg-opacity-80 hover:bg-opacity-100 hover:shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {hasChildren && (
          <span className="mr-2">
            {isOpen ? (
              <ChevronDown className="h-5 w-5 text-green-700" />
            ) : (
              <ChevronRight className="h-5 w-5 text-green-700" />
            )}
          </span>
        )}
        <IconComponent
          iconName={node.icon}
          className="h-6 w-6 mr-3 text-green-700"
        />
        <span className="text-green-800 font-semibold">{node.name}</span>
      </div>
      {isOpen && hasChildren && (
        <div className="mt-2 ml-4 pl-2 border-l-2 border-green-300">
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

const VillageHierarchy = () => {
  const villageStructure = {
    name: "Village Institutional Structure",
    icon: "Home",
    children: [
      {
        name: "Local Government",
        icon: "Building",
        children: [
          { name: "Village Council", icon: "Users" },
          { name: "Administrative Office", icon: "Building" },
        ],
      },
      {
        name: "Committees",
        icon: "Users",
        children: [
          { name: "Village Education Committee (VEC)", icon: "GraduationCap" },
          { name: "Water Management Committee", icon: "Droplet" },
          { name: "Health and Sanitation Committee", icon: "Heart" },
          { name: "Women's Empowerment Group", icon: "Users" },
        ],
      },
      {
        name: "Community Institutions",
        icon: "Building",
        children: [
          { name: "Community Health Center", icon: "Heart" },
          {
            name: "Educational Institutions",
            icon: "School",
            children: [
              { name: "Primary School", icon: "GraduationCap" },
              { name: "Secondary School", icon: "GraduationCap" },
            ],
          },
          { name: "Microfinance Cooperative", icon: "PiggyBank" },
          { name: "Agricultural Extension Services", icon: "Leaf" },
        ],
      },
    ],
  }

  return (
    <div
      className="mb-20 rounded-2xl shadow-xl p-8 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-4xl font-bold text-white mb-8 text-center text-shadow">
        Village Institutional Hierarchy
      </h2>
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-inner">
        <TreeNode node={villageStructure} />
      </div>
    </div>
  )
}

export default VillageHierarchy
