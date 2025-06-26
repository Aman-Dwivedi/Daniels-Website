"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Factory, Zap, Shield, Users, Award, Globe, Clock, Wrench } from "lucide-react"

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const features = [
    {
      icon: Factory,
      title: "Advanced Processing",
      description: "State-of-the-art coal processing facilities with cutting-edge technology",
    },
    {
      icon: Zap,
      title: "Efficient Operations",
      description: "Optimized processes that maximize yield and minimize environmental impact",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Comprehensive safety protocols ensuring the highest industry standards",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Experienced professionals dedicated to delivering exceptional results",
    },
  ]

  const values = [
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for excellence in every project, delivering superior quality and results that exceed expectations.",
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "Committed to environmentally responsible practices and sustainable coal processing solutions.",
    },
    {
      icon: Clock,
      title: "Reliability",
      description: "Dependable service and consistent delivery, building trust through decades of proven performance.",
    },
    {
      icon: Wrench,
      title: "Innovation",
      description: "Continuously advancing our technology and methods to stay at the forefront of the industry.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About The Daniels Company</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Leading the coal processing industry with innovation, expertise, and unwavering commitment to excellence
              since 1985.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 1985, The Daniels Company began as a small family-owned operation with a vision to
                revolutionize coal processing through innovative technology and unwavering commitment to quality.
              </p>
              <p className="text-gray-600 mb-4">
                Over the decades, we have grown from a local service provider to a globally recognized leader in coal
                processing solutions. Our journey has been marked by continuous innovation, strategic partnerships, and
                an unwavering dedication to our clients' success.
              </p>
              <p className="text-gray-600 mb-6">
                Today, we operate state-of-the-art facilities across multiple continents, serving some of the world's
                largest energy companies while maintaining the personal touch and attention to detail that built our
                reputation.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-orange-500">35+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500">500+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500">50+</div>
                  <div className="text-sm text-gray-600">Global Clients</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600&text=Company+History"
                alt="Company History"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Sets Us Apart</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence is reflected in every aspect of our operations, from cutting-edge technology
              to our dedicated team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide every decision we make and every relationship we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <value.icon className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experienced professionals who guide our company's vision and strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "John Daniels", role: "Chief Executive Officer", experience: "25+ years in coal processing" },
              {
                name: "Sarah Mitchell",
                role: "Chief Operations Officer",
                experience: "20+ years in industrial operations",
              },
              { name: "Michael Chen", role: "Chief Technology Officer", experience: "15+ years in mining technology" },
            ].map((leader, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{leader.name}</h3>
                  <p className="text-orange-500 font-medium mb-2">{leader.role}</p>
                  <p className="text-gray-600 text-sm">{leader.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
