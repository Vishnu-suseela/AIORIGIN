'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Reveal } from './reveal'

const STATS = [
  { value: 100, suffix: '%', label: 'Calls answered, day and night' },
  { value: 12, suffix: 's', label: 'Average time to pick up' },
  { value: 3, suffix: 'x', label: 'More appointments booked' },
  { value: 60, suffix: '%', label: 'Lower cost than a second hire' },
]

const INDUSTRIES = [
  'Dental Clinics',
  'HVAC & Home Services',
  'Real Estate',
  'Hospitals',
  'Salons & Spas',
  'Law Firms',
  'Diagnostics Labs',
  'Coaching Institutes',
  'Restaurants',
  'Insurance',
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref} className="text-5xl font-semibold tracking-tight text-primary md:text-6xl">
      {display}
      {suffix}
    </span>
  )
}

export function Metrics() {
  return (
    <section id="metrics" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="flex flex-col gap-3">
                <Counter value={s.value} suffix={s.suffix} />
                <p className="text-sm leading-relaxed text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* industries marquee */}
      <div className="overflow-hidden border-t border-border/50 bg-gradient-to-r from-background via-primary/3 to-background py-8">
        <div className="animate-marquee flex w-max items-center gap-16">
          {[...INDUSTRIES, ...INDUSTRIES].map((name, i) => (
            <span
              key={i}
              className="flex items-center gap-16 whitespace-nowrap text-xs font-medium uppercase tracking-widest text-foreground/70 transition-colors duration-300 hover:text-primary"
            >
              {name}
              <span className="h-1.5 w-1.5 rounded-full bg-primary/50" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
