'use client'

import { ReactNode, forwardRef, ElementRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export const AnimatedCard = forwardRef<ElementRef<typeof Card>, AnimatedCardProps>(
  ({ children, className, hover = true }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          'transition-all duration-300 ease-out',
          hover && 'hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]',
          'border-border/50 bg-background/95 backdrop-blur-sm',
          className
        )}
      >
        <CardContent className="p-0">
          {children}
        </CardContent>
      </Card>
    )
  }
)

AnimatedCard.displayName = 'AnimatedCard'