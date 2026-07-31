"use client"

import * as React from "react"

interface Orb {
  x: number
  y: number
  targetX: number
  targetY: number
  radius: number
  vx: number
  vy: number
  color: string
  speed: number
}

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  radius: number
  alpha: number
  pulseSpeed: number
  angle: number
  color: string
}

export function ParticleBackground() {
  const orbCanvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const particleCanvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const mouseRef = React.useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  React.useEffect(() => {
    const orbCanvas = orbCanvasRef.current
    const particleCanvas = particleCanvasRef.current
    if (!orbCanvas || !particleCanvas) return

    const orbCtx = orbCanvas.getContext("2d")
    const particleCtx = particleCanvas.getContext("2d")
    if (!orbCtx || !particleCtx) return

    let animationFrameId: number
    let width = (orbCanvas.width = particleCanvas.width = window.innerWidth)
    let height = (orbCanvas.height = particleCanvas.height = window.innerHeight)

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // ── Create Orbs (Large, blurred background lights) ──
    const orbs: Orb[] = [
      {
        x: width * 0.25,
        y: height * 0.25,
        targetX: width * 0.25,
        targetY: height * 0.25,
        radius: Math.min(width, height) * 0.35,
        vx: 0.15,
        vy: 0.1,
        color: "168, 85, 247", // Purple
        speed: 0.002,
      },
      {
        x: width * 0.75,
        y: height * 0.35,
        targetX: width * 0.75,
        targetY: height * 0.35,
        radius: Math.min(width, height) * 0.4,
        vx: -0.1,
        vy: 0.15,
        color: "99, 102, 241", // Indigo
        speed: 0.0015,
      },
      {
        x: width * 0.5,
        y: height * 0.65,
        targetX: width * 0.5,
        targetY: height * 0.65,
        radius: Math.min(width, height) * 0.3,
        vx: 0.08,
        vy: -0.12,
        color: "244, 63, 94", // Rose
        speed: 0.0025,
      },
    ]

    // ── Create 200 Twinkling Particles ──
    const particles: Particle[] = []
    const particleColors = ["255, 255, 255", "168, 85, 247", "99, 102, 241"]

    for (let i = 0; i < 200; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(Math.random() * 0.25 + 0.05), // Float upwards
        radius: Math.random() * 2.2 + 1, // 1px to 3.2px particles
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        angle: Math.random() * Math.PI * 2,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      })
    }

    // ── Mouse Move Listener ──
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX
      mouseRef.current.targetY = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    // ── Resize Handler ──
    const handleResize = () => {
      width = orbCanvas.width = particleCanvas.width = window.innerWidth
      height = orbCanvas.height = particleCanvas.height = window.innerHeight
      
      // Update orb sizes relative to new dimensions
      orbs[0].radius = Math.min(width, height) * 0.35
      orbs[1].radius = Math.min(width, height) * 0.4
      orbs[2].radius = Math.min(width, height) * 0.3

      // Re-distribute particles across new screen boundaries
      particles.forEach((p) => {
        p.x = p.originX = Math.random() * width
        p.y = p.originY = Math.random() * height
      })
    }

    window.addEventListener("resize", handleResize)

    // ── Main Draw loop ──
    const loop = () => {
      // 1. Smooth mouse lerp for responsive parallax easing
      const m = mouseRef.current
      m.x += (m.targetX - m.x) * 0.05
      m.y += (m.targetY - m.y) * 0.05

      // Calculate translation offsets based on coordinates relative to viewport center
      const offsetX = (m.x - width / 2)
      const offsetY = (m.y - height / 2)

      // ── DRAW ORBS (Background layer) ──
      orbCtx.fillStyle = "#020206"
      orbCtx.fillRect(0, 0, width, height)

      orbs.forEach((orb) => {
        // Slowly move orbs dynamically
        if (!prefersReducedMotion) {
          orb.x += orb.vx
          orb.y += orb.vy

          // Keep orbs bouncing within general bounds
          if (orb.x < 0 || orb.x > width) orb.vx = -orb.vx
          if (orb.y < 0 || orb.y > height) orb.vy = -orb.vy
        }

        // Apply mouse parallax shift (deeper depth offset)
        const parallaxX = orb.x + offsetX * 0.04
        const parallaxY = orb.y + offsetY * 0.04

        // Draw radial glow gradient orb
        const gradient = orbCtx.createRadialGradient(
          parallaxX,
          parallaxY,
          0,
          parallaxX,
          parallaxY,
          orb.radius
        )
        gradient.addColorStop(0, `rgba(${orb.color}, 0.28)`)
        gradient.addColorStop(0.5, `rgba(${orb.color}, 0.08)`)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        orbCtx.beginPath()
        orbCtx.arc(parallaxX, parallaxY, orb.radius, 0, Math.PI * 2)
        orbCtx.fillStyle = gradient
        orbCtx.fill()
      })

      // ── DRAW PARTICLES (Foreground layer) ──
      particleCtx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        // Move particle slowly upwards
        if (!prefersReducedMotion) {
          p.originY += p.vy
          p.originX += p.vx

          // Reset particle if it drifts off top screen boundary
          if (p.originY < -10) {
            p.originY = height + 10
            p.originX = Math.random() * width
          }
          // Bounce off left/right
          if (p.originX < -10 || p.originX > width + 10) {
            p.vx = -p.vx
          }
        }

        // Add subtle twinkling shimmer
        p.angle += p.pulseSpeed
        const opacity = p.alpha + Math.sin(p.angle) * 0.15

        // Apply mouse parallax shift (higher speed offset for floating foreground layers)
        const particleParallaxX = p.originX + offsetX * 0.015
        const particleParallaxY = p.originY + offsetY * 0.015

        particleCtx.beginPath()
        particleCtx.arc(particleParallaxX, particleParallaxY, p.radius, 0, Math.PI * 2)
        particleCtx.fillStyle = `rgba(${p.color}, ${Math.max(0.05, Math.min(1, opacity))})`
        
        // Add subtle outer bloom shadow to glow colors
        if (p.radius > 2) {
          particleCtx.shadowBlur = 4
          particleCtx.shadowColor = `rgba(${p.color}, 0.4)`
        }
        
        particleCtx.fill()
        particleCtx.shadowBlur = 0 // Reset bloom
      })

      animationFrameId = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#020206]">
      {/* Canvas 1: Large glowing background orbs */}
      <canvas ref={orbCanvasRef} className="absolute inset-0 w-full h-full" />

      {/* Glass Frost Layer: Blur effect to turn large orbs into soft glowing backdrops */}
      <div className="absolute inset-0 backdrop-blur-[90px] bg-black/[0.15]" />

      {/* Grid Overlay: Subtle technical grid mapping behind the floating particles */}
      <div 
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "4rem 4rem",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 70%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 70%, transparent 100%)",
        }}
      />

      {/* Canvas 2: Twinkling floating particles with parallax */}
      <canvas ref={particleCanvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
