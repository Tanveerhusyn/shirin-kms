import { cookies } from "next/headers"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRightIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import HistoryCard from "@/components/custom/history-cards"
import VillageReelsSection from "@/components/custom/social-feed"
import VillageCommittees from "@/components/custom/village-committees"
import VillageMap from "@/components/custom/village-map"
import VillageStats from "@/components/custom/village-stats"
import HeroSection from "@/components/hero-section"

import { createClient } from "../utills/supabase/server"

export default async function IndexPage() {
  const supabase = createClient()
  console.log(supabase)
  const { data, error } = await supabase.from("landing_data").select("*")
  if (error) {
    console.error("Error fetching landing data:", error)
  } else {
    console.log("landing data", data)
  }

  return (
    <section className="w-full">
      <HeroSection data={data} />
      {/* <ShirinKamarisSection data={data} /> */}

      <VillageStats />
      <HistoryCard />
      <VillageCommittees />
      <VillageMap />
      <VillageReelsSection />
    </section>
  )
}
