'use client'

import { Globe, Gauge, Search, Smartphone, ArrowUpRight } from 'lucide-react'
import { Reveal } from './reveal'
import { openBookingFlow } from './booking-flow'

const POINTS = [
  {
    icon: Gauge,
    title: 'Built to convert',
    text: 'Every page is designed around one goal — turning visitors into booked calls for your voice agent to handle.',
  },
  {
    icon: Search,
    title: 'Found on Google',
    text: 'Clean structure, fast load times and local SEO so the people searching for your service actually find you.',
  },
  {
    icon: Smartphone,
    title: 'Flawless on mobile',
    text: 'Most of your customers are on a phone. Your site is designed mobile-first, then scaled up.',
  },
]

export function Websites() {
  return (
    <section id="websites" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary">
              <Globe className="size-4" />
              Also in the toolkit
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              Websites that feed{' '}
              <span className="font-serif italic text-primary">your phone line.</span>
            </h2>
            <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
              The voice agent answers the call — but the website is what makes it
              ring. We build clean, fast sites that work hand-in-hand with your
              agent, so every visitor has a way to reach you.
            </p>

            <ul className="mt-8 flex flex-col gap-5">
              {POINTS.map((p) => (
                <li key={p.title} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-secondary">
                    <p.icon className="size-4 text-primary" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={openBookingFlow}
              className="mt-8 inline-flex h-11 items-center gap-2 rounded-full border border-primary/50 px-6 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Ask about a website
              <ArrowUpRight className="size-4" />
            </button>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="animate-float-slow overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src="/images/websites-showcase-pro.png"
                alt="A laptop and phone displaying a refined service-business website"
                className="w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
