'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useToast } from '@/hooks/use-toast'
import { useTypingAnimation } from '@/hooks/use-typing-animation'
import { Navigation } from '@/components/portfolio/Navigation'
import { Hero } from '@/components/portfolio/Hero'
import { About } from '@/components/portfolio/About'
import { Projects } from '@/components/portfolio/Projects'
import { Career } from '@/components/portfolio/Career'
import { Skills } from '@/components/portfolio/Skills'
import { Creative } from '@/components/portfolio/Creative'
import { Contact } from '@/components/portfolio/Contact'
import { Footer } from '@/components/portfolio/Footer'
import Waves from '@/components/Waves'
import Galaxy from '@/components/Galaxy'
import {
  Code,
  Database,
  Server,
  Globe,
  Briefcase,
  Award,
  Building,
  GraduationCap,
  Github
} from 'lucide-react'

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const titles = [
    "Full-Stack Developer",
    "UI/UX Enthusiast", 
    "Game Dev",
    "Blenderian"
  ]
  const animatedTitle = useTypingAnimation(titles, 100, 2000)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success!",
          description: data.message,
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management and payment processing.",
      tech: ["Next.js", "TypeScript", "Prisma", "Stripe"],
      github: "https://github.com",
      demo: "https://demo.com",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates and team collaboration features.",
      tech: ["React", "Node.js", "Socket.io", "MongoDB"],
      github: "https://github.com",
      demo: "https://demo.com",
      image: "/api/placeholder/400/250"
    },
    {
      title: "AI Content Generator",
      description: "AI-powered content generation tool with multiple templates and customization options.",
      tech: ["Python", "FastAPI", "OpenAI", "React"],
      github: "https://github.com",
      demo: "https://demo.com",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Real-Time Analytics Dashboard",
      description: "Interactive dashboard for monitoring business metrics with real-time data visualization.",
      tech: ["Vue.js", "D3.js", "Express", "PostgreSQL"],
      github: "https://github.com",
      demo: "https://demo.com",
      image: "/api/placeholder/400/250"
    }
  ]

  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"], icon: <Code className="w-5 h-5" /> },
    { category: "Backend", items: ["Node.js", "Python", "Express", "FastAPI", "GraphQL"], icon: <Server className="w-5 h-5" /> },
    { category: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "MySQL"], icon: <Database className="w-5 h-5" /> },
    { category: "Tools", items: ["Git", "Docker", "AWS", "CI/CD", "Agile"], icon: <Globe className="w-5 h-5" /> }
  ]

  const blenderProjects = [
    {
      title: "Sci-Fi Environment",
      description: "A detailed sci-fi laboratory environment created with Blender, featuring advanced lighting and texturing techniques.",
      software: ["Blender", "Substance Painter", "Photoshop"],
      image: "/api/placeholder/400/300",
      type: "environment",
      featured: true,
      gallery: [
        "/api/placeholder/400/300",
        "/api/placeholder/400/300",
        "/api/placeholder/400/300"
      ]
    },
    {
      title: "Character Sculpt - Zephyr",
      description: "Original character sculpt with detailed clothing and accessories, showcasing advanced sculpting techniques.",
      software: ["Blender", "ZBrush", "Substance Painter"],
      image: "/api/placeholder/400/300",
      type: "character",
      featured: true,
      gallery: [
        "/api/placeholder/400/300",
        "/api/placeholder/400/300"
      ]
    },
    {
      title: "Product Visualization",
      description: "Photorealistic product renders for a client's marketing campaign, focusing on material accuracy and lighting.",
      software: ["Blender", "Photoshop", "Lightroom"],
      image: "/api/placeholder/400/300",
      type: "product",
      featured: false,
      gallery: [
        "/api/placeholder/400/300",
        "/api/placeholder/400/300",
        "/api/placeholder/400/300",
        "/api/placeholder/400/300"
      ]
    },
    {
      title: "Architectural Visualization",
      description: "Modern architectural visualization of a residential building complex with interior and exterior renders.",
      software: ["Blender", "SketchUp", "V-Ray"],
      image: "/api/placeholder/400/300",
      type: "architecture",
      featured: false,
      gallery: [
        "/api/placeholder/400/300",
        "/api/placeholder/400/300"
      ]
    }
  ]

  const gameDevProjects = [
    {
      title: "Neon Runner",
      description: "A fast-paced endless runner game set in a cyberpunk city with procedural level generation.",
      engine: "Unity",
      genre: "Endless Runner",
      platform: "PC, Mobile",
      role: "Solo Developer",
      image: "/api/placeholder/400/300",
      featured: true,
      technologies: ["Unity", "C#", "Procedural Generation", "Mobile Optimization"],
      demoUrl: "https://demo.com",
      githubUrl: "https://github.com",
      playStoreUrl: "https://play.google.com",
      achievements: [
        "10k+ downloads on mobile platforms",
        "4.5/5 star rating",
        "Featured in indie game showcases"
      ]
    },
    {
      title: "Crystal Quest",
      description: "A 2D puzzle-adventure game with unique mechanics and hand-drawn artwork.",
      engine: "Godot",
      genre: "Puzzle Adventure",
      platform: "PC, Switch",
      role: "Lead Developer & Designer",
      image: "/api/placeholder/400/300",
      featured: true,
      technologies: ["Godot", "GDScript", "Pixel Art", "Level Design"],
      demoUrl: "https://demo.com",
      githubUrl: "https://github.com",
      achievements: [
        "Winner of Game Jam 2023",
        "Featured in indie game blogs",
        "Positive reviews from gaming community"
      ]
    },
    {
      title: "Space Defense",
      description: "A multiplayer space strategy game with real-time combat and resource management.",
      engine: "Unreal Engine",
      genre: "Strategy",
      platform: "PC",
      role: "Network Programmer",
      image: "/api/placeholder/400/300",
      featured: false,
      technologies: ["Unreal Engine", "C++", "Networking", "Multiplayer"],
      demoUrl: "https://demo.com",
      achievements: [
        "Implemented real-time multiplayer",
        "Optimized network code for 100+ players",
        "Contributed to core gameplay systems"
      ]
    },
    {
      title: "Retro Platformer",
      description: "A nostalgic 8-bit style platformer with modern gameplay mechanics and chiptune soundtrack.",
      engine: "Unity",
      genre: "Platformer",
      platform: "PC, Console",
      role: "Game Designer & Developer",
      image: "/api/placeholder/400/300",
      featured: false,
      technologies: ["Unity", "C#", "2D Animation", "Audio Design"],
      demoUrl: "https://demo.com",
      githubUrl: "https://github.com",
      achievements: [
        "Created custom physics system",
        "Designed 50+ unique levels",
        "Composed original soundtrack"
      ]
    }
  ]

  const careerTimeline = {
  "2024": [
    {
      title: "Senior Full-Stack Developer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      date: "January 2024 - Present",
      type: "work",
      description: "Lead development of enterprise web applications using React, Node.js, and cloud technologies. Mentoring junior developers and architecting scalable solutions.",
      achievements: [
        "Led team of 5 developers to launch flagship product",
        "Improved application performance by 40%",
        "Implemented CI/CD pipeline reducing deployment time by 60%"
      ],
      icon: <Briefcase className="w-5 h-5" />,
      color: "bg-blue-500"
    },
    {
      title: "Open Source Contributor",
      company: "React Community",
      location: "Remote",
      date: "March 2024",
      type: "project",
      description: "Contributed to popular React libraries and helped improve documentation for the community.",
      achievements: [
        "Merged 15+ PRs to major React libraries",
        "Improved documentation for 3 popular packages",
        "Active participant in React community discussions"
      ],
      icon: <Github className="w-5 h-5" />,
      color: "bg-purple-500"
    }
  ],
  "2023": [
    {
      title: "Tech Lead - E-Commerce Platform",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      date: "June 2023 - December 2023",
      type: "work",
      description: "Led the development of a new e-commerce platform serving 100k+ users.",
      achievements: [
        "Architected microservices architecture",
        "Implemented real-time inventory management",
        "Reduced checkout time by 50%"
      ],
      icon: <Briefcase className="w-5 h-5" />,
      color: "bg-blue-500"
    },
    {
      title: "AWS Certification",
      company: "Amazon Web Services",
      location: "Online",
      date: "September 2023",
      type: "certification",
      description: "Achieved AWS Solutions Architect Professional certification.",
      achievements: [
        "Designed scalable cloud architecture",
        "Implemented security best practices",
        "Optimized costs for cloud infrastructure"
      ],
      icon: <Award className="w-5 h-5" />,
      color: "bg-yellow-500"
    }
  ],
  "2022": [
    {
      title: "Full-Stack Developer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      date: "January 2022 - May 2023",
      type: "work",
      description: "Developed and maintained multiple client projects using modern JavaScript frameworks.",
      achievements: [
        "Built 10+ client websites and applications",
        "Reduced page load times by 35%",
        "Integrated third-party APIs and payment systems"
      ],
      icon: <Briefcase className="w-5 h-5" />,
      color: "bg-blue-500"
    },
    {
      title: "React Conference Speaker",
      company: "React Summit 2022",
      location: "Amsterdam, Netherlands",
      date: "October 2022",
      type: "speaking",
      description: "Spoke about performance optimization in React applications at international conference.",
      achievements: [
        "Presented to 500+ developers",
        "Received 4.8/5 rating from attendees",
        "Published accompanying blog post with 10k+ views"
      ],
      icon: <Globe className="w-5 h-5" />,
      color: "bg-green-500"
    }
  ],
  "2021": [
    {
      title: "Full-Stack Developer",
      company: "Digital Solutions Ltd.",
      location: "New York, NY",
      date: "March 2021 - December 2021",
      type: "work",
      description: "Developed and maintained multiple client projects using modern JavaScript frameworks.",
      achievements: [
        "Built 15+ client websites and applications",
        "Reduced page load times by 35%",
        "Integrated third-party APIs and payment systems"
      ],
      icon: <Building className="w-5 h-5" />,
      color: "bg-green-500"
    },
    {
      title: "Tech Blog Writer",
      company: "Medium",
      location: "Online",
      date: "July 2021 - Present",
      type: "writing",
      description: "Write technical articles about web development, React, and modern JavaScript.",
      achievements: [
        "Published 25+ technical articles",
        "50k+ total readers",
        "Featured in JavaScript Weekly"
      ],
      icon: <Code className="w-5 h-5" />,
      color: "bg-orange-500"
    }
  ],
  "2020": [
    {
      title: "Frontend Developer",
      company: "StartUp Hub",
      location: "Austin, TX",
      date: "January 2020 - February 2021",
      type: "work",
      description: "Focused on creating responsive and interactive user interfaces.",
      achievements: [
        "Developed component library used across 3 products",
        "Improved user engagement by 25%",
        "Collaborated with UX team on design system"
      ],
      icon: <Code className="w-5 h-5" />,
      color: "bg-purple-500"
    },
    {
      title: "Hackathon Winner",
      company: "HackMIT 2020",
      location: "Boston, MA",
      date: "September 2020",
      type: "achievement",
      description: "Won first place in a 48-hour hackathon with an AI-powered learning platform.",
      achievements: [
        "Built MVP in 48 hours",
        "Won $10k prize",
        "Received interest from 3 VCs"
      ],
      icon: <Award className="w-5 h-5" />,
      color: "bg-yellow-500"
    }
  ],
  "2019": [
    {
      title: "Software Engineering Intern",
      company: "Tech Corp",
      location: "Seattle, WA",
      date: "June 2019 - August 2019",
      type: "work",
      description: "Summer internship working on frontend development for enterprise applications.",
      achievements: [
        "Developed 3 major features",
        "Received full-time offer",
        "Mentored 2 junior interns"
      ],
      icon: <Briefcase className="w-5 h-5" />,
      color: "bg-blue-500"
    },
    {
      title: "Bachelor of Computer Science",
      company: "University of Technology",
      location: "Boston, MA",
      date: "September 2015 - May 2019",
      type: "education",
      description: "Graduated Magna Cum Laude with focus on Software Engineering and Web Development.",
      achievements: [
        "GPA: 3.8/4.0",
        "Dean's List all semesters",
        "Won 3 hackathons",
        "Teaching Assistant for Web Development course"
      ],
      icon: <GraduationCap className="w-5 h-5" />,
      color: "bg-orange-500"
    }
  ],
  "2018": [
    {
      title: "Web Development Club President",
      company: "University of Technology",
      location: "Boston, MA",
      date: "September 2018 - May 2019",
      type: "leadership",
      description: "Led a club of 50+ students focused on web development and technologies.",
      achievements: [
        "Organized 10+ workshops",
        "Grew club membership by 200%",
        "Partnered with 5 local companies"
      ],
      icon: <Globe className="w-5 h-5" />,
      color: "bg-green-500"
    },
    {
      title: "Teaching Assistant",
      company: "University of Technology",
      location: "Boston, MA",
      date: "January 2018 - May 2018",
      type: "education",
      description: "TA for Introduction to Web Development course.",
      achievements: [
        "Taught 30+ students",
        "Held weekly office hours",
        "Created course materials"
      ],
      icon: <GraduationCap className="w-5 h-5" />,
      color: "bg-orange-500"
    }
  ],
  "2017": [
    {
      title: "First Hackathon",
      company: "BostonHacks",
      location: "Boston, MA",
      date: "October 2017",
      type: "achievement",
      description: "Participated in first hackathon and built a real-time collaboration tool.",
      achievements: [
        "Built MVP in 24 hours",
        "Learned React and Node.js",
        "Met future co-founders"
      ],
      icon: <Award className="w-5 h-5" />,
      color: "bg-yellow-500"
    },
    {
      title: "Computer Science Tutor",
      company: "University Learning Center",
      location: "Boston, MA",
      date: "September 2017 - May 2018",
      type: "work",
      description: "Tutored students in computer science fundamentals and programming.",
      achievements: [
        "Tutored 20+ students",
        "Improved student grades by 15%",
        "Developed tutoring materials"
      ],
      icon: <GraduationCap className="w-5 h-5" />,
      color: "bg-orange-500"
    }
  ]
}

  return (
    <div className="min-h-screen bg-background text-foreground">
      { <Waves
        lineColor="#1c6872ff"
        backgroundColor="rgba(0, 0, 0, 0.2)"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.}
        tension={0.01}
        maxCursorMove={20}
        xGap={12}
        yGap={36}
      /> }
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
    </div>
  )
}
