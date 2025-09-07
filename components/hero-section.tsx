"use client"

import { useState, useEffect } from 'react'

interface BackgroundImage {
  id: string;
  url: string;
  alt: string;
  sortOrder?: number;
}

interface PageContent {
  description: string;
  pageName: string;
}

interface ApiResponse {
  pageContent: { [key: string]: PageContent };
  backgroundImages: { [key: string]: BackgroundImage[] };
}

export function HeroSection() {
  const [homeContent, setHomeContent] = useState<PageContent | null>(null);
  const [backgroundImages, setBackgroundImages] = useState<BackgroundImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Fetch dynamic content and background images
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
        const response = await fetch(`${apiUrl}/api/page-content`)
        
        if (response.ok) {
          const data: ApiResponse = await response.json()
          
          // Set home page content
          if (data.pageContent.home) {
            setHomeContent(data.pageContent.home)
          }
          
          // Set background images for home page
          if (data.backgroundImages.home && data.backgroundImages.home.length > 0) {
            // Sort images by sortOrder if available
            const sortedImages = data.backgroundImages.home.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
            setBackgroundImages(sortedImages)
          } else {
            // Fallback to default images if no dynamic images are available
            setBackgroundImages([
              {
                id: 'default-1',
                url: '/images/coal-mining-background.JPG',
                alt: 'Coal Mining Operations'
              },
              {
                id: 'default-2',
                url: '/images/services-background.JPG',
                alt: 'Our Services'
              },
              {
                id: 'default-3',
                url: '/images/project-background.jpg',
                alt: 'Projects'
              }
            ])
          }
        }
      } catch (error) {
        console.error('Failed to fetch page content:', error)
        // Use fallback content and images
        setHomeContent({
          description: 'Advanced coal processing technology and expertise delivering efficient, sustainable solutions for the energy industry.',
          pageName: 'Home'
        })
        setBackgroundImages([
          {
            id: 'default-1',
            url: '/images/coal-mining-background.JPG',
            alt: 'Coal Mining Operations'
          }
        ])
      }
    }

    fetchContent()
  }, [])

  // Helper function to get image URL
  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('/uploads/')) {
      return `http://localhost:5000${imagePath}`;
    }
    return imagePath;
  };

  // Preload all images
  useEffect(() => {
    if (backgroundImages.length === 0) return;

    const preloadImages = async () => {
      const imagePromises = backgroundImages.map((image) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = resolve
          img.onerror = reject
          img.src = getImageUrl(image.url)
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
  }, [backgroundImages])

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    if (!isLoaded || backgroundImages.length <= 1) return

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
            key={image.id}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${getImageUrl(image.url)}')`,
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
          {homeContent?.description || 'Advanced coal processing technology and expertise delivering efficient, sustainable solutions for the energy industry.'}
        </p>
      </div>

      {/* Carousel Indicators */}
      {backgroundImages.length > 1 && (
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
      )}
    </section>
  )
}
