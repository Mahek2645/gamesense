'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle2, AlertCircle, Gamepad2 } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email) {
      setError('Please provide your studio email address.')
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError(data.error || 'Failed to send recovery instructions.')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080d18] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-6 flex justify-between items-center">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition">
            <ArrowRight className="size-3.5 rotate-180" />
            <span>BACK TO LOGIN</span>
          </Link>
          <div className="flex items-center gap-2">
            <Gamepad2 className="size-5 text-[#7757ff]" />
            <span className="text-sm font-semibold tracking-tight">gamesense</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0d1425]/90 backdrop-blur-xl p-8 shadow-2xl">
          {submitted ? (
            <div className="text-center py-4">
              <div className="size-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="size-6" />
              </div>
              <h2 className="text-xl font-bold mb-2">Reset link dispatched</h2>
              <p className="text-sm text-slate-400 mb-6">
                We sent security recovery instructions to <span className="text-violet-300 font-mono">{email}</span>. Please check your inbox.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 w-full rounded-lg bg-slate-800 hover:bg-slate-700 py-2.5 text-sm font-medium transition"
              >
                Return to sign in
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
                <p className="text-xs text-slate-400">
                  Enter your email and we will send you a verification link to restore your GameSense workspace access.
                </p>
              </div>

              {error && (
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-300">
                  <AlertCircle className="size-4 text-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Account Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="developer@studio.com"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/60 py-2.5 pl-9 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-violet-500"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#7757ff] hover:bg-violet-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition disabled:opacity-50"
                >
                  {isLoading ? 'Dispatching...' : 'Send Recovery Link'}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}
