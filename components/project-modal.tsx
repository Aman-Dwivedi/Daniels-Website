"use client"

import { useEffect, useRef } from "react"
import { X, MapPin, Zap, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  _id: string
  title: string
  location: string
  year: string
  capacity: string
  description: string
  detailedDescription: string
  image: string
  highlights: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
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

  if (!isOpen || !project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh] overflow-hidden w-full"
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
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
            {/* Project Image */}
            <div className="mb-6">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Location</p>
                  <p className="text-sm">{project.location}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2 text-orange-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Completed</p>
                  <p className="text-sm">{project.year}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Zap className="h-5 w-5 mr-2 text-orange-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Capacity</p>
                  <p className="text-sm">{project.capacity}</p>
                </div>
              </div>
            </div>

            {/* Detailed Project Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Overview</h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                {project.detailedDescription}
              </p>
            </div>

            {/* Key Highlights */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 