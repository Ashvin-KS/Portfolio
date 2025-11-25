'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AnimatedSection } from '@/components/animated-section'
import { AnimatedCard } from '@/components/animated-card'
import { Github, Linkedin, Mail } from 'lucide-react'

interface FormData {
  name: string
  email: string
  message: string
}

interface ContactProps {
  formData: FormData
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
}

export function Contact({
  formData,
  handleInputChange,
  handleSubmit,
  isSubmitting
}: ContactProps) {
  return (
    <section id="contact" className="py-24 px-4 bg-accent/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background pointer-events-none" />
      <AnimatedSection animation="fade-up" className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <AnimatedSection animation="fade-left" delay={200}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm currently available for freelance work and open to full-time opportunities.
                  If you have a project that needs some creative touch, let's discuss how we can work together.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", text: "ashvinksg@gmail.com", href: "mailto:ashvinksg@gmail.com" },
                  { icon: Github, label: "GitHub", text: "github.com/Ashvin-KS", href: "https://github.com/Ashvin-KS/" },
                  { icon: Linkedin, label: "LinkedIn", text: "linkedin.com/in/ashvin-k-s", href: "https://www.linkedin.com/in/ashvin-k-s-464a10303" }
                ].map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-accent/50 transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                      <contact.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{contact.label}</p>
                      <p className="font-medium group-hover:text-primary transition-colors">{contact.text}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-right" delay={400}>
            <AnimatedCard className="border-muted/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Input
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Your Message"
                      rows={6}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 text-lg font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </AnimatedCard>
          </AnimatedSection>
        </div>
      </AnimatedSection>
    </section>
  )
}
