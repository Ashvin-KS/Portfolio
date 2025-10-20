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
    <section id="others" className="py-20 px-4 bg-accent/20">
      <AnimatedSection animation="fade-up" className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Creative Projects</h2>
        
{/* Blender Projects commented out */}

        {/* Game Development Projects */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">Game Development Projects</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {gameDevProjects.map((project, index) => (
              <AnimatedSection 
                key={index} 
                animation="scale-up" 
                delay={index * 150}
              >
                <AnimatedCard className="overflow-hidden group">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.downloadLink && (
                          <a 
                            href={project.downloadLink}
                            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/80"
                          >
                            <Play className="w-4 h-4" />
                            Play Now
                          </a>
                        )}
                        {project.githubLink && (
                          <a 
                            href={project.githubLink}
                            className="bg-background/80 text-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-background"
                          >
                            <Github className="w-4 h-4" />
                            Source Code
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge 
                        variant={project.status === 'Published' ? 'default' : 
                                project.status === 'In Development' ? 'secondary' : 
                                project.status === 'Early Access' ? 'outline' : 'destructive'}
                        className="text-xs"
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Engine & Genre:</h5>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">{project.engine}</Badge>
                          <Badge variant="outline" className="text-xs">{project.genre}</Badge>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Platforms:</h5>
                        <div className="flex flex-wrap gap-1">
                          {(project.platforms || []).map((platform, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h5 className="font-semibold text-sm mb-2">Key Features:</h5>
                      <div className="flex flex-wrap gap-1">
                        {(project.features || []).map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{project.role}</span>
                      </div>
                      <div className="flex items-center gap-1">
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
