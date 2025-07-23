"use client"

import { useEffect, useRef } from "react"
import { X, Settings, Star, Shield, Wrench, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Equipment {
  icon: any
  title: string
  description: string
  equipment: string[]
  image: string
  detailedDescription?: string
  specifications?: string[]
  benefits?: string[]
  applications?: string[]
}

interface EquipmentModalProps {
  equipment: Equipment | null
  isOpen: boolean
  onClose: () => void
}

export function EquipmentModal({ equipment, isOpen, onClose }: EquipmentModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !equipment) return null

  // Enhanced equipment data with more details
  const getEnhancedEquipmentData = (equipmentCategory: Equipment) => {
    const enhancements: Record<string, Partial<Equipment>> = {
      "Crushing Equipment": {
        detailedDescription: "Our crushing equipment provides superior performance in primary and secondary coal processing operations. Engineered for durability and efficiency, these systems ensure optimal size reduction while minimizing operational costs. Built with advanced materials and precision engineering, our crushers deliver consistent performance in the most demanding mining environments.",
        specifications: [
          "Capacity: 50-2000 TPH",
          "Feed Size: Up to 1500mm",
          "Product Size: 0-300mm",
          "Power: 75-800 kW",
          "Automation: PLC controlled",
          "Maintenance: Low maintenance design"
        ],
        benefits: [
          "High reduction ratio",
          "Robust construction",
          "Low operating costs",
          "Easy maintenance",
          "Dust suppression systems",
          "Remote monitoring capability"
        ],
        applications: [
          "Primary crushing of ROM coal",
          "Secondary crushing operations",
          "Coal preparation plants",
          "Mining operations",
          "Material handling facilities"
        ]
      },
      "Screening Systems": {
        detailedDescription: "Advanced screening technology designed for precise coal size classification and efficient material separation. Our screening systems feature innovative designs that maximize throughput while ensuring accurate size separation. With robust construction and advanced vibration technology, these systems deliver reliable performance in demanding coal processing applications.",
        specifications: [
          "Capacity: 100-3000 TPH",
          "Screen Size: 1.2x3m to 3.7x7.3m",
          "Mesh Size: 0.5-150mm",
          "Amplitude: 3-8mm",
          "Frequency: 750-1000 RPM",
          "Inclination: 15-25 degrees"
        ],
        benefits: [
          "High screening efficiency",
          "Self-cleaning mesh design",
          "Reduced maintenance downtime",
          "Low noise operation",
          "Modular construction",
          "Weather resistant design"
        ],
        applications: [
          "Coal size classification",
          "Dewatering operations",
          "Scalping applications",
          "Fine coal recovery",
          "Quality control screening"
        ]
      },
      "Separation Equipment": {
        detailedDescription: "State-of-the-art separation technology for coal cleaning and processing, utilizing advanced density separation principles. Our equipment ensures maximum recovery of clean coal while effectively removing impurities. Engineered for optimal performance and energy efficiency, these systems deliver superior separation results across various coal types and operating conditions.",
        specifications: [
          "Capacity: 50-1500 TPH",
          "Separation Density: 1.3-2.2 SG",
          "Feed Size: 0.5-150mm",
          "Efficiency: >95%",
          "Medium Consumption: <1 kg/t",
          "Recovery Rate: >98%"
        ],
        benefits: [
          "High separation efficiency",
          "Low medium consumption",
          "Automated density control",
          "Minimal maintenance requirements",
          "Energy efficient operation",
          "Environmentally friendly"
        ],
        applications: [
          "Coal washing operations",
          "Dense medium separation",
          "Fine coal recovery",
          "Reject disposal",
          "Coal preparation plants"
        ]
      },
      "Dewatering Systems": {
        detailedDescription: "Efficient dewatering solutions engineered to optimize moisture content in coal products. Our systems combine advanced mechanical and thermal dewatering technologies to achieve target moisture levels while maximizing throughput. Designed for reliability and energy efficiency, these systems ensure consistent product quality and reduced transportation costs.",
        specifications: [
          "Capacity: 25-500 TPH",
          "Feed Moisture: 25-35%",
          "Product Moisture: 8-15%",
          "Cake Thickness: 15-30mm",
          "Filtration Rate: 500-2000 kg/m²/h",
          "Power Consumption: 2-8 kWh/t"
        ],
        benefits: [
          "Low final moisture content",
          "High solids recovery",
          "Automated operation",
          "Reduced energy consumption",
          "Minimal water usage",
          "Compact footprint"
        ],
        applications: [
          "Fine coal dewatering",
          "Tailings treatment",
          "Product preparation",
          "Water recovery systems",
          "Environmental compliance"
        ]
      },
      "Conveying Systems": {
        detailedDescription: "Reliable material handling and conveying solutions designed for efficient coal transportation throughout processing facilities. Our systems feature robust construction, advanced control systems, and safety features to ensure continuous operation. Engineered for flexibility and scalability, these conveying systems adapt to various plant layouts and operational requirements.",
        specifications: [
          "Capacity: 100-5000 TPH",
          "Belt Width: 500-2400mm",
          "Belt Speed: 1.5-6.3 m/s",
          "Conveyor Length: Up to 10km",
          "Lift Height: Up to 300m",
          "Power: 10-2000 kW"
        ],
        benefits: [
          "High reliability",
          "Low maintenance costs",
          "Energy efficient drives",
          "Advanced safety systems",
          "Weather protection",
          "Remote monitoring"
        ],
        applications: [
          "Raw coal transportation",
          "Product handling",
          "Stockyard operations",
          "Ship loading/unloading",
          "Plant interconnection"
        ]
      },
      "Control Systems": {
        detailedDescription: "Advanced automation and control systems for optimal plant operation, featuring cutting-edge technology for monitoring, control, and optimization of coal processing operations. Our systems integrate seamlessly with existing equipment to provide comprehensive plant automation, real-time monitoring, and predictive maintenance capabilities.",
        specifications: [
          "Processing Speed: 1ms cycle time",
          "I/O Points: Up to 10,000",
          "Communication: Ethernet/IP, Profibus",
          "HMI: Touch screen interfaces",
          "Data Storage: Historical trending",
          "Redundancy: Hot standby capability"
        ],
        benefits: [
          "Improved operational efficiency",
          "Reduced operator workload",
          "Real-time monitoring",
          "Predictive maintenance",
          "Energy optimization",
          "Safety enhancement"
        ],
        applications: [
          "Plant automation",
          "Process optimization",
          "Quality control",
          "Safety systems",
          "Environmental monitoring"
        ]
      }
    }

    return {
      ...equipmentCategory,
      ...enhancements[equipmentCategory.title]
    }
  }

  const enhancedEquipment = getEnhancedEquipmentData(equipment)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh] overflow-hidden w-full"
      >
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <enhancedEquipment.icon className="h-6 w-6 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{enhancedEquipment.title}</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6">
            {/* Equipment Image */}
            <div className="mb-6">
              <img
                src={enhancedEquipment.image || "/placeholder.svg"}
                alt={enhancedEquipment.title}
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>

            {/* Equipment Overview */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipment Overview</h3>
              <p className="text-gray-700 leading-relaxed text-justify mb-4">
                {enhancedEquipment.description}
              </p>
              {enhancedEquipment.detailedDescription && (
                <p className="text-gray-700 leading-relaxed text-justify">
                  {enhancedEquipment.detailedDescription}
                </p>
              )}
            </div>

            {/* Equipment Types */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipment Types</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {enhancedEquipment.equipment.map((item, index) => (
                  <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            {enhancedEquipment.specifications && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-orange-500" />
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {enhancedEquipment.specifications.map((spec, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Benefits */}
            {enhancedEquipment.benefits && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-orange-500" />
                  Key Benefits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {enhancedEquipment.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Applications */}
            {enhancedEquipment.applications && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Wrench className="h-5 w-5 mr-2 text-orange-500" />
                  Applications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {enhancedEquipment.applications.map((application, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{application}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="mt-8 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-orange-900 mb-2">Need More Information?</h4>
                  <p className="text-orange-700 text-sm">
                    Contact our technical experts for detailed specifications and customization options.
                  </p>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white ml-4">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 