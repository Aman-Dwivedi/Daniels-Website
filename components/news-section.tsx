"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ArrowRight } from "lucide-react"
import { NewsModal } from "./news-modal"

interface NewsArticle {
  title: string
  excerpt: string
  date: string
  image: string
  fullContent: string
}

export function NewsSection() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const news: NewsArticle[] = [
    {
      title: "New Processing Plant Opens in West Virginia",
      excerpt:
        "Our latest facility incorporates cutting-edge technology to improve efficiency and reduce environmental impact.",
      date: "December 15, 2024",
      image: "/placeholder.svg?height=400&width=600&text=Processing+Plant",
      fullContent:
        "The Daniels Company is proud to announce the opening of our state-of-the-art coal processing facility in West Virginia. This $50 million investment represents our commitment to advancing coal processing technology while maintaining the highest environmental standards. The new plant features advanced separation technologies, automated quality control systems, and comprehensive environmental monitoring equipment. With a processing capacity of 2 million tons annually, this facility will serve as a model for sustainable coal processing operations. The plant incorporates innovative water recycling systems that reduce water consumption by 40% compared to traditional facilities, and advanced dust control systems that exceed EPA requirements. Our team of experienced engineers and technicians have worked tirelessly to ensure this facility represents the future of responsible coal processing.",
    },
    {
      title: "Partnership with Clean Energy Initiative",
      excerpt:
        "The Daniels Company joins forces with leading environmental organizations to develop cleaner processing methods.",
      date: "November 28, 2024",
      image: "/placeholder.svg?height=400&width=600&text=Clean+Energy",
      fullContent:
        "In a groundbreaking collaboration, The Daniels Company has partnered with the Clean Energy Research Institute to develop next-generation coal processing technologies that significantly reduce environmental impact. This three-year partnership will focus on developing innovative methods for carbon capture during the processing phase, advanced waste reduction techniques, and the integration of renewable energy sources into processing operations. The initiative aims to reduce carbon emissions from coal processing by up to 35% while maintaining operational efficiency. Dr. Sarah Chen, lead researcher at the Clean Energy Research Institute, stated: 'This partnership represents a crucial step toward making coal processing more sustainable. The Daniels Company's commitment to innovation and environmental responsibility makes them an ideal partner for this important work.' The collaboration will also explore opportunities for converting processing waste into useful byproducts, further reducing the environmental footprint of coal processing operations.",
    },
    {
      title: "Industry Recognition for Safety Excellence",
      excerpt: "Awarded the National Safety Council's highest honor for our commitment to workplace safety.",
      date: "November 10, 2024",
      image: "/placeholder.svg?height=400&width=600&text=Safety+Award",
      fullContent:
        "The Daniels Company has been awarded the prestigious Robert W. Campbell Award by the National Safety Council, recognizing our outstanding commitment to workplace safety and health. This award is given annually to organizations that demonstrate excellence in safety performance, innovative safety programs, and leadership in occupational safety and health. Over the past five years, The Daniels Company has achieved a 95% reduction in workplace incidents through comprehensive safety training programs, advanced safety equipment, and a culture that prioritizes employee wellbeing above all else. Our safety program includes monthly safety training sessions, regular equipment inspections, emergency response drills, and a peer-to-peer safety monitoring system. CEO John Daniels commented: 'This award reflects the dedication of every member of our team to maintaining the highest safety standards. Our employees are our most valuable asset, and their safety will always be our top priority.' The company has also implemented cutting-edge safety technologies, including real-time air quality monitoring, automated emergency shutdown systems, and wearable safety devices that alert workers to potential hazards.",
    },
    {
      title: "Expansion into International Markets",
      excerpt: "New contracts secured in Australia and South Africa, marking our global expansion milestone.",
      date: "October 22, 2024",
      image: "/placeholder.svg?height=400&width=600&text=Global+Expansion",
      fullContent:
        "The Daniels Company has successfully secured major contracts in Australia and South Africa, marking a significant milestone in our global expansion strategy. These contracts, valued at over $75 million combined, will see us providing comprehensive coal processing solutions to leading mining companies in both regions. In Australia, we will be working with Meridian Mining to upgrade their processing facilities in Queensland, implementing our latest separation technologies and automated systems. The South African project involves a partnership with Johannesburg Coal Corp to develop a new processing plant that will serve multiple mining operations in the region. These international expansions represent more than just business growth – they demonstrate the global recognition of our expertise and technology. Our international team, led by Director of Global Operations Sarah Mitchell, has spent the past two years building relationships and understanding the unique challenges of these markets. The projects will create over 200 jobs across both regions and establish The Daniels Company as a truly global leader in coal processing solutions. We expect these operations to be fully operational by mid-2025, with additional expansion opportunities already being explored in Indonesia and Colombia.",
    },
  ]

  const handleReadMore = (article: NewsArticle) => {
    setSelectedArticle(article)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedArticle(null)
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
            {news.map((article, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
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
