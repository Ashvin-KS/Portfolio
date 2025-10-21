'use client'

import { AnimatedSection } from '@/components/animated-section'
import { AnimatedCard } from '@/components/animated-card'
import { Badge } from '@/components/ui/badge'
import { Building, Calendar, MapPin } from 'lucide-react'

export interface TimelineEvent {
  title: string
  company: string
  location: string
  date: string
  type: 'work' | 'education' | 'certification' | 'project' | 'speaking' | 'writing' | 'leadership' | 'achievement'
  description: string
  achievements: string[]
  icon: React.ReactNode
  color: string
}

interface DateTimelineProps {
  items: Record<string, TimelineEvent[]>
}

export function DateTimeline({ items }: DateTimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-24 md:left-32 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>
      
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
                <div className="absolute left-16 md:left-24 top-0 z-10">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-6">
                    {year}
                  </div>
                  <div className="absolute inset-0 w-16 h-16 bg-primary/20 rounded-full animate-pulse"></div>
                </div>
                
                {/* Events for this year */}
                <div className="ml-32 md:ml-44 space-y-4">
                  {events.map((event, eventIndex) => (
                    <AnimatedSection 
                      key={eventIndex}
                      animation="slide-up" 
                      delay={yearIndex * 100 + eventIndex * 50}
                    >
                      <AnimatedCard className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
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
                                   event.type === 'achievement' ? 'Achievement' : 'Other'}
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
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
      </div>
    </div>
  )
}
