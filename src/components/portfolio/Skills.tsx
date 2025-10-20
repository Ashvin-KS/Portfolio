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
    <section id="skills" className="py-20 px-4">
      <AnimatedSection animation="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <AnimatedCard key={index} className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {skill.icon}
                    {skill.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, i) => (
                      <Badge key={i} variant="secondary">{item}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </div>
        <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={48}
            gap={40}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#0a0000ff"
            ariaLabel="Technology partners"
          />
        </div>
      </AnimatedSection>
    </section>
  )
}
