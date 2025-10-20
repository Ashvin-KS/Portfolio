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
    <section id="career" className="py-20 px-4">
      <AnimatedSection animation="fade-up" className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Career Journey</h2>
        <DateTimeline items={careerTimeline} />
      </AnimatedSection>
    </section>
  )
}
