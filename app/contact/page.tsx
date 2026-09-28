'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, Mail, MessageSquare, Send, CheckCircle2, ArrowRight, Building, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { SiteNavbar } from '@/components/landing/SiteNavbar'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studio: '',
    engine: 'Unreal Engine 5',
    projectStage: 'In Active Alpha / Beta',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok) {
        setSubmitted(true)
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080d18] text-white selection:bg-violet-500/30">
      {/* Top Navbar */}
      <SiteNavbar activePage="contact" ctaText="Dashboard" ctaHref="/dashboard" />


      {/* Form Container */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-mono text-violet-300 mb-4">
            <MessageSquare className="size-3.5" />
            <span>STUDIO INQUIRIES & DEMO REQUESTS</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Schedule a GameSense Architecture Deep Dive
          </h1>
          <p className="mt-4 text-base text-slate-400 max-w-xl mx-auto">
            Discuss your game mechanics, telemetry requirements, or custom AI agent reinforcement models directly with our team.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0d1425]/80 backdrop-blur-xl p-8 sm:p-10 shadow-2xl">
          {submitted ? (
            <div className="text-center py-10">
              <div className="size-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="size-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Request Transmitted</h2>
              <p className="text-slate-300 max-w-md mx-auto mb-6">
                Thank you, <span className="font-semibold text-white">{formData.name}</span>. A GameSense solutions architect will reach out to <span className="font-mono text-cyan-300">{formData.email}</span> within 4 hours.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-sm font-semibold transition"
              >
                <span>Explore Live Workspace</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Robin Vane"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900/60 py-2.5 px-3.5 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Studio Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@studio.com"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900/60 py-2.5 px-3.5 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Game Studio / Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studio}
                    onChange={e => setFormData({ ...formData, studio: e.target.value })}
                    placeholder="e.g. Apex Velocity Games"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900/60 py-2.5 px-3.5 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Primary Game Engine
                  </label>
                  <select
                    value={formData.engine}
                    onChange={e => setFormData({ ...formData, engine: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900/90 py-2.5 px-3.5 text-sm text-white outline-none focus:border-violet-500"
                  >
                    <option value="Unreal Engine 5">Unreal Engine 5</option>
                    <option value="Unity LTS">Unity LTS</option>
                    <option value="Godot 4">Godot 4</option>
                    <option value="Custom Proprietary C++">Custom Proprietary C++</option>
                    <option value="WebGPU / WebGL">WebGPU / WebGL</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  How can our gameplay intelligence team help?
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your genre, target platforms, playtest bottlenecks, or balance requirements..."
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/60 py-2.5 px-3.5 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500"
                />
              </div>

              {errorMsg && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-400">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#7757ff] to-cyan-500 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:brightness-110 transition disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <Send className="size-4" />
                    <span>Send Inquiry to Solutions Team</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
