'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedSection } from '@/components/animated-section'
import { AnimatedCard } from '@/components/animated-card'
import SpotlightCard from '@/components/ui/SpotlightCard'
import ScrambledText from '../ScrambledText';

export function About() {
  return (
    <section id="about" className="py-20 px-4">
      <AnimatedSection animation="fade-up" className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <AnimatedSection animation="fade-left" delay={200}>

            <ScrambledText
              className="scrambled-text-demo"
              radius={50}
              style={{fontSize: '16px', lineHeight: '1.6'}}
              duration={1.2}
              speed={0.5}
              scrambleChars={'.:'}
            >
  Hey! I'm Ashvin K. S., a second-year CSE student at VIT Chennai (9.41 CGPA) passionate about blending technology and creativity. I love crafting digital experiences that are both intelligent and visually engaging.<br /><br />
  My journey started with curiosity about how tech shapes the world and grew into a love for innovation. From building web apps and exploring machine learning to creating immersive 3D worlds in Blender and Unreal Engine, I thrive on pushing boundaries and experimenting with ideas.<br /> <br />
  When I’m not coding, I’m designing in Photoshop, editing in DaVinci Resolve, or diving into new creative tools. I believe every idea—no matter how small—deserves to be built, refined, and brought to life.

            </ScrambledText>

          </AnimatedSection>
          <AnimatedSection animation="fade-right" delay={400}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "10+", label: "Projects Completed", delay: 0 },
                { value: "3", label: "Clubs Joined", delay: 100 },
                { value: "30+", label: "", delay: 200 },
                { value: "15+", label: "Skills", delay: 300 }
              ].map((stat, index) => (
                <SpotlightCard 
                  key={index} 
                  className="flex flex-col gap-6 rounded-xl border py-6 shadow-sm ease-out hover:shadow-xl hover:-translate-y-1 border-border/50 bg-background/95 backdrop-blur-sm transform transition-all duration-300 hover:scale-105"
                  data-delay={stat.delay}
                >
                  <div className="p-0">
                    <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pb-2 text-left">
                      <CardTitle className="text-2xl font-bold text-primary text-left">{stat.value}</CardTitle>
                    </div>
                    <div className="px-6">
                      <p className="text-sm text-muted-foreground text-left">{stat.label}</p>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </AnimatedSection>
    </section>
  )
}
