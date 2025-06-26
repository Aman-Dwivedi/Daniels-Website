"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NewsArticle {
  title: string
  excerpt: string
  date: string
  image: string
  fullContent: string
}

interface NewsModalProps {
  article: NewsArticle | null
  isOpen: boolean
  onClose: () => void
}

export function NewsModal({ article, isOpen, onClose }: NewsModalProps) {
  const scrollPositionRef = useRef<number>(0)

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      scrollPositionRef.current = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollPositionRef.current}px`
      document.body.style.width = "100%"
      document.body.style.overflow = "hidden"
    } else {
      // Restore scroll position
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""

      // Restore the exact scroll position
      if (scrollPositionRef.current > 0) {
        window.scrollTo(0, scrollPositionRef.current)
      }
    }

    // Cleanup function
    return () => {
      if (!isOpen) {
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.width = ""
        document.body.style.overflow = ""
      }
    }
  }, [isOpen])

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  if (!isOpen || !article) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white rounded-full shadow-md"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Modal Body - Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {/* Article Image */}
          <div className="relative h-64 overflow-hidden">
            <img src={article.image || "/placeholder.svg"} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Article Content */}
          <div className="p-8">
            {/* Date */}
            <div className="text-sm text-orange-500 font-medium mb-3">{article.date}</div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">{article.title}</h2>

            {/* Full Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">{article.fullContent}</p>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-6 mt-8">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Published by The Daniels Company</div>
                <Button onClick={onClose} className="bg-orange-500 hover:bg-orange-600 text-white">
                  Close Article
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
