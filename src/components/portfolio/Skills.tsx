'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnimatedSection } from '@/components/animated-section'
import { AnimatedCard } from '@/components/animated-card'
import { LogoLoop, type LogoItem } from '@/components/LogoLoop'
import {
  SiReact,
  SiNextdotjs,
  SiUnrealengine,
  SiBlender,
  SiPython,
  SiC,
  SiCplusplus,
  SiNodedotjs,
  SiGit,
} from 'react-icons/si';

export function Skills({ skills }: { skills: { category: string; items: string[]; icon: React.ReactNode }[] }) {
  const techLogos: LogoItem[] = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiUnrealengine />, title: "Unreal Engine", href: "https://www.unrealengine.com" },
    { node: <SiBlender />, title: "Blender", href: "https://www.blender.org" },
    { node: <SiPython />, title: "Python", href: "https://www.python.org" },
    { node: <SiC />, title: "C", href: "https://en.wikipedia.org/wiki/C_(programming_language)" },
    { node: <SiCplusplus />, title: "C++", href: "https://isocpp.org" },
    { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
  ];

  return (
    <section id="skills" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-accent/5 to-background pointer-events-none" />
      <AnimatedSection animation="fade-up" className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Technical Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {skills.map((skill, index) => (
            <AnimatedCard key={index} className="h-full">
              <Card className="h-full bg-card border-0 shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {skill.icon}
                    </div>
                    {skill.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-secondary/50 hover:bg-secondary transition-colors duration-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </div>

        <div className="relative py-10">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          <LogoLoop
            logos={techLogos}
            speed={100}
            direction="left"
            logoHeight={40}
            gap={60}
            pauseOnHover
            scaleOnHover
            fadeOut={false}
            ariaLabel="Technology partners"
          />
        </div>
      </AnimatedSection>
    </section>
  )
}
