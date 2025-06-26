import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WhatWeOfferSection } from "@/components/what-we-offer-section"
import { ClientsSection } from "@/components/clients-section"
import { NewsSection } from "@/components/news-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <WhatWeOfferSection />
      <ClientsSection />
      <NewsSection />
      <Footer />
    </div>
  )
}
