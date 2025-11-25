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
    <section id="projects" className="py-24 px-4 bg-accent/20 relative">
      <div className="absolute inset-0 bg-grid-black/[0.05] dark:bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none" />
      <AnimatedSection animation="fade-up" className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of my recent work, ranging from web applications to AI experiments.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <AnimatedSection
              key={index}
              animation="fade-up"
              delay={index * 100}
            >
              <AnimatedCard className="h-full group overflow-hidden neo-card-lg neo-card-lg-hover">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-background/10 text-white hover:bg-background hover:text-foreground transition-all duration-300 transform hover:scale-110"
                        aria-label="View Source"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-background/10 text-white hover:bg-background hover:text-foreground transition-all duration-300 transform hover:scale-110"
                        aria-label="View Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow md:w-3/5">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-3">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-0 mt-auto pt-4 border-t border-border/50">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="bg-secondary/50 hover:bg-secondary transition-colors duration-300 text-xs"
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
      </AnimatedSection>
    </section>
  )
}
