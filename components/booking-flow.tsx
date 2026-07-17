'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft, ArrowRight, BriefcaseBusiness, Building2, CalendarDays, Car,
  Check, ChevronLeft, ChevronRight, HeartPulse, Home, Hotel, Scale, ShoppingBag,
  Stethoscope, X,
} from 'lucide-react'

const BUSINESSES = [
  { id: 'dental', label: 'Dental', icon: Stethoscope, recommendation: 'Blended agent' },
  { id: 'healthcare', label: 'Healthcare', icon: HeartPulse, recommendation: 'Inbound agent' },
  { id: 'home-services', label: 'Home services', icon: Home, recommendation: 'Blended agent' },
  { id: 'real-estate', label: 'Real estate', icon: Building2, recommendation: 'Outbound agent' },
  { id: 'legal', label: 'Legal', icon: Scale, recommendation: 'Inbound agent' },
  { id: 'automotive', label: 'Automotive', icon: Car, recommendation: 'Blended agent' },
  { id: 'hospitality', label: 'Hospitality', icon: Hotel, recommendation: 'Inbound agent' },
  { id: 'ecommerce', label: 'E-commerce', icon: ShoppingBag, recommendation: 'Outbound agent' },
  { id: 'other', label: 'Other', icon: BriefcaseBusiness, recommendation: 'Tailored agent' },
]

const COUNTRY_CODES = ['+91', '+1', '+44', '+61', '+971', '+65', '+49', '+33']
const TIMES = ['09:30', '11:00', '14:00', '16:30']
const STEPS = ['Business', 'Schedule', 'Details']

function daysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

export function BookingFlow() {
  const dialogRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [business, setBusiness] = useState('')
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState('')
  const [form, setForm] = useState({ name: '', email: '', company: '', website: '', code: '+91', phone: '', notes: '' })
  const [error, setError] = useState('')

  const timezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, [])
  const selectedBusiness = BUSINESSES.find((item) => item.id === business)

  useEffect(() => {
    const sync = () => setOpen(window.location.hash === '#booking')
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, input, select, textarea, a[href]')).filter((el) => !el.hasAttribute('disabled'))
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      previous?.focus()
    }
  }, [open])

  const close = () => {
    setOpen(false)
    history.replaceState(null, '', `${location.pathname}${location.search}`)
  }

  const next = () => {
    setError('')
    if (step === 0 && !business) return setError('Choose your business type to continue.')
    if (step === 1 && (!date || !time)) return setError('Choose a date and time to continue.')
    setStep((value) => Math.min(2, value + 1))
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.name || !form.email || !form.company || !form.phone) {
      setError('Complete the required contact details.')
      return
    }
    const subject = `AI Origin discovery call — ${form.company}`
    const body = [
      `Name: ${form.name}`, `Work email: ${form.email}`, `Company: ${form.company}`,
      `Website: ${form.website || 'Not provided'}`, `Phone: ${form.code} ${form.phone}`,
      `Business: ${selectedBusiness?.label}`, `Recommended solution: ${selectedBusiness?.recommendation}`,
      `Requested time: ${date?.toLocaleDateString('en-GB', { dateStyle: 'long' })} at ${time} (${timezone})`,
      `Goals: ${form.notes || 'Not provided'}`,
    ].join('\n')
    window.location.href = `mailto:niteshdevarla@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  if (!open) return null

  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay()
  const totalDays = daysInMonth(month)
  const today = new Date(); today.setHours(0, 0, 0, 0)

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-foreground/45 p-0 backdrop-blur-sm md:items-center md:p-5" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="booking-title" tabIndex={-1} className="max-h-[94svh] w-full overflow-y-auto rounded-t-3xl bg-background shadow-2xl outline-none md:max-w-4xl md:rounded-3xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-5 py-4 backdrop-blur md:px-8">
          <a href="#top" className="flex items-center gap-2 font-semibold" onClick={close}>
            <span className="flex size-7 items-end justify-center gap-0.5 rounded-full bg-primary pb-2" aria-hidden="true"><span className="h-2 w-0.5 bg-primary-foreground" /><span className="h-3 w-0.5 bg-primary-foreground" /><span className="h-1.5 w-0.5 bg-primary-foreground" /></span>
            AI Origin
          </a>
          <button type="button" onClick={close} className="flex size-10 items-center justify-center rounded-full border border-border hover:bg-secondary" aria-label="Close booking"><X className="size-5" /></button>
        </div>

        <div className="grid md:grid-cols-[15rem_1fr]">
          <aside className="border-b border-border bg-secondary/45 p-5 md:border-b-0 md:border-r md:p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-primary">20-minute discovery</p>
            <h2 id="booking-title" className="mt-3 text-2xl font-semibold tracking-tight">Let&apos;s design your first AI call.</h2>
            <ol className="mt-6 flex gap-2 md:flex-col md:gap-5">
              {STEPS.map((label, index) => (
                <li key={label} className="flex min-w-0 flex-1 items-center gap-3">
                  <span className={`flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${index <= step ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-muted-foreground'}`}>{index < step ? <Check className="size-3.5" /> : index + 1}</span>
                  <span className={`hidden text-sm md:block ${index === step ? 'font-semibold' : 'text-muted-foreground'}`}>{label}</span>
                  {index < STEPS.length - 1 && <span className={`h-px flex-1 md:hidden ${index < step ? 'bg-primary' : 'bg-border'}`} />}
                </li>
              ))}
            </ol>
          </aside>

          <div className="min-h-[34rem] p-5 md:p-8 lg:p-10">
            {step === 0 && <div>
              <p className="text-sm text-primary">Step 1 of 3</p>
              <h3 className="mt-2 text-2xl font-semibold">What kind of business do you run?</h3>
              <p className="mt-2 text-sm text-muted-foreground">We&apos;ll recommend the voice system most likely to stop your revenue leaks.</p>
              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {BUSINESSES.map((item) => <button key={item.id} type="button" onClick={() => setBusiness(item.id)} aria-pressed={business === item.id} className={`flex min-h-24 flex-col items-start justify-between rounded-xl border p-4 text-left transition-colors ${business === item.id ? 'border-primary bg-primary/8' : 'border-border hover:bg-secondary'}`}><item.icon className="size-5 text-primary" /><span className="text-sm font-medium">{item.label}</span></button>)}
              </div>
              {selectedBusiness && <div className="mt-5 rounded-xl border border-primary/25 bg-primary/8 p-4"><p className="text-xs uppercase tracking-[0.18em] text-primary">Our recommendation</p><p className="mt-1 font-semibold">{selectedBusiness.recommendation}</p><p className="mt-1 text-sm text-muted-foreground">We&apos;ll confirm the exact call flow during discovery.</p></div>}
            </div>}

            {step === 1 && <div>
              <p className="text-sm text-primary">Step 2 of 3</p><h3 className="mt-2 text-2xl font-semibold">Choose a time that works.</h3><p className="mt-2 text-sm text-muted-foreground">Times shown in {timezone}.</p>
              <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_12rem]">
                <div className="rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between"><button type="button" aria-label="Previous month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="flex size-9 items-center justify-center rounded-full hover:bg-secondary"><ChevronLeft className="size-4" /></button><p className="font-semibold">{month.toLocaleDateString('en', { month: 'long', year: 'numeric' })}</p><button type="button" aria-label="Next month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="flex size-9 items-center justify-center rounded-full hover:bg-secondary"><ChevronRight className="size-4" /></button></div>
                  <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">{['S','M','T','W','T','F','S'].map((day, i) => <span key={`${day}-${i}`} className="py-2">{day}</span>)}{Array.from({ length: firstDay }, (_, i) => <span key={`empty-${i}`} />)}{Array.from({ length: totalDays }, (_, i) => { const day = i + 1; const candidate = new Date(month.getFullYear(), month.getMonth(), day); const disabled = candidate < today || candidate.getDay() === 0; const selected = date?.toDateString() === candidate.toDateString(); return <button key={day} type="button" disabled={disabled} onClick={() => setDate(candidate)} className={`aspect-square rounded-full text-sm ${selected ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'} disabled:cursor-not-allowed disabled:opacity-25`}>{day}</button> })}</div>
                </div>
                <div><p className="flex items-center gap-2 text-sm font-semibold"><CalendarDays className="size-4 text-primary" />Available times</p><div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-1">{TIMES.map((slot) => <button key={slot} type="button" onClick={() => setTime(slot)} className={`rounded-lg border px-3 py-2.5 text-sm ${time === slot ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-secondary'}`}>{slot}</button>)}</div></div>
              </div>
            </div>}

            {step === 2 && <form id="booking-form" onSubmit={submit}>
              <p className="text-sm text-primary">Step 3 of 3</p><h3 className="mt-2 text-2xl font-semibold">Where should we reach you?</h3><p className="mt-2 text-sm text-muted-foreground">Your details are used only to prepare and confirm this call.</p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {([['name','Full name *','text'],['email','Work email *','email'],['company','Company *','text'],['website','Website','url']] as const).map(([key,label,type]) => <label key={key} className="flex flex-col gap-2 text-sm font-medium">{label}<input type={type} required={label.includes('*')} value={form[key]} onChange={(e) => setForm({...form,[key]:e.target.value})} className="h-11 rounded-lg border border-input bg-background px-3 font-normal outline-none focus:border-primary" /></label>)}
                <label className="flex flex-col gap-2 text-sm font-medium sm:col-span-2">Phone number *<span className="flex"><select value={form.code} onChange={(e) => setForm({...form,code:e.target.value})} aria-label="Country code" className="h-11 rounded-l-lg border border-r-0 border-input bg-secondary px-3">{COUNTRY_CODES.map((code) => <option key={code}>{code}</option>)}</select><input type="tel" required value={form.phone} onChange={(e) => setForm({...form,phone:e.target.value})} className="h-11 min-w-0 flex-1 rounded-r-lg border border-input bg-background px-3 outline-none focus:border-primary" /></span></label>
                <label className="flex flex-col gap-2 text-sm font-medium sm:col-span-2">What should the agent help with?<textarea rows={3} value={form.notes} onChange={(e) => setForm({...form,notes:e.target.value})} className="rounded-lg border border-input bg-background p-3 font-normal outline-none focus:border-primary" placeholder="Missed calls, appointment booking, lead follow-up…" /></label>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">By continuing, you agree that AI Origin may contact you about this request. The final button opens your email app with the booking details ready to send.</p>
            </form>}

            {error && <p role="alert" className="mt-5 text-sm font-medium text-destructive">{error}</p>}
            <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
              <button type="button" onClick={() => step === 0 ? close() : setStep(step - 1)} className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium hover:bg-secondary"><ArrowLeft className="size-4" />{step === 0 ? 'Cancel' : 'Back'}</button>
              {step < 2 ? <button type="button" onClick={next} className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">Continue<ArrowRight className="size-4" /></button> : <button type="submit" form="booking-form" className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">Open email to book<ArrowRight className="size-4" /></button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
