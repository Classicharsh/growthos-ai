"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  targetAlpha: number
  color: string
}

export function HeroBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Generate optimized color palette matching GrowthOS colors
    const colors = [
      "rgba(168, 85, 247, ", // purple
      "rgba(99, 102, 241, ",  // indigo
      "rgba(244, 63, 94, ",   // rose/pink
      "rgba(255, 255, 255, ", // white
    ]

    const createParticles = () => {
      // Scale count based on screen size for performance optimization
      const baseCount = Math.min(60, Math.floor((width * height) / 25000))
      const count = prefersReducedMotion ? Math.floor(baseCount * 0.4) : baseCount

      particles = []
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 0.5 // Random sizes 0.5px to 2.5px
        const colorBase = colors[Math.floor(Math.random() * colors.length)]
        
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          // Extremely slow floating velocities
          vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.15,
          vy: prefersReducedMotion ? 0 : -(Math.random() * 0.2 + 0.05),
          radius: size,
          alpha: Math.random() * 0.5 + 0.1,
          targetAlpha: Math.random() * 0.5 + 0.1,
          color: colorBase,
        })
      }
    }

    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      createParticles()
    }

    // Set initial size and create particles
    resizeCanvas()

    // Attach listener
    window.addEventListener("resize", resizeCanvas)

    // Primary drawing loop using requestAnimationFrame
    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw and update each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Slowly interpolate alpha to create subtle pulsing/shimmering
        if (!prefersReducedMotion && Math.random() > 0.98) {
          p.targetAlpha = Math.random() * 0.5 + 0.1
        }
        p.alpha += (p.targetAlpha - p.alpha) * 0.02

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color + p.alpha + ")"
        ctx.shadowBlur = p.radius * 2
        ctx.shadowColor = p.color + "0.5)"
        ctx.fill()

        // Reset shadow for next drawings to keep it fast
        ctx.shadowBlur = 0

        // Update particle positions
        if (!prefersReducedMotion) {
          p.x += p.vx
          p.y += p.vy

          // Wrap particles around borders when floating off-screen
          if (p.y < -10) {
            p.y = height + 10
            p.x = Math.random() * width
          }
          if (p.x < -10 || p.x > width + 10) {
            p.vx = -p.vx
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#030303]">
      
      {/* ── Background Glow Backdrops ── */}
      {/* Primary purple glow — top-left */}
      <motion.div
        className="absolute -top-[20%] -left-[15%] size-[700px] rounded-full bg-purple-600/20 blur-[160px]"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary indigo glow — right side */}
      <motion.div
        className="absolute top-[15%] -right-[15%] size-[800px] rounded-full bg-indigo-600/15 blur-[180px]"
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 70, -50, 0],
          scale: [1, 0.92, 1.08, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Tertiary pink accent glow — center-bottom */}
      <motion.div
        className="absolute top-[60%] left-[30%] size-[500px] rounded-full bg-pink-600/8 blur-[140px]"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.05, 0.98, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Dot Grid overlay ── */}
      <div 
        className="absolute inset-0 opacity-80" 
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* ── Active Canvas Particle Animation Layer ── */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
