"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Zap } from "lucide-react"

export default function SampleProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const projects = [
    {
      title: "West Virginia Processing Plant",
      location: "Charleston, WV, USA",
      year: "2024",
      capacity: "2.5M tons/year",
      description:
        "Complete turn-key coal processing facility featuring advanced separation technology and environmental controls.",
      image: "/placeholder.svg?height=300&width=500&text=WV+Processing+Plant",
      highlights: [
        "Advanced dense medium separation",
        "Automated quality control systems",
        "40% water consumption reduction",
        "Zero liquid discharge system",
      ],
    },
    {
      title: "Queensland Coal Preparation Plant",
      location: "Queensland, Australia",
      year: "2023",
      capacity: "3.2M tons/year",
      description: "Major upgrade and expansion of existing coal preparation facility with state-of-the-art equipment.",
      image: "/placeholder.svg?height=300&width=500&text=Queensland+Plant",
      highlights: [
        "Spiral separator installation",
        "New screening systems",
        "Improved product quality",
        "25% efficiency increase",
      ],
    },
    {
      title: "Johannesburg Processing Complex",
      location: "Johannesburg, South Africa",
      year: "2023",
      capacity: "1.8M tons/year",
      description: "New coal processing complex serving multiple mining operations in the region.",
      image: "/placeholder.svg?height=300&width=500&text=Johannesburg+Complex",
      highlights: [
        "Multi-feed processing capability",
        "Centralized control systems",
        "Modular plant design",
        "Rapid deployment construction",
      ],
    },
    {
      title: "Pennsylvania Plant Modernization",
      location: "Pittsburgh, PA, USA",
      year: "2022",
      capacity: "1.5M tons/year",
      description: "Complete modernization of legacy coal processing facility with cutting-edge technology.",
      image: "/placeholder.svg?height=300&width=500&text=Pennsylvania+Plant",
      highlights: [
        "Legacy system upgrade",
        "New flotation circuits",
        "Digital monitoring systems",
        "Environmental compliance",
      ],
    },
    {
      title: "Indonesian Coal Processing Hub",
      location: "Kalimantan, Indonesia",
      year: "2022",
      capacity: "4.0M tons/year",
      description: "Large-scale coal processing hub designed to serve multiple mining concessions.",
      image: "/placeholder.svg?height=300&width=500&text=Indonesian+Hub",
      highlights: [
        "High-capacity processing",
        "Multi-product capability",
        "Advanced logistics integration",
        "Sustainable design principles",
      ],
    },
    {
      title: "Colombian Export Facility",
      location: "Cesar, Colombia",
      year: "2021",
      capacity: "2.8M tons/year",
      description: "Export-focused coal processing facility with port connectivity and quality optimization.",
      image: "/placeholder.svg?height=300&width=500&text=Colombian+Facility",
      highlights: [
        "Export quality optimization",
        "Port integration systems",
        "Blending capabilities",
        "Quality assurance protocols",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/project-background.jpg')`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Sample <span className="text-orange-500">Projects</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Explore our portfolio of successful coal processing projects delivered across the globe, showcasing our
            expertise and innovation.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each project represents our commitment to delivering innovative, efficient, and sustainable coal
              processing solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 group overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.year}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>

                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{project.location}</span>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <Zap className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{project.capacity}</span>
                  </div>

                  <p className="text-gray-600 mb-6">{project.description}</p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="flex items-center text-sm text-gray-700">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">View Project Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Project Statistics</h2>
            <p className="text-xl text-gray-600">Our track record speaks for itself</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">25</div>
              <div className="text-gray-600 font-medium">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">50M+</div>
              <div className="text-gray-600 font-medium">Tons Processed Annually</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">99%</div>
              <div className="text-gray-600 font-medium">On-Time Delivery</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
