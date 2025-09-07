"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

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

interface ServiceModalProps {
  service: Service | null
  isOpen: boolean
  onClose: () => void
}

export function ServiceModal({ service, isOpen, onClose }: ServiceModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

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

  const handleGetQuote = () => {
    router.push('/contact')
  }

  const handleContactUs = () => {
    router.push('/contact')
  }

  if (!isOpen || !service) return null

  const IconComponent = service.icon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh] overflow-hidden w-full"
      >
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <IconComponent className="h-6 w-6 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{service.title}</h2>
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
            {/* Service Overview */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Overview</h3>
              <p className="text-gray-700 leading-relaxed text-justify mb-4">
                {service.description}
              </p>
              <p className="text-gray-700 leading-relaxed text-justify">
                {service.details}
              </p>
              {service.additionalInfo && (
                <p className="text-gray-700 leading-relaxed text-justify mt-4">
                  {service.additionalInfo}
                </p>
              )}
            </div>

            {/* Key Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits (if provided) */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Use Cases (if provided) */}
            {service.useCases && service.useCases.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Use Cases</h3>
                <div className="space-y-2">
                  {service.useCases.map((useCase, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="border-t pt-6 mt-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Interested in This Service?</h3>
                <p className="text-gray-600 mb-4">
                  Contact us today to discuss how we can help with your specific requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={handleGetQuote}
                  >
                    Get Quote
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                    onClick={handleContactUs}
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 