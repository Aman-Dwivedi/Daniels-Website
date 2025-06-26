"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, Zap, Gauge, Wrench, Factory, Cog } from "lucide-react"

export default function EquipmentsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const equipmentCategories = [
    {
      icon: Settings,
      title: "Crushing Equipment",
      description: "High-performance crushing solutions for primary and secondary coal processing.",
      equipment: ["Jaw Crushers", "Impact Crushers", "Cone Crushers", "Roll Crushers"],
      image: "/placeholder.svg?height=300&width=400&text=Crushing+Equipment",
    },
    {
      icon: Zap,
      title: "Screening Systems",
      description: "Advanced screening technology for precise coal size classification.",
      equipment: ["Vibrating Screens", "Trommel Screens", "Flip-Flow Screens", "Banana Screens"],
      image: "/placeholder.svg?height=300&width=400&text=Screening+Systems",
    },
    {
      icon: Gauge,
      title: "Separation Equipment",
      description: "State-of-the-art separation technology for coal cleaning and processing.",
      equipment: ["Dense Medium Separators", "Jigs", "Spirals", "Flotation Cells"],
      image: "/placeholder.svg?height=300&width=400&text=Separation+Equipment",
    },
    {
      icon: Wrench,
      title: "Dewatering Systems",
      description: "Efficient dewatering solutions to optimize moisture content.",
      equipment: ["Centrifuges", "Filter Presses", "Vacuum Filters", "Thickeners"],
      image: "/placeholder.svg?height=300&width=400&text=Dewatering+Systems",
    },
    {
      icon: Factory,
      title: "Conveying Systems",
      description: "Reliable material handling and conveying solutions.",
      equipment: ["Belt Conveyors", "Screw Conveyors", "Bucket Elevators", "Pneumatic Systems"],
      image: "/placeholder.svg?height=300&width=400&text=Conveying+Systems",
    },
    {
      icon: Cog,
      title: "Control Systems",
      description: "Advanced automation and control systems for optimal plant operation.",
      equipment: ["PLC Systems", "SCADA Systems", "Process Control", "Safety Systems"],
      image: "/placeholder.svg?height=300&width=400&text=Control+Systems",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Equipment Solutions</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Industry-leading coal processing equipment from trusted global manufacturers, backed by our technical
              expertise and support.
            </p>
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Equipment Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We supply and support a comprehensive range of coal processing equipment to meet all your operational
              needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipmentCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                    <category.icon className="h-6 w-6 text-orange-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <ul className="space-y-2 mb-6">
                    {category.equipment.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-gray-700 flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose Our Equipment?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Quality</h3>
                    <p className="text-gray-600">
                      All equipment sourced from leading global manufacturers with proven track records.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Support</h3>
                    <p className="text-gray-600">
                      Comprehensive technical support and training for optimal equipment performance.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Solutions</h3>
                    <p className="text-gray-600">
                      Equipment configurations tailored to your specific processing requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=600&text=Equipment+Showcase"
                alt="Equipment Showcase"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
