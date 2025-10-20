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
    <section id="contact" className="py-20 px-4 bg-accent/20">
      <AnimatedSection animation="fade-up" className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Get In Touch</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection animation="fade-left" delay={200}>
            <h3 className="text-xl font-semibold mb-4">Let's Connect</h3>
            <p className="text-muted-foreground mb-6">
              I'm always interested in hearing about new projects and opportunities. 
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>
            <div className="space-y-4">
              {[
                { icon: Mail, text: "ashvinksg@gmail.com " },
                { icon: Github, text: "https://github.com/Ashvin-KS/" },
                { icon: Linkedin, text: "https://www.linkedin.com/in/ashvin-k-s-464a10303" }
              ].map((contact, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background/50 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <contact.icon className="w-5 h-5 text-primary" />
                  <span>{contact.text}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-right" delay={400}>
            <AnimatedCard>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input 
                    placeholder="Your Name" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="transform transition-all duration-300 focus:scale-[1.02]"
                  />
                  <Input 
                    type="email" 
                    placeholder="Your Email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="transform transition-all duration-300 focus:scale-[1.02]"
                  />
                  <Textarea 
                    placeholder="Your Message" 
                    rows={4} 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="transform transition-all duration-300 focus:scale-[1.02]"
                  />
                  <Button 
                    type="submit" 
                    className="w-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg" 
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
