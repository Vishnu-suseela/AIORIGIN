'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Volume2 } from 'lucide-react'
import { Reveal } from './reveal'

const DEMOS = [
  {
    title: 'Telugu',
    context: 'తెలుగు · Natural regional conversation',
    src: '/audio/telugu.wav',
  },
  {
    title: 'Hindi',
    context: 'हिन्दी · Clear, confident assistance',
    src: '/audio/hindi.wav',
  },
  {
    title: 'English',
    context: 'English · Polished customer experience',
    src: '/audio/english.wav',
  },
]

const WAVE = [38, 64, 44, 82, 55, 72, 34, 62, 88, 48, 76, 42, 68, 52, 84, 36, 58, 74, 46, 66, 40, 80, 50, 70]

function formatTime(value: number) {
  if (!Number.isFinite(value)) return '0:00'
  return `${Math.floor(value / 60)}:${Math.floor(value % 60).toString().padStart(2, '0')}`
}

export function VoiceShowcase() {
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([])
  const [active, setActive] = useState<number | null>(null)
  const [times, setTimes] = useState(DEMOS.map(() => ({ current: 0, duration: 0 })))

  useEffect(() => () => audioRefs.current.forEach((audio) => audio?.pause()), [])

  const toggle = async (index: number) => {
    const target = audioRefs.current[index]
    if (!target) return
    audioRefs.current.forEach((audio, i) => {
      if (i !== index) audio?.pause()
    })
    if (active === index && !target.paused) {
      target.pause()
      setActive(null)
    } else {
      await target.play()
      setActive(index)
    }
  }

  const updateTime = (index: number, current: number, duration: number) => {
    setTimes((values) => values.map((value, i) => (i === index ? { current, duration } : value)))
  }

  return (
    <section id="voice-demos" className="edge-light border-y border-border bg-card/50">
      <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-28">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary">Hear the difference</p>
              <h2 className="mt-4 max-w-2xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                Real voices. <span className="font-serif italic text-primary">Built for real conversations.</span>
              </h2>
            </div>
            <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
              Listen to how AI Origin handles language, pace and intent without sounding like a phone menu.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {DEMOS.map((demo, index) => {
            const playing = active === index
            const progress = times[index].duration ? (times[index].current / times[index].duration) * 100 : 0
            return (
              <Reveal key={demo.src} delay={index * 0.08}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-background p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary">
                      <Volume2 className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {formatTime(times[index].duration)}
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-semibold">{demo.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{demo.context}</p>

                  <div className="mt-7 flex h-14 items-center gap-1" aria-hidden="true">
                    {WAVE.map((height, bar) => (
                      <span
                        key={bar}
                        className={`w-full rounded-full transition-colors ${bar / WAVE.length <= progress / 100 ? 'bg-primary' : 'bg-border'} ${playing ? 'voice-bar' : ''}`}
                        style={{ height: `${height}%`, animationDelay: `${bar * 0.04}s` }}
                      />
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => void toggle(index)}
                      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2"
                      aria-label={`${playing ? 'Pause' : 'Play'} ${demo.title}`}
                    >
                      {playing ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max={times[index].duration || 0}
                      value={times[index].current}
                      onChange={(event) => {
                        const audio = audioRefs.current[index]
                        if (audio) audio.currentTime = Number(event.target.value)
                      }}
                      className="h-1 w-full cursor-pointer accent-primary"
                      aria-label={`Seek ${demo.title}`}
                    />
                    <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
                      {formatTime(times[index].current)}
                    </span>
                  </div>
                  <audio
                    ref={(node) => { audioRefs.current[index] = node }}
                    src={demo.src}
                    preload="metadata"
                    onLoadedMetadata={(event) => updateTime(index, 0, event.currentTarget.duration)}
                    onTimeUpdate={(event) => updateTime(index, event.currentTarget.currentTime, event.currentTarget.duration)}
                    onEnded={() => setActive(null)}
                  />
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
