'use client'

import {
  PhoneIncoming,
  PhoneOutgoing,
  Repeat2,
  CalendarCheck2,
  MessagesSquare,
  Languages,
  BellRing,
  Megaphone,
  UserCheck,
  ArrowLeftRight,
  BrainCircuit,
  ClipboardList,
} from 'lucide-react'
import { Reveal } from './reveal'

const AGENTS = [
  {
    id: 'inbound',
    icon: PhoneIncoming,
    kicker: 'Inbound',
    title: 'Answer every call that comes in',
    text: 'Your front desk, on the phone, around the clock. The agent greets callers naturally, answers questions about services and pricing, and books directly into your calendar — even at 2 a.m.',
    image: '/images/inbound-phone.png',
    imageAlt: 'A sculptural cream phone with warm orange details and radiating sound waves',
    features: [
      { icon: CalendarCheck2, label: 'Appointment booking straight into your calendar' },
      { icon: MessagesSquare, label: 'Answers FAQs on services, pricing and hours' },
      { icon: Languages, label: 'Switches languages mid-call to match the caller' },
    ],
  },
  {
    id: 'outbound',
    icon: PhoneOutgoing,
    kicker: 'Outbound',
    title: 'Follow up before your competitor does',
    text: 'The agent calls new leads within 60 seconds of a form fill, confirms tomorrow\u2019s appointments, chases no-shows and reactivates old customers — without your team dialing a single number.',
    image: '/images/outbound-elemental.png',
    imageAlt: 'A sculptural black telephone receiver sending warm orange signal rings outward',
    features: [
      { icon: BellRing, label: 'Instant lead follow-up in under 60 seconds' },
      { icon: Megaphone, label: 'Appointment reminders that cut no-shows' },
      { icon: UserCheck, label: 'Win-back calls to lapsed customers' },
    ],
  },
  {
    id: 'blended',
    icon: Repeat2,
    kicker: 'Blended',
    title: 'One agent, both directions',
    text: 'The full system. Inbound and outbound working from the same brain — it answers a missed-call in seconds, follows up on the lead it just took, and hands complex calls to your team with a live summary.',
    image: '/images/agent-blended-pro.png',
    imageAlt: 'A service team coordinating calls and field schedules together',
    features: [
      { icon: ArrowLeftRight, label: 'Seamless handoff between AI and your staff' },
      { icon: BrainCircuit, label: 'Shared memory across every conversation' },
      { icon: ClipboardList, label: 'Call summaries and transcripts in your CRM' },
    ],
  },
]

export function VoiceAgents() {
  return (
    <section id="voice-agents" className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">What we build</p>
        <h2 className="mt-4 max-w-2xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          Voice agents built for{' '}
          <span className="font-serif italic text-primary">how your phone actually rings.</span>
        </h2>
        <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Three ways to deploy — pick the one that matches where your revenue leaks.
          Every agent is trained on your real services, prices and policies.
        </p>
      </Reveal>

      <div className="mt-16 flex flex-col gap-20 lg:gap-28">
        {AGENTS.map((agent, i) => (
          <Reveal key={agent.id} delay={0.1}>
            <article
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              {agent.id === 'blended' ? (
                <div className="agent-orbit relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-border bg-card" aria-label="Animated call orchestration system">
                  <div className="orbit-ring orbit-ring-lg" aria-hidden="true" />
                  <div className="orbit-ring orbit-ring-sm" aria-hidden="true" />
                  <span className="agent-core"><BrainCircuit className="size-8" /></span>
                  <span className="orbit-node orbit-node-a"><PhoneIncoming className="size-5" /></span>
                  <span className="orbit-node orbit-node-b"><PhoneOutgoing className="size-5" /></span>
                  <span className="orbit-node orbit-node-c"><ClipboardList className="size-5" /></span>
                  <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between border-t border-border pt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <span>Receive</span><span className="text-primary">Orchestrate</span><span>Follow up</span>
                  </div>
                </div>
              ) : (
                <div className="group overflow-hidden rounded-2xl border border-border bg-card">
                  <img
                    src={agent.image}
                    alt={agent.imageAlt}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              )}

              <div className="flex flex-col gap-5">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  <agent.icon className="size-4" />
                  {agent.kicker}
                </span>
                <h3 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                  {agent.title}
                </h3>
                <p className="text-pretty leading-relaxed text-muted-foreground">{agent.text}</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {agent.features.map((f) => (
                    <li key={f.label} className="group flex items-start gap-3.5 rounded-xl border border-primary/15 bg-primary/8 p-3.5 transition-all duration-300 hover:border-primary/25 hover:bg-primary/12 hover:shadow-md">
                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/25 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/35">
                        <f.icon className="size-4.5 text-primary" />
                      </span>
                      <span className="text-sm font-medium leading-relaxed text-foreground">{f.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
