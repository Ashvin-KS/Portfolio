'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnimatedSection } from '@/components/animated-section'
import { AnimatedCard } from '@/components/animated-card'
import { Github, ExternalLink } from 'lucide-react'

interface Project {
  title: string
  description: string
  tech: string[]
  github: string
  demo: string
  image: string
}

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-20 px-4 bg-accent/20">
      <AnimatedSection animation="fade-up" className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Projects</h2>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            {projects.slice(0, 2).map((project, index) => (
              <AnimatedSection 
                key={index} 
                animation="slide-up" 
                delay={index * 200}
              >
                <AnimatedCard className="overflow-hidden group">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 aspect-video md:aspect-square bg-muted relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="flex items-center justify-between">
                          {project.title}
                          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <a 
                              href={project.github} 
                              className="p-2 rounded-md hover:bg-accent transition-all duration-300 transform hover:scale-110"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                            <a 
                              href={project.demo} 
                              className="p-2 rounded-md hover:bg-accent transition-all duration-300 transform hover:scale-110"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, techIndex) => (
                            <Badge 
                              key={techIndex} 
                              variant="secondary"
                              className="transform transition-all duration-300 hover:scale-105 hover:shadow-md"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </AnimatedCard>
              </AnimatedSection>
            ))}
          </div>
          <div className="space-y-8">
            {projects.slice(2).map((project, index) => (
              <AnimatedSection 
                key={index + 2} 
                animation="slide-up" 
                delay={(index + 2) * 200}
              >
                <AnimatedCard className="overflow-hidden group">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 aspect-video md:aspect-square bg-muted relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="flex items-center justify-between">
                          {project.title}
                          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <a 
                              href={project.github} 
                              className="p-2 rounded-md hover:bg-accent transition-all duration-300 transform hover:scale-110"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                            <a 
                              href={project.demo} 
                              className="p-2 rounded-md hover:bg-accent transition-all duration-300 transform hover:scale-110"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, techIndex) => (
                            <Badge 
                              key={techIndex} 
                              variant="secondary"
                              className="transform transition-all duration-300 hover:scale-105 hover:shadow-md"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </AnimatedCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
