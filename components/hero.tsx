'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Phone } from 'lucide-react'

const BAR_HEIGHTS = [14, 26, 40, 30, 48, 22, 38, 18, 44, 28, 36, 16, 42, 24, 32]

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pb-24 pt-32"
    >
      {/* backdrop artwork */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/hero-waveform.png"
          alt=""
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-primary" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          AI Voice Agent Agency
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
        >
          Your business misses calls.{' '}
          <span className="font-serif italic text-primary">Ours never do.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          We design and deploy AI voice agents that answer every call, book
          appointments, qualify leads and follow up — in your language, in your
          tone, 24 hours a day.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#booking"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            <Phone className="size-4" />
            Hear a Live Agent
          </a>
          <a
            href="#voice-agents"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card/70 px-7 text-sm font-medium backdrop-blur transition-colors hover:bg-secondary"
          >
            Explore Services
          </a>
        </motion.div>

        {/* live voice equalizer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-14 flex items-end gap-1.5"
          aria-hidden="true"
        >
          {BAR_HEIGHTS.map((h, i) => (
            <span
              key={i}
              className="voice-bar w-1 rounded-full bg-primary/80"
              style={{ height: `${h}px`, animationDelay: `${i * 0.09}s` }}
            />
          ))}
          <span className="ml-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Agent on call — live
          </span>
        </motion.div>
      </div>

      <motion.a
        href="#metrics"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground md:flex"
      >
        Scroll <ArrowDown className="size-3.5 animate-bounce" />
      </motion.a>
    </section>
  )
}
