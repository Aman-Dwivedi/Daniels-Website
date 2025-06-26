"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cog, Settings, CheckCircle, Zap, Handshake, Wrench, Factory } from "lucide-react"

export default function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const services = [
    {
      icon: Cog,
      title: "Turn-Key Projects",
      description: "Complete facility development from concept to commissioning.",
      features: ["EPC project management", "Facility design & construction", "Startup & commissioning"],
      details:
        "Our comprehensive turn-key solutions cover every aspect of coal processing facility development. From initial feasibility studies to final commissioning, we manage the entire project lifecycle with precision and expertise.",
    },
    {
      icon: Handshake,
      title: "Engineering Consulting",
      description: "Expert technical guidance for optimal coal preparation solutions.",
      features: ["Process design optimization", "Equipment selection advice", "Feasibility studies"],
      details:
        "Our experienced engineering team provides strategic consulting services to optimize your coal processing operations. We analyze your specific requirements and recommend the most efficient and cost-effective solutions.",
    },
    {
      icon: Zap,
      title: "Performance Audits",
      description: "Maximize efficiency and profitability of existing coal preparation plants.",
      features: ["Plant performance assessment", "Upgrade recommendations", "Operational improvements"],
      details:
        "Through comprehensive performance audits, we identify opportunities to enhance your plant's efficiency, reduce operational costs, and improve overall profitability while maintaining safety and environmental standards.",
    },
    {
      icon: Settings,
      title: "Equipment Supply",
      description: "High-quality processing equipment from leading global manufacturers.",
      features: ["Premium machinery sourcing", "Technical support included", "Installation guidance provided"],
      details:
        "We partner with the world's leading equipment manufacturers to provide state-of-the-art coal processing machinery. Our supply chain expertise ensures you receive the best equipment for your specific applications.",
    },
    {
      icon: Wrench,
      title: "Maintenance & Support",
      description: "Comprehensive maintenance programs to keep your operations running smoothly.",
      features: ["Preventive maintenance", "Emergency repair services", "Spare parts supply"],
      details:
        "Our maintenance and support services ensure maximum uptime for your coal processing operations. We provide scheduled maintenance, emergency repairs, and a comprehensive spare parts inventory.",
    },
    {
      icon: Factory,
      title: "Plant Optimization",
      description: "Advanced optimization techniques to improve plant performance and efficiency.",
      features: ["Process flow analysis", "Automation integration", "Efficiency improvements"],
      details:
        "Using cutting-edge technology and proven methodologies, we optimize your plant's performance to achieve maximum throughput, quality, and efficiency while reducing operational costs.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Comprehensive coal processing solutions tailored to meet your specific operational needs and industry
              requirements.
            </p>
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
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Learn More</Button>
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
  )
}
