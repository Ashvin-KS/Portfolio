'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useToast } from '@/hooks/use-toast'
import { useTypingAnimation } from '@/hooks/use-typing-animation'
import { Navigation } from '@/components/portfolio/Navigation'
import { Hero } from '@/components/portfolio/Hero'
import { About } from '@/components/portfolio/About'
import { Projects } from '@/components/portfolio/Projects'
import { Career, CareerTimeline } from '@/components/portfolio/Career'
import { Skills } from '@/components/portfolio/Skills'
import { Creative } from '@/components/portfolio/Creative'
import { Contact } from '@/components/portfolio/Contact'
import { Footer } from '@/components/portfolio/Footer'
import Waves from '@/components/Waves'
import { CatCursor } from '@/components/CatCursor'
import { GoToTopButton } from '@/components/GoToTopButton'
// import Galaxy from '@/components/Galaxy'

import {
  titles,
  projects,
  skills,
  blenderProjects,
  gameDevProjects,
  careerTimeline
} from '@/data/portfolio-data'

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const animatedTitle = useTypingAnimation(titles, 100, 2000)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    })

    setFormData({ name: '', email: '', message: '' })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground" suppressHydrationWarning>
      {mounted && <Waves
        lineColor={theme === 'dark' ? "#1c6872ff" : "#dc2626"}
        backgroundColor={theme === 'dark' ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.1)"}
        cursorColor={theme === 'dark' ? "#160000" : "#dc2626"}
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.925}
        tension={0.01}
        maxCursorMove={20}
        xGap={12}
        yGap={36}
      />}
      <div className="absolute top-0 left-0 w-full h-full">
        {/*<Galaxy
        saturation={1}/>*/}

      </div>
      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        mounted={mounted}
        theme={theme}
        setTheme={setTheme}
        scrollToSection={scrollToSection}
      />
      {mounted && <CatCursor />}

      {/* Add hover zones for cat cursor */}
      <style jsx global>{`
        .cat-hover-zone {
          position: relative;
        }
        
        .cat-hover-zone:hover::before {
          content: '🐱';
          position: absolute;
          top: -20px;
          left: -20px;
          font-size: 12px;
          z-index: 1000;
          animation: bounce 1s infinite;
        }
      `}</style>
      <Hero animatedTitle={animatedTitle} scrollToSection={scrollToSection} />
      <About />
      <Projects projects={projects} />
      <Career careerTimeline={careerTimeline} />
      <Skills skills={skills} />
      <Creative blenderProjects={blenderProjects} gameDevProjects={gameDevProjects} />
      <Contact
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      <Footer />
      <GoToTopButton />
    </div>
  )
}
