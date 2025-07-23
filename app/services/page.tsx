"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cog, Settings, CheckCircle, Zap, Handshake, Wrench, Factory } from "lucide-react"
import { ServiceModal } from "@/components/service-modal"

interface Service {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  features: string[]
  details: string
  additionalInfo?: string
  benefits?: string[]
  useCases?: string[]
}

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const services: Service[] = [
    {
      icon: Cog,
      title: "Turn-Key Projects",
      description: "Complete facility development from concept to commissioning.",
      features: ["EPC project management", "Facility design & construction", "Startup & commissioning"],
      details:
        "Our comprehensive turn-key solutions cover every aspect of coal processing facility development. From initial feasibility studies to final commissioning, we manage the entire project lifecycle with precision and expertise.",
      additionalInfo:
        "We take full responsibility for project delivery, ensuring seamless coordination between engineering, procurement, and construction phases. Our experienced project managers work closely with clients to ensure all requirements are met within budget and timeline constraints.",
      benefits: [
        "Single point of responsibility",
        "Reduced project risk",
        "Faster project delivery",
        "Cost optimization",
        "Quality assurance",
        "Technical support throughout lifecycle"
      ],
      useCases: [
        "New coal preparation plant construction",
        "Facility expansion and modernization",
        "Process plant relocation projects",
        "Brownfield development initiatives"
      ]
    },
    {
      icon: Handshake,
      title: "Engineering Consulting",
      description: "Expert technical guidance for optimal coal preparation solutions.",
      features: ["Process design optimization", "Equipment selection advice", "Feasibility studies"],
      details:
        "Our experienced engineering team provides strategic consulting services to optimize your coal processing operations. We analyze your specific requirements and recommend the most efficient and cost-effective solutions.",
      additionalInfo:
        "With decades of combined experience in coal processing, our consultants bring deep industry knowledge and proven methodologies to help you make informed decisions about your operations and investments.",
      benefits: [
        "Expert technical guidance",
        "Cost-effective solutions",
        "Risk mitigation",
        "Technology transfer",
        "Process optimization",
        "Compliance assurance"
      ],
      useCases: [
        "Plant performance evaluation",
        "Technology selection studies",
        "Process improvement initiatives",
        "Investment planning and analysis",
        "Regulatory compliance consulting"
      ]
    },
    {
      icon: Zap,
      title: "Performance Audits",
      description: "Maximize efficiency and profitability of existing coal preparation plants.",
      features: ["Plant performance assessment", "Upgrade recommendations", "Operational improvements"],
      details:
        "Through comprehensive performance audits, we identify opportunities to enhance your plant's efficiency, reduce operational costs, and improve overall profitability while maintaining safety and environmental standards.",
      additionalInfo:
        "Our systematic approach includes detailed analysis of process flows, equipment performance, and operational practices to provide actionable recommendations for immediate and long-term improvements.",
      benefits: [
        "Increased operational efficiency",
        "Reduced operational costs",
        "Improved product quality",
        "Enhanced safety performance",
        "Environmental compliance",
        "Extended equipment life"
      ],
      useCases: [
        "Underperforming plant diagnosis",
        "Energy efficiency improvements",
        "Yield optimization projects",
        "Maintenance strategy development",
        "Environmental impact reduction"
      ]
    },
    {
      icon: Settings,
      title: "Equipment Supply",
      description: "High-quality processing equipment from leading global manufacturers.",
      features: ["Premium machinery sourcing", "Technical support included", "Installation guidance provided"],
      details:
        "We partner with the world's leading equipment manufacturers to provide state-of-the-art coal processing machinery. Our supply chain expertise ensures you receive the best equipment for your specific applications.",
      additionalInfo:
        "Our global network of suppliers and manufacturers allows us to source cutting-edge equipment while maintaining competitive pricing. We handle all aspects of procurement, logistics, and delivery coordination.",
      benefits: [
        "Access to premium equipment",
        "Competitive pricing",
        "Quality assurance",
        "Technical support",
        "Fast delivery times",
        "Comprehensive warranties"
      ],
      useCases: [
        "Equipment replacement projects",
        "Plant capacity expansion",
        "Technology upgrades",
        "Emergency equipment procurement",
        "Spare parts supply"
      ]
    },
    {
      icon: Wrench,
      title: "Maintenance & Support",
      description: "Comprehensive maintenance programs to keep your operations running smoothly.",
      features: ["Preventive maintenance", "Emergency repair services", "Spare parts supply"],
      details:
        "Our maintenance and support services ensure maximum uptime for your coal processing operations. We provide scheduled maintenance, emergency repairs, and a comprehensive spare parts inventory.",
      additionalInfo:
        "Our skilled technicians and engineers are available 24/7 to address any operational issues. We develop customized maintenance programs tailored to your specific equipment and operational requirements.",
      benefits: [
        "Maximum equipment uptime",
        "Reduced maintenance costs",
        "Extended equipment life",
        "Predictable maintenance schedules",
        "Emergency response capability",
        "Comprehensive documentation"
      ],
      useCases: [
        "Scheduled maintenance programs",
        "Equipment overhauls",
        "Emergency repair services",
        "Condition monitoring programs",
        "Spare parts management"
      ]
    },
    {
      icon: Factory,
      title: "Plant Optimization",
      description: "Advanced optimization techniques to improve plant performance and efficiency.",
      features: ["Process flow analysis", "Automation integration", "Efficiency improvements"],
      details:
        "Using cutting-edge technology and proven methodologies, we optimize your plant's performance to achieve maximum throughput, quality, and efficiency while reducing operational costs.",
      additionalInfo:
        "Our optimization approach combines advanced process control, automation technologies, and operational best practices to deliver measurable improvements in plant performance and profitability.",
      benefits: [
        "Increased throughput",
        "Improved product quality",
        "Reduced energy consumption",
        "Lower operational costs",
        "Enhanced automation",
        "Better process control"
      ],
      useCases: [
        "Process control system upgrades",
        "Automation implementation",
        "Bottleneck elimination",
        "Energy efficiency projects",
        "Quality improvement initiatives"
      ]
    },
  ]

  const handleLearnMore = (service: Service) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedService(null)
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Parallax Effect */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/services-background.jpg')`,
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
              Our <span className="text-orange-500">Services</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Comprehensive coal processing solutions tailored to meet your specific operational needs and industry
              requirements.
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500 transition-colors">
                      <service.icon className="h-8 w-8 text-orange-500 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">{service.title}</h3>
                    <p className="text-gray-600 mb-6 text-center">{service.description}</p>
                    <p className="text-gray-700 mb-6 text-sm leading-relaxed">{service.details}</p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                      onClick={() => handleLearnMore(service)}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Contact us today to discuss your coal processing needs and discover how our services can benefit your
                operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                  Get Quote
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 bg-transparent"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <ServiceModal service={selectedService} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}
