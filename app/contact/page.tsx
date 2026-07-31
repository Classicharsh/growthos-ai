"use client"

import * as React from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { HeroBackground } from "@/components/landing/HeroBackground"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { MailIcon, MessageSquareIcon, SparklesIcon, SendIcon } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: ""
  })
  const [submitting, setSubmitting] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields")
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      toast.success("Thank you for reaching out! We'll reply within 24 hours.")
      setFormData({ name: "", email: "", message: "" })
    }, 1200)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#030303] text-zinc-50 font-sans selection:bg-purple-600 selection:text-white relative overflow-hidden">
      <HeroBackground />
      <Navbar />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 relative z-10 flex flex-col gap-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase border border-purple-500/30 bg-purple-500/10 text-purple-300 backdrop-blur-md shadow-xs">
            <MailIcon className="size-3.5 text-purple-400" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-heading bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-100 to-zinc-400">
            Let's Start the Conversation
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Have questions about server integration, enterprise pricing, or onboarding support? Drop us a line below.
          </p>
        </motion.div>

        {/* Form Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-3xl mx-auto w-full">
          
          <Card className="md:col-span-12 rounded-2xl border-zinc-800/60 bg-zinc-950/40 backdrop-blur-md shadow-xs p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-medium text-zinc-400">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/30 px-3.5 py-2 text-sm text-white placeholder-zinc-600 focus:border-purple-500 focus:outline-hidden transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-medium text-zinc-400">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/30 px-3.5 py-2 text-sm text-white placeholder-zinc-600 focus:border-purple-500 focus:outline-hidden transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-medium text-zinc-400">How can we help?</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us details about your project or integration question..."
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/30 px-3.5 py-2 text-sm text-white placeholder-zinc-600 focus:border-purple-500 focus:outline-hidden transition-colors resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full justify-center rounded-xl gap-2 font-semibold h-11 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
              >
                <SendIcon className="size-4" />
                <span>{submitting ? "Sending..." : "Send Message"}</span>
              </Button>
            </form>
          </Card>
        </div>
      </main>
      <footer className="border-t border-zinc-800/40 bg-zinc-950/30 py-8 mt-8 text-center text-xs text-zinc-500 relative z-10">
        <p>&copy; {new Date().getFullYear()} GrowthOS AI. All rights reserved. Created for premium SaaS architectures.</p>
      </footer>
    </div>
  )
}
