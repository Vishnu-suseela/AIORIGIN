'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  HeartPulse,
  Home,
  Hotel,
  Mail,
  Phone,
  Sparkles,
  UserRound,
  Wrench,
  X,
} from 'lucide-react'

export const BOOKING_EVENT = 'ai-origin:open-booking'
export function openBookingFlow() {
  window.dispatchEvent(new Event(BOOKING_EVENT))
}

const industries = [
  { id: 'healthcare', label: 'Healthcare & dental', detail: 'Bookings and patient calls', icon: HeartPulse, recommended: true },
  { id: 'home-services', label: 'Home services', detail: 'Capture urgent local leads', icon: Wrench, recommended: true },
  { id: 'real-estate', label: 'Real estate', detail: 'Qualify buyers and sellers', icon: Home, recommended: true },
  { id: 'automotive', label: 'Automotive', detail: 'Service and sales follow-up', icon: Car },
  { id: 'hospitality', label: 'Hospitality', detail: 'Reservations and guest calls', icon: Hotel },
  { id: 'professional', label: 'Professional services', detail: 'Intake and consultations', icon: BriefcaseBusiness },
  { id: 'other', label: 'Something else', detail: 'Tell us about your workflow', icon: Building2 },
]

const countryCodes = [
  { code: '+1', label: 'US / CA' },
  { code: '+44', label: 'UK' },
  { code: '+91', label: 'India' },
  { code: '+61', label: 'Australia' },
  { code: '+971', label: 'UAE' },
  { code: '+65', label: 'Singapore' },
]
const times = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM']
const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'long', day: 'numeric' }).format(date)
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

export function BookingFlow() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [industry, setIndustry] = useState('')
  const [company, setCompany] = useState('')
  const [customIndustry, setCustomIndustry] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [monthOffset, setMonthOffset] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [countryCode, setCountryCode] = useState('+1')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [complete, setComplete] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  const timezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone.replaceAll('_', ' '), [])
  const today = useMemo(() => {
    const value = new Date()
    value.setHours(0, 0, 0, 0)
    return value
  }, [])
  const viewedMonth = useMemo(() => new Date(today.getFullYear(), today.getMonth() + monthOffset, 1), [today, monthOffset])
  const days = useMemo(() => {
    const count = new Date(viewedMonth.getFullYear(), viewedMonth.getMonth() + 1, 0).getDate()
    return Array.from({ length: count }, (_, index) => new Date(viewedMonth.getFullYear(), viewedMonth.getMonth(), index + 1))
  }, [viewedMonth])

  useEffect(() => {
    const show = () => setOpen(true)
    window.addEventListener(BOOKING_EVENT, show)
    return () => window.removeEventListener(BOOKING_EVENT, show)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function resetAndClose() {
    setOpen(false)
    window.setTimeout(() => {
      setStep(1)
      setComplete(false)
      setError('')
    }, 250)
  }

  function continueFlow() {
    setError('')
    if (step === 1) {
      if (!industry || !company.trim() || (industry === 'other' && !customIndustry.trim())) {
        setError('Choose your business type and add your business name.')
        return
      }
      setStep(2)
      return
    }
    if (!selectedDate || !selectedTime) {
      setError('Choose a day and a time for your call.')
      return
    }
    setStep(3)
  }

  function submit(event: React.FormEvent) {
    event.preventDefault()
    setError('')
    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email) || phone.replace(/\D/g, '').length < 7) {
      setError('Add your name, a valid work email, and phone number.')
      return
    }
    const business = industries.find((item) => item.id === industry)?.label ?? industry
    const body = [
      'Hi AI Origin,', '', 'I would like to book a demo call.', '',
      `Name: ${name}`, `Work email: ${email}`, `Phone: ${countryCode} ${phone}`,
      `Business: ${company}`, `Industry: ${industry === 'other' ? customIndustry : business}`,
      `Preferred time: ${selectedDate ? formatDate(selectedDate) : ''}, ${selectedTime} (${timezone})`,
      `Goals / call volume: ${notes || 'Not provided'}`,
    ].join('\n')
    window.location.href = `mailto:niteshdevarla@gmail.com?subject=${encodeURIComponent(`Demo call — ${company}`)}&body=${encodeURIComponent(body)}`
    setComplete(true)
  }

  const inputClass = 'h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15'
  const selectedIndustry = industries.find((item) => item.id === industry)

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] flex items-end justify-center bg-foreground/50 p-0 backdrop-blur-md sm:items-center sm:p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && resetAndClose()}>
          <motion.div role="dialog" aria-modal="true" aria-labelledby="booking-title" className="flex max-h-[94svh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-primary/30 bg-card shadow-2xl ring-1 ring-primary/10 sm:max-h-[90svh] sm:rounded-3xl" initial={{ opacity: 0, y: 32, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.98 }} transition={{ duration: 0.25 }}>
            <div className="flex items-start justify-between border-b border-primary/15 bg-primary/5 px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground"><Phone className="size-4" /></span>
                <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">20-minute discovery call</p><h2 id="booking-title" className="text-lg font-semibold">Let&apos;s build your perfect call flow</h2></div>
              </div>
              <button ref={closeRef} type="button" onClick={resetAndClose} className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:bg-secondary hover:text-foreground" aria-label="Close booking flow"><X className="size-5" /></button>
            </div>

            {!complete ? (
              <>
                <div className="border-b border-border px-5 py-4 sm:px-8">
                  <div className="relative mx-auto flex max-w-xl items-start justify-between">
                    <span className="absolute left-[12%] right-[12%] top-3 h-px bg-border" aria-hidden="true" />
                    <motion.span className="absolute left-[12%] top-3 h-px origin-left bg-primary" animate={{ width: step === 1 ? '0%' : step === 2 ? '38%' : '76%' }} transition={{ duration: 0.35 }} aria-hidden="true" />
                    {['Your business', 'Date & time', 'Your details'].map((label, index) => {
                      const number = index + 1
                      return <div key={label} className="relative flex w-24 flex-col items-center gap-2 text-center"><motion.span animate={{ scale: step === number ? 1.15 : 1 }} className={`flex size-6 items-center justify-center rounded-full border text-[11px] font-semibold ${step >= number ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground'}`}>{step > number ? <Check className="size-3" /> : number}</motion.span><span className={`text-[11px] font-medium sm:text-xs ${step === number ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span></div>
                    })}
                  </div>
                </div>

                <div className="overflow-y-auto px-5 py-6 sm:px-8 sm:py-7">
                  <AnimatePresence mode="wait" initial={false}>
                    {step === 1 && <motion.section key="business" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">First, a little context</p><h3 className="mt-2 text-balance text-2xl font-semibold">What kind of business are we calling for?</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">We&apos;ll tailor the live demo to the calls, questions, and opportunities your team handles.</p>
                      <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">{industries.map((item) => <button key={item.id} type="button" onClick={() => setIndustry(item.id)} aria-pressed={industry === item.id} className={`relative flex min-h-24 items-start gap-3 rounded-2xl border p-4 text-left transition ${industry === item.id ? 'border-primary bg-primary/8 shadow-sm' : 'border-border bg-background hover:border-primary/35 hover:bg-secondary/50'}`}><span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${industry === item.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}><item.icon className="size-4" /></span><span><span className="block text-sm font-semibold">{item.label}</span><span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{item.detail}</span></span>{item.recommended && <span className="absolute right-3 top-3 text-[9px] font-semibold uppercase tracking-wider text-primary">Best fit</span>}</button>)}</div>
                      <div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="flex flex-col gap-2 text-sm font-medium">Business name<input className={inputClass} value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Northstar Dental" /></label>{industry === 'other' && <label className="flex flex-col gap-2 text-sm font-medium">Your industry<input className={inputClass} value={customIndustry} onChange={(e) => setCustomIndustry(e.target.value)} placeholder="Tell us what you do" /></label>}</div>
                    </motion.section>}

                    {step === 2 && <motion.section key="schedule" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}><div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]"><div><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Pick a day</p><h3 className="mt-2 text-xl font-semibold">{viewedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3></div><div className="flex gap-2"><button type="button" disabled={monthOffset === 0} onClick={() => setMonthOffset((v) => v - 1)} className="flex size-9 items-center justify-center rounded-full border border-border disabled:opacity-30" aria-label="Previous month"><ChevronLeft className="size-4" /></button><button type="button" disabled={monthOffset === 2} onClick={() => setMonthOffset((v) => v + 1)} className="flex size-9 items-center justify-center rounded-full border border-border disabled:opacity-30" aria-label="Next month"><ChevronRight className="size-4" /></button></div></div>
                        <div className="mt-5 grid grid-cols-7 text-center">{week.map((day) => <span key={day} className="pb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{day}</span>)}{Array.from({ length: viewedMonth.getDay() }, (_, i) => <span key={`blank-${i}`} />)}{days.map((date) => { const disabled = date < today || date.getDay() === 0; const active = selectedDate && dateKey(selectedDate) === dateKey(date); return <button key={date.toISOString()} type="button" disabled={disabled} onClick={() => setSelectedDate(date)} className={`mx-auto flex size-9 items-center justify-center rounded-full text-sm transition ${active ? 'bg-primary font-semibold text-primary-foreground' : disabled ? 'text-muted-foreground/35' : 'hover:bg-secondary'}`} aria-label={formatDate(date)}>{date.getDate()}</button> })}</div></div>
                        <div className="rounded-2xl border border-border bg-background p-5"><div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary"><Clock3 className="size-4" /></span><div><p className="text-sm font-semibold">Available times</p><p className="text-xs text-muted-foreground">{selectedDate ? formatDate(selectedDate) : 'Select a date first'}</p></div></div><div className="mt-5 grid grid-cols-2 gap-2">{times.map((time) => <button key={time} type="button" disabled={!selectedDate} onClick={() => setSelectedTime(time)} className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition disabled:opacity-35 ${selectedTime === time ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40'}`}>{time}</button>)}</div><p className="mt-4 flex items-center gap-2 text-xs leading-relaxed text-muted-foreground"><CalendarDays className="size-4 shrink-0" />Times shown in {timezone}. We&apos;ll confirm availability by email.</p></div></div>
                    </motion.section>}

                    {step === 3 && <motion.form key="details" id="booking-form" onSubmit={submit} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}><div className="grid gap-6 lg:grid-cols-[1fr_.75fr]"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Last step</p><h3 className="mt-2 text-2xl font-semibold">Where should we send the invite?</h3><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="flex flex-col gap-2 text-sm font-medium">Full name<div className="relative"><UserRound className="absolute left-3 top-3.5 size-4 text-muted-foreground" /><input className={`${inputClass} pl-10`} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Your name" /></div></label><label className="flex flex-col gap-2 text-sm font-medium">Work email<div className="relative"><Mail className="absolute left-3 top-3.5 size-4 text-muted-foreground" /><input className={`${inputClass} pl-10`} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" type="email" placeholder="you@company.com" /></div></label></div><label className="mt-4 flex flex-col gap-2 text-sm font-medium">Phone number<div className="flex gap-2"><select aria-label="Country code" className="h-11 w-32 shrink-0 rounded-xl border border-input bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>{countryCodes.map((country) => <option key={country.code} value={country.code}>{country.label} {country.code}</option>)}</select><input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" placeholder="Phone number" /></div></label><label className="mt-4 flex flex-col gap-2 text-sm font-medium">Anything we should know? <span className="font-normal text-muted-foreground">Optional</span><textarea className="min-h-24 w-full resize-none rounded-xl border border-input bg-background p-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Monthly call volume, current tools, or what you want the agent to handle..." /></label></div>
                        <aside className="rounded-2xl border border-primary/20 bg-primary/6 p-5"><div className="flex items-center gap-2 text-primary"><Sparkles className="size-4" /><p className="text-xs font-semibold uppercase tracking-[0.17em]">Your demo</p></div><dl className="mt-5 flex flex-col gap-4 text-sm"><div><dt className="text-xs text-muted-foreground">Business</dt><dd className="mt-1 font-semibold">{company}</dd><dd className="text-xs text-muted-foreground">{industry === 'other' ? customIndustry : selectedIndustry?.label}</dd></div><div><dt className="text-xs text-muted-foreground">Date & time</dt><dd className="mt-1 font-semibold">{selectedDate && formatDate(selectedDate)}</dd><dd className="text-xs text-muted-foreground">{selectedTime} · {timezone}</dd></div></dl></aside></div></motion.form>}
                  </AnimatePresence>
                  {error && <p role="alert" className="mt-4 text-sm font-medium text-destructive">{error}</p>}
                </div>

                <div className="flex items-center justify-between border-t border-border px-5 py-4 sm:px-8"><button type="button" onClick={() => { setError(''); setStep((value) => Math.max(1, value - 1)) }} className={`inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition hover:bg-secondary ${step === 1 ? 'invisible' : ''}`}><ArrowLeft className="size-4" />Back</button>{step < 3 ? <button type="button" onClick={continueFlow} className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:scale-[1.02]">Continue<ArrowRight className="size-4" /></button> : <button type="submit" form="booking-form" className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:scale-[1.02]">Request this time<ArrowRight className="size-4" /></button>}</div>
              </>
            ) : (
              <div className="flex flex-col items-center px-6 py-16 text-center"><span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="size-7" /></span><p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Ready to send</p><h3 className="mt-2 text-balance text-3xl font-semibold">Your demo request is prepared.</h3><p className="mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">Send the prefilled email that just opened. We&apos;ll reply with your calendar invite and a demo tailored to {company}.</p><button type="button" onClick={resetAndClose} className="mt-8 h-11 rounded-full border border-border px-6 text-sm font-semibold hover:bg-secondary">Back to AI Origin</button></div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
