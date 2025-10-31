'use client'

import { Sun, Moon, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface NavigationProps {
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
  mounted: boolean
  theme: string | undefined
  setTheme: (theme: string) => void
  scrollToSection: (sectionId: string) => void
}

export function Navigation({ 
  isMenuOpen, 
  setIsMenuOpen, 
  mounted, 
  theme, 
  setTheme, 
  scrollToSection 
}: NavigationProps) {
  const [activeSection, setActiveSection] = useState('home')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [hasPassedHero, setHasPassedHero] = useState(false)
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'career', label: 'Career' },
    { id: 'skills', label: 'Skills' },
    { id: 'others', label: 'Others' },
    { id: 'contact', label: 'Contact' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      // Check if we've passed the hero section
      const heroSection = document.getElementById('home')
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        setHasPassedHero(window.scrollY > heroBottom - 100)
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (id: string) => {
    scrollToSection(id)
    setActiveSection(id)
    if (window.innerWidth < 640) {
      setIsMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full transition-all duration-900 ease-out ${
        isMenuOpen || !hasPassedHero
          ? 'w-[90vw] max-w-4xl h-auto px-4 py-4'
          : 'w-14 h-14 sm:w-16 sm:h-16 hover:scale-110'
      }`}
      onMouseEnter={hasPassedHero ? () => setIsMenuOpen(true) : undefined}
      onMouseLeave={hasPassedHero ? () => setIsMenuOpen(false) : undefined}
      role="navigation"
      aria-label="Main navigation"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {!isMenuOpen && hasPassedHero && (
          <Menu
            className="w-6 h-6 transition-transform duration-300 hover:rotate-90"
            aria-hidden="true"
          />
        )}

        {(isMenuOpen || !hasPassedHero) && (
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in duration-300">
            <div className="flex flex-wrap justify-center items-center gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                    activeSection === item.id
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                  
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  )}
                  
                  {/* Hover background */}
                  {hoveredItem === item.id && (
                    <span className="absolute inset-0 bg-accent/50 rounded-full -z-10 animate-in fade-in duration-200" />
                  )}
                </button>
              ))}
              
              {/* Theme toggle inline with nav items */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2.5 rounded-full hover:bg-accent transition-all duration-300 hover:scale-110 hover:rotate-12 group"
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 group-hover:text-yellow-500 transition-colors" />
                  ) : (
                    <Moon className="w-5 h-5 group-hover:text-blue-500 transition-colors" />
                  )}
                </button>
              )}
            </div>
            
            {hasPassedHero && (
              <div className="flex items-center gap-2 sm:hidden">
                
                {/* Close button for mobile */}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="sm:hidden p-2.5 rounded-full hover:bg-accent transition-all duration-300"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}