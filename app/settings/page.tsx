'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, User, Mail, Bell, Shield, Palette, Globe, Save, Camera, ChevronRight, Check, ArrowLeft, Plus, X } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [modalData, setModalData] = useState({ name: '', type: '' })
  
  const [profileData, setProfileData] = useState({
    name: 'GameSense User',
    email: 'user@gamesense.io',
    bio: 'Game developer and analytics enthusiast',
    location: 'San Francisco, CA',
    website: 'https://gamesense.io'
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    alerts: true
  })

  const [appearance, setAppearance] = useState({
    theme: 'dark',
    accent: 'violet',
    fontSize: 'medium'
  })

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleAddModal = (type: string) => {
    setModalData({ name: '', type })
    setShowAddModal(true)
  }

  const handleAddSubmit = () => {
    if (modalData.name.trim()) {
      alert(`Successfully added ${modalData.type}: ${modalData.name}`)
      setShowAddModal(false)
      setModalData({ name: '', type: '' })
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'language', label: 'Language & Region', icon: Globe }
  ]

  return (
    <div className="min-h-screen bg-[#080d18] text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0d1425]/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 lg:px-12">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition">
              <ArrowLeft className="size-5" />
              <span className="text-sm">Back to Dashboard</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="rounded-lg border border-slate-700 bg-slate-900/40 px-4 py-2 text-sm text-slate-300 transition hover:border-violet-400 hover:text-violet-200">
              View Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-12">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Settings</h1>
          <p className="text-slate-400">Manage your account preferences and settings</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm transition ${
                  activeTab === tab.id
                    ? 'bg-violet-500/15 text-violet-300'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon className="size-4" />
                  {tab.label}
                </div>
                {activeTab === tab.id && <ChevronRight className="size-4" />}
              </button>
            ))}
          </aside>

          {/* Content */}
          <div className="rounded-2xl border border-slate-800 bg-[#0d1425] p-6 lg:p-8">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Profile Information</h2>
                    <p className="text-sm text-slate-400">Update your personal information</p>
                  </div>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="size-24 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 p-0.5">
                      <div className="size-full rounded-full bg-slate-900 flex items-center justify-center">
                        <User className="size-10 text-slate-400" />
                      </div>
                    </div>
                    <button className="absolute bottom-0 right-0 rounded-full bg-violet-500 p-2 shadow-lg hover:bg-violet-400 transition">
                      <Camera className="size-4 text-white" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-medium">Profile Photo</h3>
                    <p className="text-sm text-slate-400 mb-2">JPG, PNG or GIF. Max 2MB</p>
                    <button className="text-sm text-violet-400 hover:text-violet-300 transition">
                      Upload new photo
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      rows={3}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Website</label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 rounded-lg bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-xl shadow-violet-500/25 transition hover:bg-violet-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Saving...
                      </>
                    ) : saveSuccess ? (
                      <>
                        <Check className="size-4" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Save className="size-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Notification Preferences</h2>
                    <p className="text-sm text-slate-400">Choose how you want to be notified</p>
                  </div>
                  <button onClick={() => handleAddModal('notification channel')} className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/40 px-3 py-2 text-sm text-slate-300 hover:border-violet-400 hover:text-violet-200 transition">
                    <Plus className="size-4" />
                    Add channel
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'email', label: 'Email notifications', desc: 'Receive updates via email' },
                    { key: 'push', label: 'Push notifications', desc: 'Receive browser push notifications' },
                    { key: 'weekly', label: 'Weekly digest', desc: 'Get a summary of your analytics' },
                    { key: 'alerts', label: 'Critical alerts', desc: 'Get notified about important issues' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/30 p-4">
                      <div>
                        <h3 className="font-medium">{item.label}</h3>
                        <p className="text-sm text-slate-400">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                        className={`relative h-6 w-11 rounded-full transition-colors ${
                          notifications[item.key as keyof typeof notifications] ? 'bg-violet-500' : 'bg-slate-700'
                        }`}
                      >
                        <span
                          className={`absolute top-1 size-4 rounded-full bg-white transition-transform ${
                            notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 rounded-lg bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-xl shadow-violet-500/25 transition hover:bg-violet-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Saving...
                      </>
                    ) : saveSuccess ? (
                      <>
                        <Check className="size-4" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Save className="size-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'appearance' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Appearance</h2>
                    <p className="text-sm text-slate-400">Customize your interface</p>
                  </div>
                  <button onClick={() => handleAddModal('custom theme')} className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/40 px-3 py-2 text-sm text-slate-300 hover:border-violet-400 hover:text-violet-200 transition">
                    <Plus className="size-4" />
                    Custom theme
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">Theme</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['light', 'dark', 'system'].map((theme) => (
                        <button
                          key={theme}
                          onClick={() => setAppearance({ ...appearance, theme })}
                          className={`rounded-lg border p-4 text-center transition ${
                            appearance.theme === theme
                              ? 'border-violet-500 bg-violet-500/10'
                              : 'border-slate-700 bg-slate-900/30 hover:border-slate-600'
                          }`}
                        >
                          <div className="mb-2 text-2xl capitalize">{theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '💻'}</div>
                          <div className="text-sm capitalize">{theme}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">Accent Color</label>
                    <div className="grid grid-cols-5 gap-3">
                      {['violet', 'blue', 'green', 'orange', 'pink'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setAppearance({ ...appearance, accent: color })}
                          className={`h-12 rounded-lg transition ${
                            appearance.accent === color
                              ? `ring-2 ring-offset-2 ring-offset-slate-900 ring-${color}-500`
                              : ''
                          }`}
                          style={{ backgroundColor: color === 'violet' ? '#7757ff' : color === 'blue' ? '#3b82f6' : color === 'green' ? '#10b981' : color === 'orange' ? '#f97316' : '#ec4899' }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">Font Size</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['small', 'medium', 'large'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setAppearance({ ...appearance, fontSize: size })}
                          className={`rounded-lg border px-4 py-3 text-sm transition ${
                            appearance.fontSize === size
                              ? 'border-violet-500 bg-violet-500/10'
                              : 'border-slate-700 bg-slate-900/30 hover:border-slate-600'
                          }`}
                        >
                          <span className={size === 'small' ? 'text-xs' : size === 'large' ? 'text-lg' : ''}>
                            {size.charAt(0).toUpperCase() + size.slice(1)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 rounded-lg bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-xl shadow-violet-500/25 transition hover:bg-violet-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Saving...
                      </>
                    ) : saveSuccess ? (
                      <>
                        <Check className="size-4" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Save className="size-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Security Settings</h2>
                    <p className="text-sm text-slate-400">Manage your account security</p>
                  </div>
                  <button onClick={() => handleAddModal('security method')} className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/40 px-3 py-2 text-sm text-slate-300 hover:border-violet-400 hover:text-violet-200 transition">
                    <Plus className="size-4" />
                    Add method
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Password</h3>
                      <button onClick={() => alert('Opening password change modal...')} className="text-sm text-violet-400 hover:text-violet-300 transition">
                        Change password
                      </button>
                    </div>
                    <p className="text-sm text-slate-400">Last changed 30 days ago</p>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <button onClick={() => alert('Opening 2FA setup...')} className="text-sm text-violet-400 hover:text-violet-300 transition">
                        Enable
                      </button>
                    </div>
                    <p className="text-sm text-slate-400">Add an extra layer of security</p>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Active Sessions</h3>
                      <button onClick={() => alert('Opening session manager...')} className="text-sm text-violet-400 hover:text-violet-300 transition">
                        Manage
                      </button>
                    </div>
                    <p className="text-sm text-slate-400">2 active sessions</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'language' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-1">Language & Region</h2>
                  <p className="text-sm text-slate-400">Set your language and regional preferences</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Language</label>
                    <select className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20">
                      <option>English (US)</option>
                      <option>English (UK)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Japanese</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Timezone</label>
                    <select className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20">
                      <option>Pacific Time (PT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Central Time (CT)</option>
                      <option>Eastern Time (ET)</option>
                      <option>UTC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Date Format</label>
                    <select className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 rounded-lg bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-xl shadow-violet-500/25 transition hover:bg-violet-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Saving...
                      </>
                    ) : saveSuccess ? (
                      <>
                        <Check className="size-4" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Save className="size-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Add Item Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0d1425] p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Add New {modalData.type}</h2>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white transition">
                  <X className="size-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={modalData.name}
                    onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
                    placeholder={`Enter ${modalData.type} name`}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSubmit}
                  disabled={!modalData.name.trim()}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:bg-violet-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <Plus className="size-4" />
                  Add {modalData.type}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
