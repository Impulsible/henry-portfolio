import { useEffect, useState, useRef } from 'react'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const trailRef = useRef({ x: -100, y: -100 })
  const animFrameRef = useRef<number>(0)

  useEffect(() => {
    // Smooth trailing dot animation
    const animateTrail = () => {
      trailRef.current = {
        x: trailRef.current.x + (position.x - trailRef.current.x) * 0.12,
        y: trailRef.current.y + (position.y - trailRef.current.y) * 0.12,
      }
      setTrailPosition({ ...trailRef.current })
      animFrameRef.current = requestAnimationFrame(animateTrail)
    }
    animFrameRef.current = requestAnimationFrame(animateTrail)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [position])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Detect hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select')
      setIsHovering(!!isInteractive)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousemove', handleElementHover)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousemove', handleElementHover)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isVisible])

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999] hidden lg:block"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isClicking
              ? 'w-2 h-2 bg-[#FFB86B]'
              : isHovering
              ? 'w-2.5 h-2.5 bg-[#FF6B35]'
              : 'w-2 h-2 bg-[#FF6B35]'
          } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      {/* Trailing ring */}
      <div
        className="fixed pointer-events-none z-[9998] hidden lg:block"
        style={{
          left: trailPosition.x,
          top: trailPosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full border transition-all duration-200 ${
            isClicking
              ? 'w-6 h-6 border-[#FFB86B]/60 scale-75'
              : isHovering
              ? 'w-10 h-10 border-[#FF6B35]/40 bg-[#FF6B35]/5'
              : 'w-8 h-8 border-[#FF6B35]/25'
          } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    </>
  )
}

export default CustomCursor