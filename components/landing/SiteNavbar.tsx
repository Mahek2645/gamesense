'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, ArrowRight, Menu, X } from 'lucide-react'

interface SiteNavbarProps {
  activePage?: 'home' | 'how-it-works' | 'platform' | 'pricing' | 'contact'
  ctaText?: string
  ctaHref?: string
}

export function SiteNavbar({
  activePage = 'home',
  ctaText = 'Get Started',
  ctaHref = '/login',
}: SiteNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const navLinks = [
    { label: 'How It Works', href: '/how-it-works', key: 'how-it-works' },
    { label: 'Platform', href: '/platform', key: 'platform' },
    { label: 'Pricing', href: '/pricing', key: 'pricing' },
    { label: 'Contact', href: '/contact', key: 'contact' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#080d18]/85 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 text-white group z-50">
          <motion.span
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="grid size-9 place-items-center rounded-xl bg-gradient-to-tr from-[#7757ff] to-cyan-400 shadow-md shadow-violet-500/25 transition"
          >
            <Gamepad2 className="size-5 text-white" />
          </motion.span>
          <span className="text-xl font-bold tracking-tight">gamesense</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-300">
          {navLinks.map((item) => {
            const isActive = activePage === item.key
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`transition relative group py-1 ${
                  isActive ? 'text-white font-semibold' : 'hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-violet-400 to-cyan-400 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg border border-slate-700 bg-slate-900/60 px-3.5 py-1.5 text-xs font-medium text-slate-200 hover:border-violet-400 hover:text-white transition"
          >
            Sign In
          </Link>
          <Link
            href={ctaHref}
            className="relative group overflow-hidden rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-1.5 text-xs font-semibold text-white shadow-md shadow-violet-600/30 hover:brightness-110 transition inline-flex items-center gap-1.5"
          >
            <span className="relative z-10">{ctaText}</span>
            <ArrowRight className="relative z-10 size-3.5 group-hover:translate-x-0.5 transition" />
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex md:hidden items-center gap-2 z-50">
          <Link
            href="/login"
            className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white"
          >
            Sign In
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="grid size-9 place-items-center rounded-lg border border-slate-700 bg-slate-900/80 text-slate-200 hover:text-white hover:border-slate-600 transition"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay & Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-16 z-30 bg-black/70 backdrop-blur-md md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-x-0 top-16 z-40 border-b border-slate-800 bg-[#0d1425]/98 px-5 py-6 shadow-2xl md:hidden"
            >
              <nav className="flex flex-col gap-3">
                {navLinks.map((item) => {
                  const isActive = activePage === item.key
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                        isActive
                          ? 'bg-violet-500/15 text-violet-300 border border-violet-500/30'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="size-4 opacity-50" />
                    </Link>
                  )
                })}

                <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2.5">
                  <Link
                    href={ctaHref}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:brightness-110"
                  >
                    <span>{ctaText}</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
