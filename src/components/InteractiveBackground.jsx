import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'
import './InteractiveBackground.css'

export default function InteractiveBackground() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth mouse movement
  const springConfig = { damping: 25, stiffness: 150 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set((clientX / innerWidth) - 0.5)
      mouseY.set((clientY / innerHeight) - 0.5)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const shapes = [
    { type: 'cube', size: 150, x: '10%', y: '15%', delay: 0, rotate: 45 },
    { type: 'sphere', size: 200, x: '80%', y: '10%', delay: 2, rotate: 0 },
    { type: 'pyramid', size: 120, x: '75%', y: '70%', delay: 1, rotate: -15 },
    { type: 'cube', size: 80, x: '15%', y: '80%', delay: 3, rotate: 120 },
  ]

  return (
    <div className="bg-3d-wrapper">
      <div className="bg-mesh-gradient"></div>
      
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`geometric-shape ${shape.type}`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            x: useTransform(smoothX, [-0.5, 0.5], [i % 2 === 0 ? 50 : -50, i % 2 === 0 ? -50 : 50]),
            y: useTransform(smoothY, [-0.5, 0.5], [i % 2 === 0 ? 50 : -50, i % 2 === 0 ? -50 : 50]),
            rotate: shape.rotate,
          }}
          animate={{
            y: [0, 20, 0],
            rotate: [shape.rotate, shape.rotate + 10, shape.rotate],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay
          }}
        >
          <div className="glass-surface"></div>
        </motion.div>
      ))}

      <div className="bg-vignette"></div>
    </div>
  )
}
