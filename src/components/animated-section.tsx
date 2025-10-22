'use client'

import { ReactNode, useRef, forwardRef } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { cn } from '@/lib/utils'

export interface AnimatedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale-up' | 'slide-up'
  delay?: number
}

export const AnimatedSection = forwardRef<HTMLDivElement, AnimatedSectionProps>(({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  ...props
}, ref) => {
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
      ref={(element) => {
        setElement(element);
        if (typeof ref === 'function') {
          ref(element);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLElement | null>).current = element;
        }
      }}
      className={cn(
        'transition-all duration-700 ease-out',
        getAnimationClass(),
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  )
})

AnimatedSection.displayName = 'AnimatedSection'