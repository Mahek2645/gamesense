'use client'

import { motion } from 'framer-motion'
import { MailCheck, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-[#080d18] text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center rounded-2xl border border-slate-800 bg-[#0d1425] p-8 shadow-2xl"
      >
        <div className="size-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center mb-4">
          <MailCheck className="size-8" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
        <p className="text-sm text-slate-400 mb-6">
          We sent a verification link to confirm your GameSense studio workspace. Click the link to complete verification.
        </p>
        <div className="space-y-3">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#7757ff] hover:bg-violet-500 py-2.5 text-sm font-semibold transition"
          >
            Go to Login <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/"
            className="block text-xs text-slate-400 hover:text-white py-1 transition"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
