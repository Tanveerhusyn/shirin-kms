"use client"

import React from "react"
import Image from "next/image"

import { Timeline } from "../../components/ui/timeline"

export default function VillageTimelineDemo() {
  const AchievementItem = ({ title, bulletPoints }) => (
    <div className="mb-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <h4 className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-semibold mb-2">
        {title}
      </h4>
      <ul className="space-y-2">
        {bulletPoints.map((point, index) => (
          <li key={index} className="flex items-start">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
            <span className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )

  const villageEvents = [
    {
      title: "2023",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Our village celebrated its 300th anniversary with a grand festival,
            marking a milestone in our rich history. The event brought together
            residents, former inhabitants, and visitors from neighboring towns,
            showcasing our community's enduring spirit and progress over three
            centuries.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Image
              src="/HeroOne.jpg"
              alt="300th anniversary celebration"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <Image
              src="/main-1.JPG"
              alt="New community center inauguration"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
          <AchievementItem
            title="Community Center and Sustainability Initiatives"
            bulletPoints={[
              "Inaugurated a new community center, providing a hub for village activities",
              "Launched a village-wide recycling program, taking a step towards sustainability",
              "Week-long celebration featuring historical reenactments",
              "Unveiling of a commemorative monument in the village square",
              "Publication of a book detailing the village's 300-year history",
              "Establishment of an annual cultural festival to continue the legacy",
            ]}
          />
        </div>
      ),
    },
    {
      title: "2010",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            The dawn of a new decade brought significant infrastructure
            improvements to our village, enhancing the quality of life for all
            residents. These upgrades were part of a comprehensive development
            plan aimed at modernizing our community while preserving its rural
            charm.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Image
              src="/main-2.jpg"
              alt="New road construction"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <Image
              src="/main-3.jpg"
              alt="Solar panel installation"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
          <AchievementItem
            title="Infrastructure and Sustainable Development"
            bulletPoints={[
              "Paved all major roads, improving connectivity and transportation",
              "Installed solar panels, embracing clean energy for a sustainable future",
              "Completion of a new water treatment facility",
              "Expansion of the village's primary healthcare center",
              "Introduction of high-speed internet connectivity",
              "Creation of a new public park and recreational area",
            ]}
          />
        </div>
      ),
    },
    {
      title: "1950",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Our village saw significant modernization efforts in the post-war
            era. This period marked a turning point in our community's
            development, as we embraced new technologies and ideas while
            maintaining our traditional values and close-knit community spirit.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Image
              src="/main-4.jpg"
              alt="First telephone exchange"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <Image
              src="/main-6.JPG"
              alt="New school building"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
          <AchievementItem
            title="Post-War Modernization"
            bulletPoints={[
              "Established the first telephone exchange",
              "Built a new school to promote education",
              "Introduction of electricity to all households",
              "Construction of the village's first paved road",
              "Establishment of a local library and community center",
              "Formation of the village's first elected council",
            ]}
          />
        </div>
      ),
    },
    {
      title: "1930",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Our village was founded by a group of settlers, laying the
            foundation for our community. These pioneering families faced
            numerous challenges as they established our village in this fertile
            valley, but their determination and spirit of cooperation set the
            tone for generations to come.
          </p>
          <div className="mb-4">
            <Image
              src="/HeroOne.jpg"
              alt="Village founding monument"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
          <AchievementItem
            title="Village Foundation"
            bulletPoints={[
              "First families settled in the area",
              "Established the village's first communal farm",
              "Construction of the first permanent dwellings",
              "Digging of the village's central well",
              "Establishment of a small trading post",
              "First harvest celebration, which became an annual tradition",
            ]}
          />
        </div>
      ),
    },
  ]

  return (
    <div className="w-full max-w-8xl mx-auto">
      <Timeline data={villageEvents} />
    </div>
  )
}
