"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ArrowRight } from "lucide-react"
import { NewsModal } from "./news-modal"

interface NewsArticle {
  _id: string
  title: string
  excerpt: string
  date: string
  image: string
  fullContent: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export function NewsSection() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/news`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        
        const newsData = await response.json()
        setNews(newsData)
        setError(null)
      } catch (err) {
        console.error('Error fetching news:', err)
        setError('Failed to load news. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const handleReadMore = (article: NewsArticle) => {
    setSelectedArticle(article)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedArticle(null)
  }

  if (loading) {
    return (
      <section id="news" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest News & Updates</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay informed about our latest developments, partnerships, and industry insights.
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Loading news...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="news" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest News & Updates</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay informed about our latest developments, partnerships, and industry insights.
            </p>
          </div>
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section id="news" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest News & Updates</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay informed about our latest developments, partnerships, and industry insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {news.map((article) => (
              <Card key={article._id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="relative overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    {article.date}
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:text-orange-500 transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto text-orange-500 hover:text-orange-600"
                    onClick={() => handleReadMore(article)}
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <NewsModal article={selectedArticle} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}
