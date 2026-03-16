'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    let ringX = 0, ringY = 0
    let mouseX = 0, mouseY = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`
      }
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.12)
      ringY = lerp(ringY, mouseY, 0.12)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 15}px, ${ringY - 15}px)`
      }
      rafId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(animate)

    // Hide on leave / show on enter
    const hide = () => {
      dotRef.current && (dotRef.current.style.opacity = '0')
      ringRef.current && (ringRef.current.style.opacity = '0')
    }
    const show = () => {
      dotRef.current && (dotRef.current.style.opacity = '1')
      ringRef.current && (ringRef.current.style.opacity = '1')
    }
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#CFA948',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'opacity 0.2s ease',
          willChange: 'transform',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          border: '1.5px solid rgba(207,169,72,0.6)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'opacity 0.2s ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
