import { Card, CardContent } from "@/components/ui/card"
import { Factory, Zap, Shield, Users } from "lucide-react"

export function AboutSection() {
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

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About The Daniels Company</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            With decades of experience in coal processing, we deliver innovative solutions that drive efficiency and
            sustainability in the energy sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Industry Leadership Since 1985</h3>
            <p className="text-gray-600 mb-4">
              The Daniels Company has been at the forefront of coal processing innovation for over three decades. Our
              commitment to excellence and continuous improvement has made us a trusted partner for energy companies
              worldwide.
            </p>
            <p className="text-gray-600 mb-6">
              We combine traditional expertise with modern technology to deliver solutions that meet today's
              environmental and efficiency standards while preparing for tomorrow's challenges.
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
              src="/placeholder.svg?height=400&width=600&text=Coal+Processing+Facility"
              alt="Coal Processing Facility"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
