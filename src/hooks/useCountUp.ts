import { useState, useEffect, useRef } from 'react'

export function useCountUp(target: number, duration = 1800, start = 0) {
  const [value, setValue] = useState(start)
  const frameRef = useRef<number>()

  useEffect(() => {
    if (target === 0) { setValue(0); return }
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(start + (target - start) * eased))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step)
      }
    }
    frameRef.current = requestAnimationFrame(step)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [target, duration, start])

  return value
}
