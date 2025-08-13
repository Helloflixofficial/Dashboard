"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, HelpCircle, Book, MessageCircle, Mail, Phone, FileText, Users, Settings, Zap } from "lucide-react"

export function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState("")

  const categories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of using NovaCRM",
      articles: 12,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      icon: Users,
      title: "User Management",
      description: "Managing users, roles, and permissions",
      articles: 8,
      color: "bg-green-500/10 text-green-500",
    },
    {
      icon: FileText,
      title: "Projects & Tasks",
      description: "Creating and managing projects",
      articles: 15,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      icon: Settings,
      title: "Account Settings",
      description: "Customize your account preferences",
      articles: 6,
      color: "bg-orange-500/10 text-orange-500",
    },
    {
      icon: Zap,
      title: "Integrations",
      description: "Connect with third-party services",
      articles: 10,
      color: "bg-yellow-500/10 text-yellow-500",
    },
    {
      icon: MessageCircle,
      title: "Troubleshooting",
      description: "Common issues and solutions",
      articles: 20,
      color: "bg-red-500/10 text-red-500",
    },
  ]

  const popularArticles = [
    {
      title: "How to create your first project",
      category: "Getting Started",
      views: 1250,
      helpful: 95,
    },
    {
      title: "Setting up team permissions",
      category: "User Management",
      views: 890,
      helpful: 88,
    },
    {
      title: "Integrating with external tools",
      category: "Integrations",
      views: 756,
      helpful: 92,
    },
    {
      title: "Managing project deadlines",
      category: "Projects & Tasks",
      views: 634,
      helpful: 87,
    },
    {
      title: "Customizing your dashboard",
      category: "Account Settings",
      views: 523,
      helpful: 91,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div>
          <h1 className="text-4xl font-bold">Help Center</h1>
          <p className="text-muted-foreground text-lg mt-2">Find answers to your questions and get the help you need</p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-base"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {category.articles} articles
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Popular Articles */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Popular Articles</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {popularArticles.map((article, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{article.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.views} views</span>
                      <span>•</span>
                      <span>{article.helpful}% helpful</span>
                    </div>
                  </div>
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Support */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Still Need Help?</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Live Chat</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Chat with our support team in real-time</p>
              <Button className="w-full">Start Chat</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                  <Mail className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Email Support</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Send us an email and we'll get back to you</p>
              <Button variant="outline" className="w-full bg-transparent">
                Send Email
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                  <Phone className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Phone Support</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Call us for immediate assistance</p>
              <Button variant="outline" className="w-full bg-transparent">
                Call Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
