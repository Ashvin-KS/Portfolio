'use client'

import { ReactNode, useRef } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale-up' | 'slide-up'
  delay?: number
}

export function AnimatedSection({ 
  children, 
  className, 
  animation = 'fade-up',
  delay = 0 
}: AnimatedSectionProps) {
  const { isVisible, setElement } = useScrollAnimation()

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return 'opacity-0 translate-y-10'
        case 'fade-left':
          return 'opacity-0 -translate-x-10'
        case 'fade-right':
          return 'opacity-0 translate-x-10'
        case 'scale-up':
          return 'opacity-0 scale-95'
        case 'slide-up':
          return 'opacity-0 translate-y-20'
        default:
          return 'opacity-0 translate-y-10'
      }
    }
    return 'opacity-100 translate-y-0 translate-x-0 scale-100'
  }

  return (
    <div
      ref={setElement}
      className={cn(
        'transition-all duration-700 ease-out',
        getAnimationClass(),
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}