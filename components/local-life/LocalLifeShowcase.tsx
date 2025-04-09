"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Tab } from "@headlessui/react"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { AnimatePresence, motion } from "framer-motion"

// Local life showcase categories
const SHOWCASE_CATEGORIES = [
  {
    id: "daily-life",
    name: "Daily Life",
    icon: "/icons/daily-life-icon.svg",
    description: "Experience the routines and rhythms of Kamaris residents",
    items: [
      {
        title: "Morning Routines",
        description:
          "The day begins early in Kamaris, often before sunrise. Residents wake to prepare breakfast, tend to livestock and begin daily chores.",
        imageUrl: "/images/local-life/morning-routines.jpg",
        story:
          "Haji Ali, a 68-year-old resident, rises at 4:30 AM every day to tend his apricot orchard before the day's heat begins. 'The connection to the land keeps me young,' he says, showing hands weathered by decades of cultivation.\n\nThe morning routine in Kamaris begins with prayer, followed by preparing a simple breakfast of freshly baked bread, local honey, and green tea. After food, each family member has specific duties—younger children collect water from the communal spring, while adults tend to the livestock and fields.\n\nDuring summer months, much of the heavy work is completed before midday heat, with afternoons reserved for craft work and food preparation. Winter routines shift toward indoor activities with more time spent on textile work and preparation for the spring planting season.\n\n'Our daily schedule follows the sun and seasons, not the clock,' explains Haji Ali. 'This is how we have lived for generations, and the rhythm connects us to our ancestors.'",
      },
      {
        title: "Farming & Harvesting",
        description:
          "Agriculture remains central to Kamaris life, with seasonal patterns dictating community activities.",
        imageUrl: "/images/local-life/farming.jpg",
        story:
          "During the summer harvest, the entire community participates in collecting apricots, mulberries, and walnuts—crops that sustain families through winter and serve as valuable trade goods.\n\nKamaris agriculture follows a sophisticated polyculture system where different crops grow together in complementary arrangements. Wheat and barley fields are bordered by fruit trees, with vegetable patches interspersed throughout. This approach maximizes the limited arable land available in the mountain terrain.\n\nFarming implements remain largely traditional, with wooden plows still used in some fields too steep for modern equipment. The community maintains seed stocks of heirloom varieties uniquely adapted to the high-altitude environment, including specially adapted wheat that matures quickly during the short growing season.\n\n'We're continuing agricultural methods refined over 700 years in these mountains,' says Bibi Sakina, who oversees the community seed bank. 'Modern farming has much to learn from our sustainable practices.'",
      },
      {
        title: "Community Gatherings",
        description:
          "Evenings in Kamaris often involve community gatherings where news is shared and decisions are made collectively.",
        imageUrl: "/images/local-life/community-gathering.jpg",
        story:
          "The village council meets weekly in the central courtyard. 'We've maintained this tradition for centuries,' explains village elder Bibi Noor. 'Important decisions are never made by individuals alone.'\n\nThe gathering space, known locally as 'jamatkhana,' serves multiple functions—from ceremonial events to practical governance. Elders sit in a circle while community members gather around them, with specific protocols determining speaking order and decision-making processes.\n\nYounger community members participate by listening and serving tea, gradually learning the governance traditions. While men historically dominated these forums, women now participate equally in discussions, especially on matters related to education, cultural preservation, and community welfare.\n\nBeyond governance, these gatherings fulfill important social functions, where celebrations are planned, disputes resolved, and knowledge is transmitted through storytelling. 'In the age of mobile phones, maintaining these face-to-face traditions keeps our community strong,' says Bibi Noor.",
      },
    ],
  },
  {
    id: "traditional-practices",
    name: "Traditional Practices",
    icon: "/icons/traditional-practices-icon.svg",
    description:
      "Ancient knowledge and sustainable techniques passed through generations",
    items: [
      {
        title: "Water Management",
        description:
          "Ingenious irrigation systems have sustained Kamaris agriculture for centuries in this mountainous region.",
        imageUrl: "/images/local-life/water-management.jpg",
        story:
          "The water channels of Kamaris, called 'kuhls,' distribute glacier meltwater to fields using a community-managed rotation system that has remained largely unchanged for 600 years.\n\nWater from nearby glaciers is carefully directed through a network of primary and secondary channels constructed of stone and compacted earth. Small diversion gates made of slate control flow into individual fields. A water manager, selected annually by the community, oversees the system and resolves disputes.\n\nEach family receives water rights proportional to their landholdings, but with special allocations made during drought periods to ensure even the smallest plots receive sufficient irrigation. The entire system operates without pumps or modern technology, relying instead on gravity and precisely calculated gradients.\n\n'Our ancestors were brilliant hydrological engineers,' explains Mohammed, the current water manager. 'Modern engineers who visit are amazed at the efficiency of a system designed centuries ago.'",
      },
      {
        title: "Stone Masonry",
        description:
          "Traditional building techniques create homes that withstand harsh mountain conditions without modern heating.",
        imageUrl: "/images/local-life/stone-masonry.jpg",
        story:
          "Master mason Karim demonstrates wall construction using locally quarried stone and a special mortar mixture of clay, straw, and apricot oil that provides natural insulation.\n\nBuildings in Kamaris follow architectural principles refined over centuries to cope with extreme seasonal temperatures, occasional earthquakes, and limited resources. Walls are constructed in a 'sandwich' technique—two parallel stone walls with an internal layer of rubble and insulating material.\n\nRoof construction is particularly sophisticated, with multiple layers of timber, brushwood, clay, and flat stones creating a structure that sheds snow while retaining heat. In summer, these same roofs become living spaces where families sleep and socialize in the cooler evening air.\n\n'Modern buildings in the region need constant heating and cooling,' Karim notes, 'while our traditional homes maintain comfortable temperatures year-round with minimal fuel consumption, perfect for these mountains where resources must be used wisely.'",
      },
      {
        title: "Textile Production",
        description:
          "Wool processing and weaving remain important domestic crafts, especially during winter months.",
        imageUrl: "/images/local-life/textile.jpg",
        story:
          "Fatima has been weaving traditional carpets for over 50 years. 'Each pattern tells a story of our mountains, our history, and our family connections,' she explains while working her loom.\n\nThe textile tradition begins with the spring sheep shearing, followed by washing and carding of the wool. Young girls learn spinning techniques starting around age seven, using drop spindles that allow them to work while walking or tending other chores.\n\nDyes come primarily from local plants—walnut husks for browns, madder root for reds, and various lichens and minerals for other hues. The dye recipes are closely guarded family knowledge, passed from mother to daughter. The community is particularly known for a distinctive indigo blue achieved through a complex fermentation process.\n\nThe most valued textiles are wedding shawls, which take months to complete and feature patterns specific to the bride's family history. 'In our culture, a woman's weaving skill was traditionally more important than her appearance in determining her marriage prospects,' Fatima says with a smile.",
      },
    ],
  },
  {
    id: "cuisine",
    name: "Local Cuisine",
    icon: "/icons/cuisine-icon.svg",
    description:
      "Culinary traditions that reflect the region's resources and heritage",
    items: [
      {
        title: "Harissa",
        description:
          "A hearty slow-cooked wheat and meat stew that sustains mountain people through cold winter days.",
        imageUrl: "/images/local-life/harissa.jpg",
        story:
          "Preparation of Harissa often begins before dawn. 'You cannot rush good Harissa,' says Sakina, stirring a large pot. 'The secret is in how slowly the wheat and meat break down together.'\n\nThis ancient dish combines whole wheat berries with lamb or goat meat, simmered for hours until it forms a thick, porridge-like consistency. Traditionally cooked in a copper pot over a low flame, authentic Harissa requires occasional stirring with a wooden paddle specifically carved for this purpose.\n\nThe dish is seasoned simply with salt, black pepper, and sometimes wild mountain herbs. Once served, each person customizes their bowl with toppings of clarified butter, fried onions, or dried mulberries according to personal preference.\n\nOriginally developed as a practical way to extend limited meat supplies while providing substantial nutrition for physical labor, Harissa is now primarily prepared for special occasions and during the coldest winter months. 'A bowl of properly made Harissa will sustain a person through a full day of work even in bitter cold,' Sakina explains.",
      },
      {
        title: "Chapshuro",
        description:
          "Flatbread filled with minced meat and herbs, cooked on a traditional stone hearth.",
        imageUrl: "/images/local-life/chapshuro.jpg",
        story:
          "Chapshuro is an ancient dish dating back centuries, traditionally prepared for shepherds who needed portable, nourishing food during long days in high pastures.\n\nThe dough, made from locally grown wheat flour, is kneaded to a specific elasticity, then filled with a mixture of minced meat (typically goat or yak), wild leeks, and mountain herbs. The filled dough is flattened and cooked on a hot stone slab called a 'tawo' that gives the bread its distinctive partial char.\n\nEach family has their own variation of the filling, with some incorporating foraged greens or preserved vegetables during winter months. The dish showcases the practical ingenuity of mountain cuisine—creating balanced, portable nutrition that remains delicious whether eaten hot or cold hours later.\n\n'Modern visitors often compare it to pizza or savory pastries,' says Hussain, who prepares Chapshuro for community celebrations, 'but our version has been refined specifically for high-altitude nutrition and energy needs.'",
      },
      {
        title: "Tumuru Tea",
        description:
          "A unique spiced tea made with local herbs and berries that grows wild on mountain slopes.",
        imageUrl: "/images/local-life/tumuru-tea.jpg",
        story:
          "This distinctive tea, made from the berries of the Tumuru plant, is believed to help acclimate to high altitudes and is offered to every visitor as a welcome gesture.\n\nTumuru berries grow wild on south-facing mountain slopes between 2,000-3,000 meters elevation. They're harvested in late summer and carefully dried to preserve their distinctive peppery-citrus flavor and medicinal properties. The dried berries are crushed and combined with green tea leaves, cardamom pods, and sometimes ginger.\n\nThe preparation is ritualistic—water must be brought just to the boiling point before steeping, never boiled violently. The tea is served with a small amount of honey or dried mulberry syrup, never with milk which is believed to diminish its beneficial properties.\n\n'My grandmother taught me that Tumuru tea strengthens the heart and clears the mind,' says Fatima, who collects the wild berries each season. 'Modern researchers have now confirmed what we've known for generations—that it improves circulation and oxygen efficiency at high altitudes.'",
      },
    ],
  },
  {
    id: "language-culture",
    name: "Language & Culture",
    icon: "/icons/culture-icon.svg",
    description:
      "The rich linguistic heritage and cultural expressions of Kamaris",
    items: [
      {
        title: "Brushaski Language",
        description:
          "One of the world's language isolates with no known relation to any other language family.",
        imageUrl: "/images/local-life/language.jpg",
        story:
          "Elder Abdullah, one of the few remaining fluent speakers of ancient Brushaski dialects, works with linguists to document words that describe glacial features not captured in any other language.\n\nBrushaski is classified as a language isolate, meaning it has no proven relationship to any other known language. The Kamaris dialect contains particularly archaic features that have been lost in more widely spoken variants, including a complex system of verbs that encode spatial relationships with extraordinary precision.\n\nThe language includes over forty terms for different types of glacial features, snow conditions, and mountain terrain—reflecting the community's deep relationship with their high-altitude environment. It also contains unique grammatical structures that linguists believe may preserve elements of ancient communication systems dating back millennia.\n\n'When a language like ours disappears, humanity doesn't just lose words—it loses entire ways of perceiving and categorizing the world,' Abdullah explains. 'Our efforts to preserve Brushaski are not just about cultural pride but about maintaining this unique lens for understanding our environment.'",
      },
      {
        title: "Music & Dance",
        description:
          "Traditional instruments and dance forms mark celebrations and seasonal transitions.",
        imageUrl: "/images/local-life/music-dance.jpg",
        story:
          "The distinctive drumming and flute patterns of Kamaris music are believed to have changed little in 500 years, preserving ancient rhythms connected to agricultural cycles.\n\nTraditional Kamaris music centers around the 'daff' (frame drum), 'surnai' (double-reed wind instrument), and 'ghazak' (bowed string instrument). Musicians train from childhood, with certain families maintaining custodianship of specific musical traditions through generations.\n\nThe most sacred music occurs during the Ginani harvest festival, where specific melodies are believed to ensure agricultural prosperity for the coming year. These compositions follow mathematical patterns that align with astronomical cycles and are never performed outside their ritual context.\n\nDance traditions include both gender-segregated and mixed forms, with the 'Chukutz' sword dance performed by men depicting historical battles, while the 'Nimasko' harvest dance involves intricate footwork representing the sowing and reaping cycle. 'Our dances record our history and relationship with the land,' explains Ali, a community music teacher. 'Every movement has meaning beyond mere entertainment.'",
      },
      {
        title: "Festivals & Celebrations",
        description:
          "Seasonal festivals mark transitions and bring communities together for feasting and ritual.",
        imageUrl: "/images/local-life/festival.jpg",
        story:
          "During Ginani Festival, celebrating the start of the wheat harvest, every household contributes bread made from the previous year's last grain stores—symbolizing continuity and abundance.\n\nThe festival calendar of Kamaris follows agricultural and astronomical cycles rather than fixed dates. Major celebrations include Nouroz (spring equinox), Ginani (harvest beginning), and Chamos (winter solstice), each with specific rituals, foods, and cultural performances.\n\nFestival preparations involve the entire community—women prepare special foods, men arrange ceremonial spaces, and children gather specific flowers, stones, or branches needed for rituals. Many celebrations include the recitation of ancient texts and poems that have been preserved through oral tradition.\n\nA distinctive feature of Kamaris festivals is the temporary suspension of regular social hierarchies, with ceremonial roles often inverting everyday power structures. 'During Chamos, children become the decision-makers for a day, while at Ginani, the youngest adults serve the elders,' explains cultural historian Nazia. 'These traditions reinforce our values of community balance and mutual respect.'",
      },
    ],
  },
]

export default function LocalLifeShowcase() {
  // State for tracking the selected item
  const [selectedItem, setSelectedItem] = useState<{
    categoryId: string
    itemIndex: number
  } | null>(null)

  // Function to handle item selection
  const handleSelectItem = (categoryId: string, itemIndex: number) => {
    setSelectedItem({
      categoryId,
      itemIndex,
    })
  }

  // Function to close item detail view
  const handleCloseDetail = () => {
    setSelectedItem(null)
  }

  // Get currently selected item data if any
  const selectedItemData = selectedItem
    ? SHOWCASE_CATEGORIES.find((cat) => cat.id === selectedItem.categoryId)
        ?.items[selectedItem.itemIndex]
    : null

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium text-emerald-600 tracking-wide uppercase flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            DISCOVER LOCAL CULTURE
          </h2>
          <h3 className="mt-3 text-3xl font-bold text-gray-900">
            Local Life in Kamaris
          </h3>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Nestled in the Gojal region of Upper Hunza, Kamaris preserves
            authentic cultural traditions and daily practices that connect
            residents to their ancestors and environment.
          </p>
        </div>

        <Tab.Group>
          <div className="border-b border-gray-200">
            <Tab.List className="-mb-px flex space-x-8 overflow-x-auto scrollbar-hide">
              {SHOWCASE_CATEGORIES.map((category) => (
                <Tab
                  key={category.id}
                  className={({ selected }: { selected: boolean }) =>
                    `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md ${
                      selected
                        ? "border-emerald-500 text-emerald-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-2 w-5 h-5 flex-shrink-0">
                      <img src={category.icon} alt="" className="w-5 h-5" />
                    </span>
                    {category.name}
                  </div>
                </Tab>
              ))}
            </Tab.List>
          </div>

          <Tab.Panels className="mt-8">
            {SHOWCASE_CATEGORIES.map((category) => (
              <Tab.Panel key={category.id}>
                <div className="mb-6">
                  <p className="text-gray-600 max-w-3xl">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
                  {category.items.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                      }}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
                    >
                      <div className="h-48 relative">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {item.description}
                        </p>
                        <button
                          onClick={() => handleSelectItem(category.id, index)}
                          className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 group"
                        >
                          Read the story
                          <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>

        {/* Story Detail Modal */}
        <AnimatePresence>
          {selectedItem && selectedItemData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={handleCloseDetail}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl max-w-3xl w-full overflow-hidden relative max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleCloseDetail}
                  className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="relative h-72 sm:h-80">
                  <Image
                    src={selectedItemData.imageUrl}
                    alt={selectedItemData.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {selectedItemData.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 overflow-y-auto max-h-[60vh]">
                  <p className="text-gray-700 mb-6 text-base leading-relaxed">
                    {selectedItemData.description}
                  </p>

                  <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
                    <h4 className="text-sm font-medium text-emerald-800 mb-3 uppercase tracking-wide">
                      Local Story
                    </h4>
                    {selectedItemData.story
                      .split("\n\n")
                      .map((paragraph, i) => (
                        <p key={i} className="text-gray-700 mb-4 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
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
