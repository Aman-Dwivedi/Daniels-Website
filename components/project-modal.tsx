"use client"

import { useEffect, useRef, useState } from "react"
import { X, MapPin, Zap, Calendar, Edit, Save, Upload, Image as ImageIcon, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

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
  isAdmin?: boolean
  onSave?: (project: Project) => void
}

export function ProjectModal({ project, isOpen, onClose, isAdmin = false, onSave }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [saveLoading, setSaveLoading] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose()
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
  }, [isOpen])

  const handleClose = () => {
    setIsEditing(false)
    setEditingProject(null)
    setSelectedFile(null)
    setImagePreview(null)
    onClose()
  }

  const handleEdit = () => {
    if (project) {
      setEditingProject({ ...project })
      setIsEditing(true)
    }
  }

  const handleInputChange = (field: keyof Project, value: string | string[]) => {
    if (editingProject) {
      setEditingProject({ ...editingProject, [field]: value })
    }
  }

  const handleHighlightChange = (index: number, value: string) => {
    if (editingProject) {
      const newHighlights = [...editingProject.highlights]
      newHighlights[index] = value
      setEditingProject({ ...editingProject, highlights: newHighlights })
    }
  }

  const addHighlight = () => {
    if (editingProject) {
      setEditingProject({
        ...editingProject,
        highlights: [...editingProject.highlights, '']
      })
    }
  }

  const removeHighlight = (index: number) => {
    if (editingProject && editingProject.highlights.length > 1) {
      const newHighlights = editingProject.highlights.filter((_, i) => i !== index)
      setEditingProject({ ...editingProject, highlights: newHighlights })
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleSave = async () => {
    if (!editingProject || !onSave) return

    setSaveLoading(true)
    try {
      await onSave(editingProject)
      setIsEditing(false)
      setEditingProject(null)
      setSelectedFile(null)
      setImagePreview(null)
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setSaveLoading(false)
    }
  }

  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('/uploads/')) {
      return `http://localhost:5000${imagePath}`
    }
    return imagePath
  }

  if (!isOpen || !project) return null

  const currentProject = editingProject || project

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh] overflow-hidden w-full"
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Project' : currentProject.title}
          </h2>
          <div className="flex gap-2">
            {isAdmin && !isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleEdit}
                className="text-blue-600 hover:text-blue-700"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6">
            {isEditing ? (
              // Edit Mode
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={currentProject.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter project title"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={currentProject.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Enter location"
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      value={currentProject.year}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                      placeholder="Enter year"
                    />
                  </div>
                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      value={currentProject.capacity}
                      onChange={(e) => handleInputChange('capacity', e.target.value)}
                      placeholder="Enter capacity"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    value={currentProject.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter short description"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="detailedDescription">Detailed Description</Label>
                  <Textarea
                    id="detailedDescription"
                    value={currentProject.detailedDescription}
                    onChange={(e) => handleInputChange('detailedDescription', e.target.value)}
                    placeholder="Enter detailed description"
                    rows={6}
                  />
                </div>

                <div>
                  <Label htmlFor="image">Project Image</Label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Button 
                        type="button" 
                        onClick={handleImageClick}
                        variant="outline"
                        className="gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Choose New Image
                      </Button>
                      <span className="text-sm text-slate-500">
                        {selectedFile ? selectedFile.name : 'or keep current image'}
                      </span>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="border rounded-lg p-3 bg-slate-50">
                      <div className="flex items-center gap-2 mb-2">
                        <ImageIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">Preview</span>
                      </div>
                      <img 
                        src={imagePreview || getImageUrl(currentProject.image)} 
                        alt="Preview"
                        className="w-full h-64 object-cover rounded"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Key Highlights</Label>
                  <div className="space-y-3">
                    {currentProject.highlights.map((highlight, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={highlight}
                          onChange={(e) => handleHighlightChange(index, e.target.value)}
                          placeholder="Enter highlight"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeHighlight(index)}
                          disabled={currentProject.highlights.length <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addHighlight}
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Highlight
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    disabled={saveLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={saveLoading}
                  >
                    {saveLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              // View Mode
              <>
                {/* Project Image */}
                <div className="mb-6">
                  <img
                    src={getImageUrl(currentProject.image) || "/placeholder.svg"}
                    alt={currentProject.title}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Location</p>
                      <p className="text-sm">{currentProject.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Completed</p>
                      <p className="text-sm">{currentProject.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Zap className="h-5 w-5 mr-2 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Capacity</p>
                      <p className="text-sm">{currentProject.capacity}</p>
                    </div>
                  </div>
                </div>

                {/* Detailed Project Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Overview</h3>
                  <p className="text-gray-700 leading-relaxed text-justify">
                    {currentProject.detailedDescription}
                  </p>
                </div>

                {/* Key Highlights */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentProject.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 