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
      title: "Excellent Equipment Offering & Supplier Network",
      description: "GT series processing equipment and dependable supplier network.",
    },
    {
      icon: Users,
      title: "Experienced & Talented Team",
      description: "All principal engineers average 20+ years of experience. Team members cover the entire spectrum of coal prep engineering.",
    },
    {
      icon: Shield,
      title: "Core Design Philosophy",
      description: "Say no to \"cookie cutter designs\". Optimized and customized solutions for maximum performance.",
    },
    {
      icon: Zap,
      title: "Advanced Technologies",
      description: "Proprietary technologies for guaranteed plant performance with competitive operating cost (media, water, electricity).",
    },
    {
      icon: Globe,
      title: "Rich International Experiences",
      description: "Project experiences in Australia, Canada, China, Colombia, India, Indonesia, Kazakhstan, Mexico, Mongolia, Mozambique, Turkey, etc.",
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
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/Daniels.jpg')`,
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
            The <span className="text-orange-500">Daniels</span> Company
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Leading the coal processing industry with innovation, expertise, and unwavering commitment to excellence
            since 1956.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="pt-20 pb-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
              Founded by Herman J. Daniels and incorporated in Hazelton, Pennsylvania in 1953, The Daniels Company stands as one of the most experienced companies in the global coal preparation engineering industry. From our earliest days, we established ourselves as innovators, creating the original Daniels heavy media vessel that would become famous throughout the industry.
              </p>
              <p className="text-gray-600 mb-4">
              Our expertise has grown through decades of hands-on experience, having engineered and built coal handling and preparation plant projects across the United States. Beyond our domestic success, we have developed extensive international project experience, delivering solutions in Canada, Colombia, India, Indonesia, Kazakhstan, Turkey, Mongolia, and many other nations around the world.
              </p>
              <p className="text-gray-600 mb-6">
              From inventing the world's first Daniels heavy medium vessel to engineering coal preparation plants across the globe, our seven-decade legacy of excellence drives our unwavering commitment to serving the coal preparation industry. At The Daniels Company, we deliver Unmatched Process Solutions, one project at a time.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-orange-500">70+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500">180+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500">50+</div>
                  <div className="text-sm text-gray-600">Global Clients</div>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center">
              <img
                src="/images/founder.png"
                alt="Founder Herman J. Daniels"
                className="rounded-lg shadow-lg w-1/2 h-auto max-w-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="pt-10 pb-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 hidden md:block">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey Through Time</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seven decades of innovation, growth, and excellence in coal preparation engineering
            </p>
          </div>

          <div className="relative h-40">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-400 transform -translate-y-1/2" style={{zIndex: 1}}></div>
            
            {/* Timeline Items */}
            <div className="flex justify-between h-full px-4">
              {/* 1953 - Below */}
              <div className="relative flex flex-col items-center justify-center h-full">
                <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-md absolute" style={{zIndex: 2, top: '50%', transform: 'translateY(-50%)'}}></div>
                <div className="text-center mt-16">
                  <div className="text-sm font-bold text-gray-900">1953</div>
                  <div className="text-xs text-gray-600">Incorporated</div>
                  <div className="text-xs text-gray-500">Hazelton, PA</div>
                </div>
              </div>

              {/* 1954 - Above */}
              <div className="relative flex flex-col items-center justify-center h-full">
                <div className="text-center mb-16">
                  <div className="text-sm font-bold text-gray-900">1954</div>
                  <div className="text-xs text-gray-600">First vessel shipped</div>
                  <div className="text-xs text-gray-500">to customer</div>
                </div>
                <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-md absolute" style={{zIndex: 2, top: '50%', transform: 'translateY(-50%)'}}></div>
              </div>

              {/* 1956 - Below */}
              <div className="relative flex flex-col items-center justify-center h-full">
                <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-md absolute" style={{zIndex: 2, top: '50%', transform: 'translateY(-50%)'}}></div>
                <div className="text-center mt-16">
                  <div className="text-sm font-bold text-gray-900">1956</div>
                  <div className="text-xs text-gray-600">Relocated to</div>
                  <div className="text-xs text-gray-500">Bluefield, WV</div>
                </div>
              </div>

              {/* 1984 - Above */}
              <div className="relative flex flex-col items-center justify-center h-full">
                <div className="text-center mb-16">
                  <div className="text-sm font-bold text-gray-900">1984</div>
                  <div className="text-xs text-gray-600">Acquired Envirotech</div>
                  <div className="text-xs text-gray-500">Coal Services</div>
                </div>
                <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-md absolute" style={{zIndex: 2, top: '50%', transform: 'translateY(-50%)'}}></div>
              </div>

              {/* 1987 - Below */}
              <div className="relative flex flex-col items-center justify-center h-full">
                <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-md absolute" style={{zIndex: 2, top: '50%', transform: 'translateY(-50%)'}}></div>
                <div className="text-center mt-16">
                  <div className="text-sm font-bold text-gray-900">1987</div>
                  <div className="text-xs text-gray-600">4 vessels to</div>
                  <div className="text-xs text-gray-500">An Tai Bao, China</div>
                </div>
              </div>

              {/* 2004 - Above */}
              <div className="relative flex flex-col items-center justify-center h-full">
                <div className="text-center mb-16">
                  <div className="text-sm font-bold text-gray-900">2004</div>
                  <div className="text-xs text-gray-600">1,200 TPH plant</div>
                  <div className="text-xs text-gray-500">Edison, Canada</div>
                </div>
                <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-md absolute" style={{zIndex: 2, top: '50%', transform: 'translateY(-50%)'}}></div>
              </div>

              {/* 2009 - Below */}
              <div className="relative flex flex-col items-center justify-center h-full">
                <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-md absolute" style={{zIndex: 2, top: '50%', transform: 'translateY(-50%)'}}></div>
                <div className="text-center mt-16">
                  <div className="text-sm font-bold text-gray-900">2009</div>
                  <div className="text-xs text-gray-600">Best Design</div>
                  <div className="text-xs text-gray-500">Award by CPSA</div>
                </div>
              </div>

              {/* 2010 - Above */}
              <div className="relative flex flex-col items-center justify-center h-full">
                <div className="text-center mb-16">
                  <div className="text-sm font-bold text-gray-900">2010</div>
                  <div className="text-xs text-gray-600">First project</div>
                  <div className="text-xs text-gray-500">South America</div>
                </div>
                <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-md absolute" style={{zIndex: 2, top: '50%', transform: 'translateY(-50%)'}}></div>
              </div>

              {/* 2012 - Below */}
              <div className="relative flex flex-col items-center justify-center h-full">
                <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-md absolute" style={{zIndex: 2, top: '50%', transform: 'translateY(-50%)'}}></div>
                <div className="text-center mt-16">
                  <div className="text-sm font-bold text-gray-900">2012</div>
                  <div className="text-xs text-gray-600">Member of</div>
                  <div className="text-xs text-gray-500">GT Global</div>
                </div>
              </div>

              {/* 2017 - Above */}
              <div className="relative flex flex-col items-center justify-center h-full">
                <div className="text-center mb-16">
                  <div className="text-sm font-bold text-gray-900">2017</div>
                  <div className="text-xs text-gray-600">Indian office</div>
                  <div className="text-xs text-gray-500">Gurgaon, India</div>
                </div>
                <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-md absolute" style={{zIndex: 2, top: '50%', transform: 'translateY(-50%)'}}></div>
              </div>

              {/* 2020 - Below */}
              <div className="relative flex flex-col items-center justify-center h-full">
                <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-md absolute" style={{zIndex: 2, top: '50%', transform: 'translateY(-50%)'}}></div>
                <div className="text-center mt-16">
                  <div className="text-sm font-bold text-gray-900">2020</div>
                  <div className="text-xs text-gray-600">First project</div>
                  <div className="text-xs text-gray-500">Turkey</div>
                </div>
              </div>

              {/* 2021 - Above */}
              <div className="relative flex flex-col items-center justify-center h-full">
                <div className="text-center mb-16">
                  <div className="text-sm font-bold text-gray-900">2021</div>
                  <div className="text-xs text-gray-600">2 projects</div>
                  <div className="text-xs text-gray-500">Turkey</div>
                </div>
                <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-md absolute" style={{zIndex: 2, top: '50%', transform: 'translateY(-50%)'}}></div>
              </div>

              {/* 2022 - Below */}
              <div className="relative flex flex-col items-center justify-center h-full">
                <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-md absolute" style={{zIndex: 2, top: '50%', transform: 'translateY(-50%)'}}></div>
                <div className="text-center mt-16">
                  <div className="text-sm font-bold text-gray-900">2022</div>
                  <div className="text-xs text-gray-600">First project</div>
                  <div className="text-xs text-gray-500">Indonesia</div>
                </div>
              </div>

              {/* 2024 - Above */}
              <div className="relative flex flex-col items-center justify-center h-full">
                <div className="text-center mb-16">
                  <div className="text-sm font-bold text-gray-900">2024</div>
                  <div className="text-xs text-gray-600">Largest automated</div>
                  <div className="text-xs text-gray-500">plant in Africa</div>
                </div>
                <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-md absolute" style={{zIndex: 2, top: '50%', transform: 'translateY(-50%)'}}></div>
              </div>
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

          <div className="max-w-6xl mx-auto">
            {/* First row - 3 items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {features.slice(0, 3).map((feature, index) => (
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
            
            {/* Second row - 2 items centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {features.slice(3, 5).map((feature, index) => (
                <Card key={index + 3} className="text-center hover:shadow-lg transition-shadow">
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
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experienced professionals who guide our company's vision and strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "John R. Cassey II", role: "President", experience: "25+ years in coal processing" },
              {
                name: "Zhigang Wang, P.E.",
                role: "Vice President",
                experience: "20+ years in industrial operations",
              },
              { name: "Dona Casey", role: "Vesel Parts Sales", experience: "15+ years in mining technology" },
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
