'use client'

import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/animated-section'
import { Github, Linkedin, Mail, Code } from 'lucide-react'
import ASCIIText from '@/components/ASCIIText'

interface HeroProps {
  animatedTitle: string
  scrollToSection: (sectionId: string) => void
}

export function Hero({ animatedTitle, scrollToSection }: HeroProps) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/10 pointer-events-none" />
      <AnimatedSection animation="fade-up" className="max-w-5xl mx-auto text-center z-10">
        <div className="mb-12 space-y-6">

          <div className="relative h-48 sm:h-64 md:h-80 w-full flex items-center justify-center mb-4 sm:mb-8">
            <ASCIIText text="Ashvin K S" enableWaves={true} textFontSize={100} asciiFontSize={5} />
          </div>

          <div className="h-12 flex items-center justify-center">
            <p className="text-xl sm:text-2xl md:text-4xl font-medium text-foreground/90">
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                {animatedTitle}
              </span>
              <span className="animate-pulse ml-1 text-primary">|</span>
            </p>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light">
            A curious creator exploring the blend of tech and art — from web development and machine learning to 3D worlds in Blender and Unreal Engine. I love turning ideas into experiences, mixing creativity with code, and bringing imagination to life.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 px-4">
          <Button
            onClick={() => scrollToSection('projects')}
            size="lg"
            className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-6 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-primary/20"
          >
            View My Work
          </Button>
          <Button
            onClick={() => scrollToSection('contact')}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-6 rounded-full backdrop-blur-sm bg-background/50 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-accent/50"
          >
            Get In Touch
          </Button>
        </div>

        <div className="flex justify-center gap-6">
          {[
            { href: "https://github.com/Ashvin-KS/", icon: Github, label: "GitHub" },
            { href: "https://www.linkedin.com/in/ashvin-k-s-464a10303/", icon: Linkedin, label: "LinkedIn" },
            { href: "mailto:ashvinksg@gmail.com", icon: Mail, label: "Email" }
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              aria-label={social.label}
              className="p-4 rounded-full bg-accent/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-primary/25"
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


