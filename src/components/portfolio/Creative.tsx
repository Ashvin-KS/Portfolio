'use client'

import { Badge } from '@/components/ui/badge'
import { AnimatedSection } from '@/components/animated-section'
import { AnimatedCard } from '@/components/animated-card'
import { Github, Play, Calendar, Briefcase, Gamepad2, Palette as BlenderIcon } from 'lucide-react'

interface BlenderProject {
  title: string;
  description: string;
  software: string[];
  image: string;
  type: string;
  featured: boolean;
  gallery: string[];
  demo?: string;
  features?: string[];
  polyCount?: string;
  renderTime?: string;
}

interface GameDevProject {
  title: string;
  description: string;
  engine: string;
  genre: string;
  platform: string;
  role: string;
  image: string;
  featured: boolean;
  technologies: string[];
  demoUrl: string;
  githubUrl?: string;
  playStoreUrl?: string;
  achievements: string[];
  downloadLink?: string;
  githubLink?: string;
  status?: string;
  platforms?: string[];
  features?: string[];
  developmentTime?: string;
}

interface CreativeProps {
  blenderProjects: BlenderProject[];
  gameDevProjects: GameDevProject[];
}

export function Creative({ blenderProjects, gameDevProjects }: CreativeProps) {
  return (
    <section id="others" className="py-24 px-4 bg-accent/20 relative">
      <div className="absolute inset-0 bg-grid-black/[0.05] dark:bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none" />
      <AnimatedSection animation="fade-up" className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Creative Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Exploring the intersection of technology and art through game development and 3D design.
          </p>
        </div>

        {/* Game Development Projects */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
              <Gamepad2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold">Game Development</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {gameDevProjects.map((project, index) => (
              <AnimatedSection
                key={index}
                animation="scale-up"
                delay={index * 150}
              >
                <AnimatedCard className="h-full overflow-hidden group border-muted/40 hover:border-purple-500/50 transition-colors duration-500">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                      {project.downloadLink && (
                        <a
                          href={project.downloadLink}
                          className="bg-primary text-primary-foreground px-6 py-3 rounded-full flex items-center gap-2 hover:bg-primary/90 transition-transform hover:scale-105"
                        >
                          <Play className="w-5 h-5" />
                          Play Now
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          className="bg-background/80 text-foreground px-6 py-3 rounded-full flex items-center gap-2 hover:bg-background transition-transform hover:scale-105"
                        >
                          <Github className="w-5 h-5" />
                          Source
                        </a>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant={project.status === 'Published' ? 'default' :
                          project.status === 'In Development' ? 'secondary' :
                            project.status === 'Early Access' ? 'outline' : 'destructive'}
                        className="text-xs shadow-lg backdrop-blur-md bg-background/50"
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-2xl font-bold mb-2 group-hover:text-purple-500 transition-colors">{project.title}</h4>
                        <p className="text-muted-foreground line-clamp-2">{project.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <h5 className="font-semibold text-sm mb-3 text-purple-400">Engine & Genre</h5>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20">{project.engine}</Badge>
                          <Badge variant="outline">{project.genre}</Badge>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm mb-3 text-purple-400">Platforms</h5>
                        <div className="flex flex-wrap gap-2">
                          {(project.platforms || []).map((platform, idx) => (
                            <Badge key={idx} variant="outline">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h5 className="font-semibold text-sm mb-3 text-purple-400">Key Features</h5>
                      <div className="flex flex-wrap gap-2">
                        {(project.features || []).map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-secondary/50">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between text-sm text-muted-foreground pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{project.role}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{project.developmentTime}</span>
                      </div>
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
