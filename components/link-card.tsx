"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Copy, ExternalLink, BarChart3, Trash2, Clock, Calendar } from "lucide-react"
import { toast } from "sonner"
import { formatDistanceToNow } from "date-fns"

interface LinkCardProps {
  link: {
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
  onToggle: (linkId: string, isActive: boolean) => void
  onDelete: (linkId: string) => void
}

export function LinkCard({ link, onToggle, onDelete }: LinkCardProps) {
  const [copying, setCopying] = useState(false)
  const shortUrl = `${window.location.origin}/${link.shortCode}`

  const handleCopy = async () => {
    setCopying(true)
    try {
      await navigator.clipboard.writeText(shortUrl)
      toast.success("Link copied to clipboard!")
    } catch (error) {
      toast.error("Failed to copy link")
    } finally {
      setCopying(false)
    }
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this link? This action cannot be undone.")) {
      onDelete(link.id)
    }
  }

  const isExpired = link.expiresAt && new Date(link.expiresAt) < new Date()

  return (
    <Card className={`${!link.isActive || isExpired ? "opacity-60" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Title and URL */}
            <div className="space-y-1">
              {link.title && <h3 className="font-medium text-sm">{link.title}</h3>}
              <div className="flex items-center gap-2 text-sm">
                <span className="font-mono bg-muted px-2 py-1 rounded text-primary">{shortUrl}</span>
                <Button variant="ghost" size="sm" onClick={handleCopy} disabled={copying} className="h-6 w-6 p-0">
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(shortUrl, "_blank")}
                  className="h-6 w-6 p-0"
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground truncate">{link.originalUrl}</p>
            </div>

            {/* Stats and Info */}
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <BarChart3 className="h-3 w-3" />
                {link.clicks} clicks
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {link.countdownSeconds}s countdown
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDistanceToNow(new Date(link.createdAt), { addSuffix: true })}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              {isExpired && (
                <Badge variant="destructive" className="text-xs">
                  Expired
                </Badge>
              )}
              <Badge variant={link.isActive ? "default" : "secondary"} className="text-xs">
                {link.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>

            <Switch
              checked={link.isActive}
              onCheckedChange={(checked) => onToggle(link.id, checked)}
              disabled={isExpired}
            />

            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
