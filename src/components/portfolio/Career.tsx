'use client'

import { AnimatedSection } from '@/components/animated-section'
import { DateTimeline } from '@/components/date-timeline'

import { TimelineEvent } from '@/components/date-timeline';

export interface CareerTimeline {
  [year: string]: TimelineEvent[];
}

interface CareerProps {
  careerTimeline: CareerTimeline;
}

export function Career({ careerTimeline }: CareerProps) {
  return (
    <section id="career" className="py-24 px-4">
      <AnimatedSection animation="fade-up" className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Career Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional path and key milestones along the way.
          </p>
        </div>
        <DateTimeline items={careerTimeline} />
      </AnimatedSection>
    </section>
  )
}
