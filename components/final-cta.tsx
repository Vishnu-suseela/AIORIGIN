'use client'

import { Phone, ArrowUpRight } from 'lucide-react'
import { Reveal } from './reveal'

const BAR_HEIGHTS = [10, 22, 34, 26, 42, 18, 30, 14, 38, 24, 32, 12, 36, 20, 28]

export function FinalCta() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-border">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklab,var(--primary)_10%,transparent)_0%,transparent_65%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 py-28 text-center lg:py-36">
        <Reveal>
          <div className="mb-8 flex items-end justify-center gap-1.5" aria-hidden="true">
            {BAR_HEIGHTS.map((h, i) => (
              <span
                key={i}
                className="voice-bar w-1 rounded-full bg-primary/70"
                style={{ height: `${h}px`, animationDelay: `${i * 0.09}s` }}
              />
            ))}
          </div>
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            The next call your business misses{' '}
            <span className="font-serif italic text-primary">could have been ours to answer.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            Book a 20-minute demo. You will talk to a live agent trained on a business
            like yours — then decide.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#booking"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              <Phone className="size-4" />
              Book a Demo Call
            </a>
            <a
              href="#booking"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card/70 px-8 text-sm font-medium transition-colors hover:bg-secondary"
            >
              hello@aiorigin.com
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row lg:px-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
            <span className="flex items-end gap-[2px]" aria-hidden="true">
              <span className="h-1.5 w-[2px] rounded-full bg-primary-foreground" />
              <span className="h-3 w-[2px] rounded-full bg-primary-foreground" />
              <span className="h-2 w-[2px] rounded-full bg-primary-foreground" />
            </span>
          </span>
          <span className="font-semibold tracking-tight">AI Origin</span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Footer">
          <a href="#voice-agents" className="text-sm text-muted-foreground hover:text-foreground">
            Voice Agents
          </a>
          <a href="#stories" className="text-sm text-muted-foreground hover:text-foreground">
            Client Stories
          </a>
          <a href="#websites" className="text-sm text-muted-foreground hover:text-foreground">
            Websites
          </a>
          <a href="#booking" className="text-sm text-muted-foreground hover:text-foreground">
            Contact
          </a>
        </nav>
        <p className="text-sm text-muted-foreground">
          {new Date().getFullYear()} AI Origin. Every call answered.
        </p>
      </div>
    </footer>
  )
}
