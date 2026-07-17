import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Metrics } from '@/components/metrics'
import { VoiceAgents } from '@/components/voice-agents'
import { VoiceShowcase } from '@/components/voice-showcase'
import { ClientStory } from '@/components/client-story'
import { Process } from '@/components/process'
import { Websites } from '@/components/websites'
import { Faq } from '@/components/faq'
import { FinalCta, SiteFooter } from '@/components/final-cta'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Metrics />
        <VoiceAgents />
        <VoiceShowcase />
        <ClientStory />
        <Process />
        <Websites />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
