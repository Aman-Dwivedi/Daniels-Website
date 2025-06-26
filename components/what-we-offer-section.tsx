import { Card, CardContent } from "@/components/ui/card"
import { Cog, Settings, CheckCircle, Zap, Handshake } from "lucide-react"

export function WhatWeOfferSection() {
  const services = [
    {
      icon: Cog,
      title: "Turn-Key Projects",
      description: "Complete facility development from concept to commissioning.",
      features: ["EPC project management", "Facility design & construction", "Startup & commissioning"],
    },
    {
      icon: Handshake,
      title: "Engineering Consulting",
      description: "Exper technical guidance for optimal coal preparation solutions.",
      features: ["Process design optimization", "Equipment selection advice", "Feasibility studies"],
    },
    {
      icon: Zap,
      title: "Performance Audits",
      description: "Maximize efficiency and profitability of existing coal preparation plants.",
      features: ["Plant performance assessment", "Upgrade recommendations", "Operational improvements"],
    },
    {
      icon: Settings,
      title: "Equipment Supply",
      description: "High-quality processing equipment from leading global manufacturers.",
      features: ["Premium machinery sourcing", "Technical support included", "Installation guidance provided"],
    },
  ]

  return (
    <section id="services" className="pt-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive coal processing solutions from engineering to equipment supply.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {services.map((service, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 group cursor-pointer max-w-sm mx-auto"
            >
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500 transition-colors">
                  <service.icon className="h-8 w-8 text-orange-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-center">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
