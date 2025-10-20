'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/animated-section'
import { Github, Linkedin, Mail } from 'lucide-react'
import  ASCIIText  from '@/components/ASCIIText'

interface HeroProps {
  animatedTitle: string
  scrollToSection: (sectionId: string) => void
}

export function Hero({ animatedTitle, scrollToSection }: HeroProps) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
      <AnimatedSection animation="fade-up" className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="relative inline-block mb-6">
            <Avatar className="w-32 h-32 mx-auto">
              <AvatarImage src="/api/placeholder/128/128" alt="Profile" />
              <AvatarFallback className="text-2xl">AK</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
          </div>
          <div className="relative h-80 w-250 flex items-center justify-center">
            <ASCIIText text="Ashvin K S" enableWaves={true} textFontSize={300} asciiFontSize={12} />
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 h-8">
            <span className="inline-block">{animatedTitle}</span>
            <span className="animate-pulse">|</span>
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            A curious creator exploring the blend of tech and art — from web development and machine learning to 3D worlds in Blender and Unreal Engine. I love turning ideas into experiences, mixing creativity with code, and bringing imagination to life through tools like Photoshop and DaVinci Resolve.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            onClick={() => scrollToSection('projects')} 
            size="lg" 
            className="text-lg px-8 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            View My Work
          </Button>
          <Button 
            onClick={() => scrollToSection('contact')} 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Get In Touch
          </Button>
        </div>

        <div className="flex justify-center space-x-4">
          {[
            { href: "https://github.com/Ashvin-KS/", icon: Github },
            { href: "https://www.linkedin.com/in/ashvin-k-s-464a10303/", icon: Linkedin },
            { href: "mailto:ashvinksg@gmail.com", icon: Mail }
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              className="p-3 rounded-full bg-accent hover:bg-accent/80 transition-all duration-300 transform hover:scale-110 hover:rotate-6"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <social.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </AnimatedSection>
    </section>
  )
}

