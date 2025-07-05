"use client"

export function ClientsSection() {
  const clients = [
    { name: "Alliance Coal LLC", logo: "/images/logos/alliance-coal.png" },
    { name: "Alpha Metallurgical Resources", logo: "/images/logos/alpha-metallurgical.png" },
    { name: "Adani", logo: "/images/logos/adani.png", large: true },
    { name: "American Consolidated Natural Resources", logo: "/images/logos/american-consolidated.png" },
    { name: "ArchCoal", logo: "/images/logos/arch-coal.png" },
    { name: "Consol Coal Resources", logo: "/images/logos/consol-coal.png" },
    { name: "Carbocoque", logo: "/images/logos/carbocoque.png" },
    { name: "Coal India", logo: "/images/logos/coal-india.png" },
    { name: "Conuma Resources", logo: "/images/logos/conuma-resources.png" },
    { name: "Defas", logo: "/images/logos/defas.png" },
    { name: "IMR", logo: "/images/logos/imr.png" },
    { name: "Metinvest", logo: "/images/logos/metinvest.png" },
    { name: "MAK", logo: "/images/logos/mak.png" },
    { name: "JSW Steel", logo: "/images/logos/jsw-steel.png" },
    { name: "Fernas", logo: "/images/logos/fernas.png" },
    { name: "Vulcan", logo: "/images/logos/vulcan.png" },
    { name: "Polyakeynez", logo: "/images/logos/polyakeynez.png", large: true },
    { name: "Tata Steel", logo: "/images/logos/tata-steel.png", large: true },
    { name: "Peabody Energy", logo: "/images/logos/peabody-energy.png" },
  ]

  // Create exactly 2 copies for seamless infinite scroll
  const infiniteClients = [...clients, ...clients]

  const officeLocations = [
    { name: "Bluefield, WV", country: "United States", x: "22%", y: "32%", label: "Bluefield, USA", labelDirection: "left", labelOffset: "120px", labelX: "10%", labelY: "25%" },
    { name: "Charlotte, NC", country: "United States", x: "22.5%", y: "32.5%", label: "Charlotte, USA", labelDirection: "left", labelOffset: "120px", labelX: "10%", labelY: "40%" },
    { name: "Beijing", country: "China", x: "77%", y: "30%", label: "Beijing, China", labelDirection: "right", labelOffset: "100px", labelX: "85%", labelY: "30%" },
    { name: "New Delhi", country: "India", x: "67%", y: "38%", label: "New Delhi, India", labelDirection: "right", labelOffset: "110px", labelX: "80%", labelY: "38%" },
    { name: "Ankara", country: "Turkey", x: "54%", y: "29%", label: "Ankara, Turkey", labelDirection: "left", labelOffset: "100px", labelX: "40%", labelY: "35%" },
    { name: "Bogota", country: "Colombia", x: "23%", y: "55%", label: "Bogota, Colombia", labelDirection: "left", labelOffset: "120px", labelX: "8%", labelY: "55%" },
    { name: "Almaty", country: "Kazakhstan", x: "65%", y: "26%", label: "Almaty, Kazakhstan", labelDirection: "left", labelOffset: "130px", labelX: "45%", labelY: "20%" },
    { name: "Ulaanbaatar", country: "Mongolia", x: "72.5%", y: "23.5%", label: "Ulaanbaatar, Mongolia", labelDirection: "right", labelOffset: "140px", labelX: "85%", labelY: "15%" },
  ]

  return (
    <section className="pt-20 bg-white">
      {/* Trusted by Industry Leaders - Full width gray background */}
      <div className="bg-gray-50 py-8 md:py-12 mb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're proud to partner with leading energy companies worldwide, delivering exceptional results and
              building lasting relationships.
            </p>
          </div>

          {/* Infinite Scrolling Logo Carousel */}
          <div className="relative mb-12 overflow-hidden">
            <div className="flex animate-scroll-seamless">
              {infiniteClients.map((clientItem, index) => (
                <div
                  key={`${clientItem.name}-${index}`}
                  className="flex-shrink-0 mx-6 flex items-center justify-center"
                  style={{
                    minWidth: "180px",
                    height: "80px",
                  }}
                >
                  <img
                    src={clientItem.logo || "/placeholder.svg"}
                    alt={`${clientItem.name} logo`}
                    className={`object-contain pointer-events-none transition-transform ${
                      clientItem.large ? "scale-[2]" : ""
                    }`}
                    style={{
                      maxWidth: "160px",
                      maxHeight: "60px",
                      width: "100%",
                      height: "100%",
                    }}
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement
                      target.src = `/placeholder.svg?height=60&width=160&text=${encodeURIComponent(clientItem.name)}`
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Fixed gradient overlays for smooth fade effect */}
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-50 via-gray-50 to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-50 via-gray-50 to-transparent pointer-events-none z-10"></div>
          </div>

          {/* Second row moving in opposite direction */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-seamless-reverse">
              {infiniteClients
                .slice()
                .reverse()
                .map((clientItem, index) => (
                  <div
                    key={`${clientItem.name}-reverse-${index}`}
                    className="flex-shrink-0 mx-6 flex items-center justify-center"
                    style={{
                      minWidth: "180px",
                      height: "80px",
                    }}
                  >
                    <img
                      src={clientItem.logo || "/placeholder.svg"}
                      alt={`${clientItem.name} logo`}
                      className={`object-contain pointer-events-none transition-transform ${
                        clientItem.large ? "scale-[2]" : ""
                      }`}
                      style={{
                        maxWidth: "160px",
                        maxHeight: "60px",
                        width: "100%",
                        height: "100%",
                      }}
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement
                        target.src = `/placeholder.svg?height=60&width=160&text=${encodeURIComponent(clientItem.name)}`
                      }}
                    />
                  </div>
                ))}
            </div>

            {/* Fixed gradient overlays for smooth fade effect */}
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-50 via-gray-50 to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-50 via-gray-50 to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </div>

      {/* Global Presence Section - Now with White Background */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Global Presence</h3>
            <p className="text-gray-600">Delivering results that matter across the globe</p>
          </div>

          {/* Statistics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Global Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">25</div>
              <div className="text-gray-600 font-medium">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">99%</div>
              <div className="text-gray-600 font-medium">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Support Available</div>
            </div>
          </div>

          {/* World Map with Office Locations */}
          <div className="relative max-w-5xl mx-auto hidden md:block">
            <div className="relative">
              <img src="/images/world-map.png" alt="World Map" className="w-full h-auto" />

              {/* Office Location Markers */}
              {officeLocations.map((location, index) => (
                <div key={index} className="absolute inset-0">
                  {/* Location Dot */}
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: location.x, top: location.y }}
                  >
                    <div className="relative">
                      <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-lg"></div>
                      {/* <div className="absolute top-0 left-0 w-4 h-4 bg-orange-500 rounded-full animate-ping opacity-75"></div> */}
                    </div>
                  </div>

                  {/* L-shaped connecting lines (horizontal then vertical) */}
                  {/* Horizontal line from dot */}
                  <div
                    className="absolute border-t-2 border-black"
                    style={{
                      left: location.x,
                      top: location.y,
                      width: parseFloat(location.labelY.replace('%', '')) === parseFloat(location.y.replace('%', ''))
                        ? `calc(${Math.abs(parseFloat(location.labelX.replace('%', '')) - parseFloat(location.x.replace('%', '')))}% - 50px)`
                        : `${Math.abs(parseFloat(location.labelX.replace('%', '')) - parseFloat(location.x.replace('%', '')))}%`,
                      transform: parseFloat(location.labelX.replace('%', '')) < parseFloat(location.x.replace('%', '')) ? 'translateX(-100%)' : 'none'
                    }}
                  ></div>
                  
                  {/* Vertical line to label edge */}
                  {parseFloat(location.labelY.replace('%', '')) !== parseFloat(location.y.replace('%', '')) && (
                    <div
                      className="absolute border-l-2 border-black"
                      style={{
                        left: location.labelX,
                        top: parseFloat(location.labelY.replace('%', '')) < parseFloat(location.y.replace('%', '')) 
                          ? `calc(${location.labelY} + 16px)` 
                          : location.y,
                        height: `calc(${Math.abs(parseFloat(location.labelY.replace('%', '')) - parseFloat(location.y.replace('%', '')))}% - 16px)`
                      }}
                    ></div>
                  )}

                  {/* Location Label positioned separately - rendered last to appear on top */}
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ 
                      left: location.labelX,
                      top: location.labelY 
                    }}
                  >
                    <div className="bg-white px-3 py-1 rounded-md shadow-md border border-gray-200 whitespace-nowrap">
                      <span className="text-xs font-semibold text-gray-700">{location.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-gray-600">
                Our offices span across 3 continents, ensuring local expertise and global reach for all your coal
                processing needs
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
