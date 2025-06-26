"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const offices = [
    {
      title: "Headquarters - USA",
      address: "1234 Industrial Blvd, Coal Valley, WV 25301",
      phone: "+1 (555) 123-4567",
      email: "info@danielscompany.com",
      hours: "Mon-Fri: 8:00 AM - 6:00 PM EST",
    },
    {
      title: "Australia Office",
      address: "456 Mining Street, Brisbane, QLD 4000",
      phone: "+61 7 3000 1234",
      email: "australia@danielscompany.com",
      hours: "Mon-Fri: 9:00 AM - 5:00 PM AEST",
    },
    {
      title: "South Africa Office",
      address: "789 Industrial Park, Johannesburg, 2000",
      phone: "+27 11 123 4567",
      email: "southafrica@danielscompany.com",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM SAST",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Ready to discuss your coal processing needs? Get in touch with our expert team today.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <Card>
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <Input id="email" type="email" placeholder="john.doe@company.com" />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <Input id="company" placeholder="Your Company Name" />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input id="phone" placeholder="+1 (555) 123-4567" />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <Input id="subject" placeholder="How can we help you?" />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <Textarea id="message" rows={6} placeholder="Tell us about your project requirements..." />
                    </div>

                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 8:00 AM - 6:00 PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@danielscompany.com</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">1234 Industrial Blvd</p>
                    <p className="text-gray-600">Coal Valley, WV 25301</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <Card className="bg-gray-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Us?</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-500">35+</div>
                      <div className="text-sm text-gray-600">Years Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-500">500+</div>
                      <div className="text-sm text-gray-600">Projects Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-500">25</div>
                      <div className="text-sm text-gray-600">Countries Served</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-500">24/7</div>
                      <div className="text-sm text-gray-600">Support Available</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Global Offices</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              With offices around the world, we're always close to our clients and ready to provide local support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{office.title}</h3>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{office.address}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{office.phone}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-orange-500 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{office.email}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-orange-500 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{office.hours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
