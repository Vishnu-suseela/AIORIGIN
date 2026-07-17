'use client'

import {
  Quote,
  TrendingUp,
  PhoneMissed,
  CalendarCheck2,
  IndianRupee,
  DollarSign,
  Truck,
  PhoneCall,
} from 'lucide-react'
import { Reveal } from './reveal'

type Outcome = {
  icon: typeof Quote
  before: string
  after: string
}

type Story = {
  id: string
  kicker: string
  headline: string
  headlineAccent: string
  quotes: string[]
  attribution: string
  image: string
  imageAlt: string
  outcomesLabel: string
  outcomes: Outcome[]
}

const STORIES: Story[] = [
  {
    id: 'dental',
    kicker: 'Client story — 01',
    headline: 'A dental clinic in Pune.',
    headlineAccent: '100 calls a day. One receptionist.',
    quotes: [
      '"We get 80\u2013100 calls a day \u2014 new patients wanting appointments, people asking about pricing for root canals and braces. My receptionist also handles walk-ins, payments and files. By lunchtime she\u2019s drowning.',
      '"I know we miss calls because patients tell me: \u2018I called three times, nobody picked up, so I went to the clinic next door.\u2019 I\u2019m paying \u20B91.5 lakh a month on Google Ads and Practo \u2014 and half of those leads call when the front desk is busy."',
    ],
    attribution: '— Practice owner, 3-doctor dental clinic, Pune',
    image: '/images/story-dental.png',
    imageAlt: 'A busy dental clinic reception desk with a ringing phone',
    outcomesLabel: 'What changed with a blended agent',
    outcomes: [
      { icon: PhoneMissed, before: '30\u201340 missed calls / day', after: '0 missed calls' },
      {
        icon: CalendarCheck2,
        before: 'Bookings only in clinic hours',
        after: '41% of bookings now after hours',
      },
      {
        icon: IndianRupee,
        before: 'Half of ad spend wasted',
        after: 'Every lead called in 60 seconds',
      },
      {
        icon: TrendingUp,
        before: 'Receptionist drowning by noon',
        after: 'Front desk focused on patients',
      },
    ],
  },
  {
    id: 'hvac',
    kicker: 'Client story — 02',
    headline: 'A 6-person HVAC shop.',
    headlineAccent: 'Three trucks. 40 missed calls a month.',
    quotes: [
      '"Every time my phone rings while I\u2019m crawling through an attic, I have to choose \u2014 answer and be rude to the customer in front of me, or let it go to voicemail and probably lose the job. Nobody leaves a voicemail anymore. They just call the next guy on Google.',
      '"I tried hiring a part-time receptionist twice \u2014 one quit after three weeks, the other couldn\u2019t explain a tune-up from a repair. Last summer I tracked it: 40+ missed calls in one month. At $500 average ticket, that\u2019s $20K I handed to my competitor. I don\u2019t need another app. I need something that picks up the phone, knows my business, and books the job."',
    ],
    attribution: '— Owner, 6-person HVAC company, 3 trucks on the road',
    image: '/images/story-hvac.png',
    imageAlt: 'An HVAC technician working in an attic while his phone rings',
    outcomesLabel: 'What changed with an inbound agent',
    outcomes: [
      { icon: PhoneMissed, before: '40+ missed calls / month', after: 'Every call answered in seconds' },
      {
        icon: DollarSign,
        before: '$20K/month handed to competitors',
        after: 'Jobs booked while he\u2019s in the attic',
      },
      {
        icon: PhoneCall,
        before: '$2,000/mo ad leads going to voicemail',
        after: 'Ad spend finally converting',
      },
      {
        icon: Truck,
        before: 'Techs interrupted on every job',
        after: 'Crew stays focused, calendar stays full',
      },
    ],
  },
]

function StoryBlock({ story, flip }: { story: Story; flip: boolean }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      {/* the story */}
      <Reveal delay={0.1} className={flip ? 'lg:order-2' : ''}>
        <figure className="relative">
          <Quote className="absolute -left-2 -top-4 size-10 text-primary/25" aria-hidden="true" />
          <blockquote className="flex flex-col gap-5 pl-6 text-lg leading-relaxed text-foreground/90">
            {story.quotes.map((q) => (
              <p key={q.slice(0, 32)}>{q}</p>
            ))}
          </blockquote>
          <figcaption className="mt-6 pl-6 text-sm text-muted-foreground">
            {story.attribution}
          </figcaption>

          <div className="mt-8 overflow-hidden rounded-xl border border-border">
            <img
              src={story.image || "/placeholder.svg"}
              alt={story.imageAlt}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </figure>
      </Reveal>

      {/* the fix */}
      <div className={`flex flex-col gap-4 ${flip ? 'lg:order-1' : ''}`}>
        <Reveal delay={0.15}>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {story.outcomesLabel}
          </p>
        </Reveal>
        {story.outcomes.map((o, i) => (
          <Reveal key={o.after} delay={0.2 + i * 0.08}>
            <div className="flex items-start gap-4 rounded-xl border border-border bg-card/60 p-5">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-secondary">
                <o.icon className="size-4 text-primary" />
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-muted-foreground line-through decoration-muted-foreground/50">
                  {o.before}
                </p>
                <p className="text-sm font-semibold text-primary">{o.after}</p>
              </div>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.55}>
          <a
            href="mailto:niteshdevarla@gmail.com?subject=AI%20Origin%20Demo%20Call"
            className="mt-2 inline-flex h-11 items-center justify-center rounded-full border border-primary/50 px-6 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            This sounds like my business
          </a>
        </Reveal>
      </div>
    </div>
  )
}

export function ClientStory() {
  return (
    <section id="stories" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-primary">
            The problem, in our clients&apos; own words
          </p>
          <h2 className="mt-4 max-w-2xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Real businesses.{' '}
            <span className="font-serif italic text-primary">Real missed revenue.</span>
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-24 lg:gap-32">
          {STORIES.map((story, i) => (
            <div key={story.id}>
              <Reveal>
                <p className="mb-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {story.kicker}
                </p>
                <h3 className="mb-10 max-w-2xl text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                  {story.headline}{' '}
                  <span className="font-serif italic text-primary">{story.headlineAccent}</span>
                </h3>
              </Reveal>
              <StoryBlock story={story} flip={i % 2 === 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
