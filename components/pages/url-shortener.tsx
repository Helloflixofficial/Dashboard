"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShortenForm } from "@/components/shorten-form"
import { LinkCard } from "@/components/link-card"
import { Link, ExternalLink, BarChart3 } from "lucide-react"
import { useUser } from "@clerk/nextjs"

interface LinkData {
  id: string
  originalUrl: string
  shortCode: string
  title?: string
  clicks: number
  isActive: boolean
  expiresAt?: string
  countdownSeconds: number
  createdAt: string
}

export function URLShortener() {
  const { user } = useUser()
  const [links, setLinks] = useState<LinkData[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalLinks: 0,
    totalClicks: 0,
    activeLinks: 0,
  })

  useEffect(() => {
    fetchLinks()
  }, [])

  const fetchLinks = async () => {
    try {
      const response = await fetch("/api/links")
      if (response.ok) {
        const data = await response.json()
        setLinks(data.links)
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Failed to fetch links:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLinkCreated = (newLink: LinkData) => {
    setLinks([newLink, ...links])
    setStats((prev) => ({
      totalLinks: prev.totalLinks + 1,
      totalClicks: prev.totalClicks,
      activeLinks: prev.activeLinks + 1,
    }))
  }

  const handleLinkToggle = async (linkId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/links/${linkId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      })

      if (response.ok) {
        setLinks(links.map((link) => (link.id === linkId ? { ...link, isActive } : link)))
        setStats((prev) => ({
          ...prev,
          activeLinks: isActive ? prev.activeLinks + 1 : prev.activeLinks - 1,
        }))
      }
    } catch (error) {
      console.error("Failed to toggle link:", error)
    }
  }

  const handleLinkDelete = async (linkId: string) => {
    try {
      const response = await fetch(`/api/links/${linkId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        const deletedLink = links.find((link) => link.id === linkId)
        setLinks(links.filter((link) => link.id !== linkId))
        setStats((prev) => ({
          totalLinks: prev.totalLinks - 1,
          totalClicks: prev.totalClicks,
          activeLinks: deletedLink?.isActive ? prev.activeLinks - 1 : prev.activeLinks,
        }))
      }
    } catch (error) {
      console.error("Failed to delete link:", error)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">URL Shortener</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">URL Shortener</h1>
          <p className="text-muted-foreground">Create and manage your shortened URLs</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Links</CardTitle>
            <Link className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLinks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClicks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Links</CardTitle>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeLinks}</div>
          </CardContent>
        </Card>
      </div>

      {/* Shorten Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create Short Link</CardTitle>
        </CardHeader>
        <CardContent>
          <ShortenForm onLinkCreated={handleLinkCreated} />
        </CardContent>
      </Card>

      {/* Links List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Links</CardTitle>
        </CardHeader>
        <CardContent>
          {links.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No links created yet. Create your first short link above!
            </div>
          ) : (
            <div className="space-y-4">
              {links.map((link) => (
                <LinkCard key={link.id} link={link} onToggle={handleLinkToggle} onDelete={handleLinkDelete} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
