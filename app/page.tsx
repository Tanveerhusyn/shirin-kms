import { createClient } from "@/utills/supabase/server"

import VillageMapExperience from "@/components/digital-twin/VillageMapExperience"
import LocalLifePreview from "@/components/local-life/LocalLifePreview"
import LocalLifeShowcase from "@/components/local-life/LocalLifeShowcase"
import MediaHubPreview from "@/components/media-hub/MediaHubPreview"
import SeasonalArchive from "@/components/seasonal/SeasonalArchive"
import TimelineExperience from "@/components/timeline/TimelineExperience"

export default async function IndexPage() {
  const supabase = createClient()
  const { data, error } = await supabase.from("heritage_data").select("*")
  if (error) {
    console.error("Error fetching heritage data:", error)
  }

  return (
    <section className="w-full h-full">
      <TimelineExperience heritageData={data} />
      <VillageMapExperience />
      <LocalLifeShowcase />
      <SeasonalArchive />
      <LocalLifePreview />
      <MediaHubPreview />
      {/* <HeritageHub /> */}
    </section>
  )
}
