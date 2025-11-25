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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
    // Observer for the Hero section to toggle the menu style
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        // If hero is NOT intersecting (meaning we scrolled past it), set hasPassedHero to true
        const passed = !entry.isIntersecting;
        if (passed !== hasPassedHero) {
          setHasPassedHero(passed);
          setIsMenuOpen(!passed);
        }
      },
      { threshold: 0, rootMargin: "-100px 0px 0px 0px" } // Trigger when hero leaves the top
    );

    const heroElement = document.getElementById('home');
    if (heroElement) {
      heroObserver.observe(heroElement);
    }

    // Observer for active section highlighting
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" } // Trigger when section is in the middle of the viewport
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        sectionObserver.observe(element);
      }
    });

    return () => {
      heroObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, [hasPassedHero, setIsMenuOpen]); // Removed navItems from dependency as it's constant

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (id: string) => {
    scrollToSection(id)
    setActiveSection(id)
    setIsMobileMenuOpen(false)
  }

  const isExpanded = isMenuOpen || !hasPassedHero;

  return (
    <>
      {/* Desktop & Tablet Navigation */}
      <nav
        className={`hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full transition-all duration-900 ease-out ${isExpanded
          ? 'w-[90vw] max-w-4xl h-auto px-4 py-4'
          : 'w-16 h-16 hover:scale-110'
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
          {!isExpanded && (
            <Menu
              className="w-6 h-6 transition-transform duration-300 hover:rotate-90"
              aria-hidden="true"
            />
          )}

          {isExpanded && (
            <div className="w-full flex items-center justify-center gap-4 animate-in fade-in duration-300">
              <div className="flex flex-wrap justify-center items-center gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`relative px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${activeSection === item.id
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-foreground'
                      }`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                    suppressHydrationWarning
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                    )}
                    {hoveredItem === item.id && (
                      <span className="absolute inset-0 bg-accent/50 rounded-full -z-10 animate-in fade-in duration-200" />
                    )}
                  </button>
                ))}

                {mounted && (
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="p-2.5 rounded-full hover:bg-accent transition-all duration-300 hover:scale-110 hover:rotate-12 group"
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    suppressHydrationWarning
                  >
                    {theme === 'dark' ? (
                      <Sun className="w-5 h-5 group-hover:text-yellow-500 transition-colors" />
                    ) : (
                      <Moon className="w-5 h-5 group-hover:text-blue-500 transition-colors" />
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Navigation - Hamburger Button */}
      {/* Mobile Navigation - Hamburger Button */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 bg-background/80 backdrop-blur-md border border-border/50 shadow-lg"
          aria-label="Open menu"
          suppressHydrationWarning
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation - Full Screen Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[100] transition-all duration-500 bg-background/95 backdrop-blur-xl ${isMobileMenuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 bg-accent/10 border border-border/50 hover:bg-accent/20"
          aria-label="Close menu"
          suppressHydrationWarning
        >
          <X className="w-6 h-6" />
        </button>

        {/* Menu Items */}
        <div className="h-full flex flex-col items-center justify-center gap-6 px-8">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-3xl font-bold transition-all duration-300 transform hover:scale-110 ${activeSection === item.id
                ? 'text-primary'
                : 'text-foreground/80 hover:text-foreground'
                }`}
              suppressHydrationWarning
              style={{
                animation: isMobileMenuOpen
                  ? `slideInFromRight 0.5s ease-out ${index * 0.1}s both`
                  : 'none',
              }}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="block w-12 h-1 bg-primary rounded-full mt-2 mx-auto" />
              )}
            </button>
          ))}

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="mt-8 p-4 rounded-full hover:bg-accent transition-all duration-300 hover:scale-110 group bg-accent/10 border border-border/50"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              suppressHydrationWarning
              style={{
                animation: isMobileMenuOpen
                  ? `slideInFromRight 0.5s ease-out ${navItems.length * 0.1}s both`
                  : 'none',
              }}
            >
              {theme === 'dark' ? (
                <Sun className="w-8 h-8 group-hover:text-yellow-500 transition-colors" />
              ) : (
                <Moon className="w-8 h-8 group-hover:text-blue-500 transition-colors" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx global>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}