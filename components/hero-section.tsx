"use client"

import { useState, useEffect } from 'react'

export function HeroSection() {
  // Array of background images from all sections
  const backgroundImages = [
    {
      url: '/images/coal-mining-background.JPG',
      alt: 'Coal Mining Operations'
    },
    {
      url: '/images/services-background.JPG',
      alt: 'Our Services'
    },
    {
      url: '/images/project-background.jpg',
      alt: 'Projects'
    },
    {
      url: '/images/equipment-background.JPG',
      alt: 'Equipment Solutions'
    },
    {
      url: '/images/contact-background.JPG',
      alt: 'Contact Us'
    },
    {
      url: '/images/Daniels.jpg',
      alt: 'About Daniels'
    },
    {
      url: '/images/news3.jpg',
      alt: 'Industry News'
    },
    {
      url: '/images/news4.jpg',
      alt: 'Latest Updates'
    }
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Preload all images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = backgroundImages.map((image) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = resolve
          img.onerror = reject
          img.src = image.url
        })
      })

      try {
        await Promise.all(imagePromises)
        setIsLoaded(true)
      } catch (error) {
        console.error('Failed to preload some images:', error)
        setIsLoaded(true) // Continue anyway
      }
    }

    preloadImages()
  }, [])

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    if (!isLoaded) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      )
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [isLoaded, backgroundImages.length])

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${image.url}')`,
              backgroundAttachment: 'fixed',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Unmatched Process
          <span className="block text-orange-500">Solutions</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Advanced coal processing technology and expertise delivering efficient, sustainable solutions for the energy
          industry.
        </p>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-orange-500 scale-110' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
