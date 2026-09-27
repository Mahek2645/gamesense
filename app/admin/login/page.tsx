'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, EyeOff, AlertCircle, Server, KeyRound, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFillAdminCredentials = () => {
    setEmail('admin@gamesense.io')
    setPassword('admin123')
    setError('')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Admin verification failed')
        setIsLoading(false)
        return
      }

      setSuccess('Admin authorized. Launching Platform Control Center...')

      if (data.token) {
        document.cookie = `auth_token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=lax`
      }

      setTimeout(() => {
        router.push('/admin')
      }, 500)
    } catch (error) {
      setError('Network error during admin authorization. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080d18] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Visual background layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-cyan-600/15 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition">
            <ArrowRight className="size-3.5 rotate-180" />
            <span>HOME</span>
          </Link>
          <Link href="/login" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-medium transition">
            <span>User Login</span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-violet-500/30 bg-[#0d1425]/90 backdrop-blur-xl p-8 shadow-2xl shadow-violet-950/40">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 shadow-xl shadow-violet-600/30 mb-4 border border-violet-400/30">
              <Shield className="size-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Platform Control Center</h1>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-mono">System Administrator Portal</p>
          </div>

          {/* Credentials Display Box */}
          <div className="mb-6 rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                <KeyRound className="size-4" />
                <span>Authorized Admin Credentials</span>
              </div>
              <button
                type="button"
                onClick={handleFillAdminCredentials}
                className="text-[11px] font-medium px-2 py-0.5 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 transition"
              >
                Auto-Fill
              </button>
            </div>
            <div className="text-xs font-mono space-y-1 text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-500">Admin Email:</span>
                <span className="text-cyan-200 select-all">admin@gamesense.io</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Password:</span>
                <span className="text-cyan-200 select-all">admin123</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Admin ID:</span>
                <span className="text-violet-300 select-all">admin-001</span>
              </div>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex items-start gap-2.5 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-300"
            >
              <AlertCircle className="size-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-300"
            >
              <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
              <span>{success}</span>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Admin Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gamesense.io"
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 py-2.5 px-3.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Admin Security Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/60 py-2.5 pl-3.5 pr-10 text-sm text-white placeholder-slate-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
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
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isLoading ? (
                <>
                  <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Verifying Admin Authority...</span>
                </>
              ) : (
                <>
                  <Shield className="size-4" />
                  <span>Authenticate Admin Session</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <Link href="/login" className="hover:text-white transition">
              Standard User Login
            </Link>
            <div className="flex items-center gap-1.5 text-slate-500 font-mono">
              <Server className="size-3.5" />
              <span>TLS 1.3 SECURE</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
