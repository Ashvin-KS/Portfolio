'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatedSection } from '@/components/animated-section'
import { AnimatedCard } from '@/components/animated-card'
import { Badge } from '@/components/ui/badge'
import { Building, Calendar, MapPin } from 'lucide-react'

export interface TimelineEvent {
  title: string
  company: string
  location: string
  date: string
  type: 'work' | 'education' | 'certification' | 'project' | 'speaking' | 'writing' | 'leadership' | 'achievement' | 'learning' | 'hobby'
  description: string
  achievements: string[]
  icon: React.ReactNode
  color: string // Tailwind CSS color class (e.g., 'bg-blue-500')
}

interface DateTimelineProps {
  items: Record<string, TimelineEvent[]>
}

export function DateTimeline({ items }: DateTimelineProps) {
  const [activeEventColor, setActiveEventColor] = useState('from-primary via-primary/50')
  const eventRefs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const eventId = entry.target.id
            const [year, eventIndexStr] = eventId.split('-')
            const eventIndex = parseInt(eventIndexStr)
            const event = items[year]?.[eventIndex]
            if (event) {
              // Extract the base color class, e.g., 'bg-blue-500' -> 'blue-500'
              const baseColor = event.color.replace('bg-', '')
              setActiveEventColor(`from-${baseColor} via-${baseColor}/50`)
            }
          }
        })
      },
      { threshold: 0.5 } // Trigger when 50% of the item is visible
    )

    eventRefs.current.forEach((ref) => observer.observe(ref))

    return () => {
      eventRefs.current.forEach((ref) => observer.unobserve(ref))
    }
  }, [items])

  const setEventRef = (year: string, index: number) => (element: HTMLDivElement | null) => {
    if (element) {
      eventRefs.current.set(`${year}-${index}`, element)
    } else {
      eventRefs.current.delete(`${year}-${index}`)
    }
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className={`absolute left-8 sm:left-24 md:left-32 top-0 bottom-0 w-0.5 bg-gradient-to-b ${activeEventColor} to-transparent transition-colors duration-500`}></div>

      <div className="space-y-8">
        {Object.entries(items)
          .sort(([yearA], [yearB]) => parseInt(yearA) - parseInt(yearB))
          .map(([year, events], yearIndex) => (
            <AnimatedSection
              key={year}
              animation="fade-up"
              delay={yearIndex * 100}
            >
              <div className="relative">
                {/* Year marker */}
                <div className="absolute left-0 sm:left-16 md:left-24 top-0 z-10">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-black font-bold text-lg shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-6">
                    {year}
                  </div>
                  <div className="absolute inset-0 w-16 h-16 bg-blue-500/20 rounded-full animate-pulse"></div>
                </div>

                {/* Events for this year */}
                <div className="ml-20 sm:ml-32 md:ml-44 space-y-4">
                  {events.map((event, eventIndex) => (
                    <AnimatedCard
                      key={`${year}-${eventIndex}`}
                      ref={setEventRef(year, eventIndex)}
                      className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-white/5 backdrop-blur-md border border-white/10"
                    >
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 ${event.color} rounded-lg flex items-center justify-center text-white flex-shrink-0 transform transition-all duration-300 hover:scale-110 hover:rotate-6`}>
                            {event.icon}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-bold text-primary">{event.title}</h3>
                              <Badge variant="outline" className="text-xs">
                                {event.type === 'work' ? 'Work' :
                                  event.type === 'education' ? 'Education' :
                                    event.type === 'certification' ? 'Certification' :
                                      event.type === 'project' ? 'Project' :
                                        event.type === 'speaking' ? 'Speaking' :
                                          event.type === 'writing' ? 'Writing' :
                                            event.type === 'leadership' ? 'Leadership' :
                                              event.type === 'achievement' ? 'Achievement' :
                                                event.type === 'learning' ? 'Learning' :
                                                  event.type === 'hobby' ? 'Hobby' : 'Other'}
                              </Badge>
                            </div>

                            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                              <Building className="w-4 h-4" />
                              <span className="font-medium">{event.company}</span>
                              <span className="text-sm">•</span>
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{event.location}</span>
                            </div>

                            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                              <Calendar className="w-4 h-4" />
                              <span>{event.date}</span>
                            </div>

                            <p className="text-muted-foreground mb-3">{event.description}</p>

                            {event.achievements.length > 0 && (
                              <div>
                                <h4 className="font-semibold mb-2 text-sm">Key Achievements:</h4>
                                <ul className="space-y-1">
                                  {event.achievements.map((achievement, achIndex) => (
                                    <li key={achIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                                      <span>{achievement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </AnimatedCard>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
      </div>
    </div>
  )
}
