"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

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

interface Project {
  _id: string
  title: string
  image: string
  isActive: boolean
}

interface ProjectStats {
  _id: string;
  statKey: string;
  statLabel: string;
  statValue: string;
  sortOrder: number;
}

export default function SampleProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [projectStats, setProjectStats] = useState<ProjectStats[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [projectsContent, setProjectsContent] = useState<PageContent | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<BackgroundImage | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0)
    
    // Fetch dynamic content and projects
    const fetchContent = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
        
        // Fetch page content and background images
        const contentResponse = await fetch(`${apiUrl}/api/page-content`)
        if (contentResponse.ok) {
          const data: ApiResponse = await contentResponse.json()
          
          // Set projects page content
          if (data.pageContent.projects) {
            setProjectsContent(data.pageContent.projects)
          }
          
          // Set background image for projects page (use first image if multiple)
          if (data.backgroundImages.projects && data.backgroundImages.projects.length > 0) {
            const sortedImages = data.backgroundImages.projects.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
            setBackgroundImage(sortedImages[0])
          }
        }
      } catch (error) {
        console.error('Failed to fetch page content:', error)
        // Use fallback content
        setProjectsContent({
          description: 'Explore our portfolio of successful coal processing projects delivered across the globe, showcasing our expertise and innovation.',
          pageName: 'Projects'
        })
        setBackgroundImage({
          id: 'default',
          url: '/images/project-background.jpg',
          alt: 'Featured Projects'
        })
      }
    }

    fetchContent()
  }, [])

  // Fetch projects and stats from API
  useEffect(() => {
    const fetchProjectsAndStats = async () => {
      try {
        setLoading(true)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
        
        // Fetch projects and stats in parallel
        const [projectsResponse, statsResponse] = await Promise.all([
          fetch(`${apiUrl}/api/projects`),
          fetch(`${apiUrl}/api/projects/stats`)
        ])
        
        if (!projectsResponse.ok) {
          throw new Error('Failed to fetch projects')
        }
        
        const projectsData = await projectsResponse.json()
        setProjects(projectsData)
        
        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          setProjectStats(statsData)
        } else {
          // Use fallback stats if API fails
          setProjectStats([
            { _id: '1', statKey: 'projects_completed', statLabel: 'Projects Completed', statValue: '500+', sortOrder: 1 },
            { _id: '2', statKey: 'countries_served', statLabel: 'Countries Served', statValue: '25', sortOrder: 2 },
            { _id: '3', statKey: 'tons_processed', statLabel: 'Tons Processed Annually', statValue: '50M+', sortOrder: 3 },
            { _id: '4', statKey: 'ontime_delivery', statLabel: 'On-Time Delivery', statValue: '99%', sortOrder: 4 }
          ])
        }
        
        setError(null)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError('Failed to load projects. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProjectsAndStats()
  }, [])

  // Helper function to get image URL
  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('/uploads/')) {
      return `http://localhost:5000${imagePath}`
    }
    return imagePath
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Projects</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Loading our portfolio of successful coal processing projects...
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">Loading projects...</p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Projects</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Each project represents our commitment to delivering innovative solutions.
              </p>
            </div>
            <div className="text-center">
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${backgroundImage ? getImageUrl(backgroundImage.url) : '/images/project-background.jpg'}')`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Featured <span className="text-orange-500">Projects</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            {projectsContent?.description || 'Explore our portfolio of successful coal processing projects delivered across the globe, showcasing our expertise and innovation.'}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each project represents our commitment to delivering innovative, efficient, and sustainable coal
              processing solutions.
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project._id} className="hover:shadow-lg transition-all duration-300 group overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={getImageUrl(project.image) || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 text-center">{project.title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No projects available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Project Statistics</h2>
            <p className="text-xl text-gray-600">Our track record speaks for itself</p>
          </div>

          <div className={`grid gap-8 ${projectStats.length === 4 ? 'grid-cols-2 md:grid-cols-4' : projectStats.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
            {projectStats.map((stat) => (
              <div key={stat._id} className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">{stat.statValue}</div>
                <div className="text-gray-600 font-medium">{stat.statLabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
