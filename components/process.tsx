'use client'

import { Reveal } from './reveal'

const STEPS = [
  {
    number: '01',
    title: 'Discovery Call',
    text: 'We map how calls flow through your business today — what gets asked, what gets missed, and where revenue leaks.',
  },
  {
    number: '02',
    title: 'Voice & Script Design',
    text: 'We craft your agent\u2019s voice, personality and conversation flows, trained on your real services, prices and policies.',
  },
  {
    number: '03',
    title: 'Build & Integrate',
    text: 'The agent is wired into your phone number, calendar, WhatsApp and CRM. You hear test calls before anything goes live.',
  },
  {
    number: '04',
    title: 'Launch & Optimize',
    text: 'Go live in days, not months. We review call recordings weekly and keep sharpening the agent as your business evolves.',
  },
]

export function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">How it works</p>
        <h2 className="mt-4 max-w-2xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          From first call to{' '}
          <span className="font-serif italic text-primary">live agent in days.</span>
        </h2>
      </Reveal>

      <ol className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <Reveal key={step.number} delay={i * 0.12}>
            <li className="group relative flex h-full flex-col gap-4 rounded-xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/40">
              <span className="font-serif text-4xl italic text-primary/40 transition-colors group-hover:text-primary/70">
                {step.number}
              </span>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
