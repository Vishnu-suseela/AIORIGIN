'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'

const NAV = [
  { label: 'Voice Agents', href: '#voice-agents' },
  { label: 'Client Stories', href: '#stories' },
  { label: 'Process', href: '#process' },
  { label: 'Websites', href: '#websites' },
  { label: 'FAQ', href: '#faq' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border bg-background/85 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="AI Origin home">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span className="flex items-end gap-[2.5px]" aria-hidden="true">
              <span className="voice-bar h-2 w-[2.5px] rounded-full bg-primary-foreground" style={{ animationDelay: '0s' }} />
              <span className="voice-bar h-3.5 w-[2.5px] rounded-full bg-primary-foreground" style={{ animationDelay: '0.15s' }} />
              <span className="voice-bar h-2.5 w-[2.5px] rounded-full bg-primary-foreground" style={{ animationDelay: '0.3s' }} />
            </span>
          </span>
          <span className="text-lg font-semibold tracking-tight">AI Origin</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="mailto:niteshdevarla@gmail.com?subject=AI%20Origin%20Demo%20Call"
            className="hidden h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] md:inline-flex"
          >
            <Phone className="size-4" />
            Book a Demo
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-md md:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-5 pb-5 pt-2">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="mailto:niteshdevarla@gmail.com?subject=AI%20Origin%20Demo%20Call"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground"
              >
                <Phone className="size-4" />
                Book a Demo
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
