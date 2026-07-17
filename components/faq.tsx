'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Reveal } from './reveal'

const FAQS = [
  {
    q: 'Will callers know they are talking to an AI?',
    a: 'The voice is natural and conversational, and we are transparent by design — the agent can introduce itself as your business\u2019s digital assistant. Most callers simply care that someone picked up instantly and solved their problem.',
  },
  {
    q: 'What happens with complex or emergency calls?',
    a: 'The agent is trained to recognise urgency and complexity. It transfers those calls to your team immediately, with a live summary of what the caller already said — so nobody repeats themselves.',
  },
  {
    q: 'Which languages do the agents speak?',
    a: 'English and Hindi out of the box, with regional languages like Marathi, Tamil, Telugu and Kannada available. Agents can switch languages mid-call to match the caller.',
  },
  {
    q: 'How long does it take to go live?',
    a: 'A typical inbound agent goes live within 7\u201314 days, including script design, integrations and your approval of test calls. Blended systems take slightly longer depending on CRM complexity.',
  },
  {
    q: 'Does it integrate with my existing tools?',
    a: 'Yes — Google Calendar, WhatsApp Business, common CRMs, payment links and most industry software. If you have something unusual, we build the connection.',
  },
  {
    q: 'What does it cost?',
    a: 'Considerably less than a second receptionist. Pricing depends on call volume and complexity, so we quote after a short discovery call — no obligation, and you hear a live demo first.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-base font-medium md:text-lg">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}>
          <Plus className="size-5 shrink-0 text-primary" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-8 leading-relaxed text-muted-foreground">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-primary">FAQ</p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Questions,{' '}
            <span className="font-serif italic text-primary">answered honestly.</span>
          </h2>
          <p className="mt-5 max-w-sm text-pretty leading-relaxed text-muted-foreground">
            Everything business owners ask us before putting an AI agent on their phone line.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col">
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
