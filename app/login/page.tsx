'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Shield, CheckCircle2, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleQuickDemoFill = () => {
    setEmail('user@gamesense.io')
    setPassword('user123')
    setErrorMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setSuccessMessage(null)

    if (!email || !password) {
      setErrorMessage('Please enter both your email address and password.')
      return
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.error || 'Login failed. Please check your credentials.')
        setIsLoading(false)
        return
      }

      setSuccessMessage('Welcome! Directing you to your studio workspace...')

      // Save cookie and redirect
      if (data.token) {
        document.cookie = `auth_token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=lax`
      }

      setTimeout(() => {
        if (data.user?.role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/dashboard')
        }
      }, 400)
    } catch (error) {
      setErrorMessage('Network error. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080d18] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d15_1px,transparent_1px),linear-gradient(to_bottom,#1f293d15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Top Header */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition">
            <ArrowRight className="size-3.5 rotate-180" />
            <span>BACK TO HOME</span>
          </Link>
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">SECURE STUDIO LOGIN</span>
        </div>

        {/* Brand Card */}
        <div className="rounded-2xl border border-slate-800/80 bg-[#0d1425]/90 backdrop-blur-xl p-8 shadow-2xl shadow-black/50">
          <div className="mb-6 text-center">
            <div className="inline-flex items-center justify-center size-12 rounded-xl bg-gradient-to-tr from-[#7757ff] to-cyan-500 shadow-lg shadow-violet-500/25 mb-4">
              <Gamepad2 className="size-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Sign In to GameSense</h1>
            <p className="text-sm text-slate-400 mt-1">Autonomous AI & Human Gameplay Intelligence</p>
          </div>

          {/* Quick Demo Credentials Pill */}
          <div className="mb-5 rounded-xl border border-violet-500/20 bg-violet-500/10 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-violet-200">
              <Sparkles className="size-4 text-violet-400 shrink-0" />
              <span>Use any personal email or instant demo account</span>
            </div>
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-xs font-medium px-2.5 py-1 rounded-md bg-violet-600/80 hover:bg-violet-500 text-white transition shrink-0"
            >
              1-Click Demo
            </button>
          </div>

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex items-start gap-2.5 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-300"
            >
              <AlertCircle className="size-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-300"
            >
              <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Developer / Studio Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@gamestudio.com"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/60 py-2.5 pl-9 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  required
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                New emails are automatically provisioned with a starter studio workspace.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-violet-400 hover:text-violet-300 transition">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/60 py-2.5 pl-9 pr-10 text-sm text-white placeholder-slate-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#7757ff] to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:shadow-violet-500/35 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Enter Studio Workspace</span>
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-500">
              GameSense Intelligence Platform &bull; End-to-End Gameplay Verification
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
