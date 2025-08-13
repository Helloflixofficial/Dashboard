"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Link } from "lucide-react"
import { toast } from "sonner"

interface ShortenFormProps {
  onLinkCreated: (link: any) => void
}

export function ShortenForm({ onLinkCreated }: ShortenFormProps) {
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [countdownSeconds, setCountdownSeconds] = useState(5)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url) {
      toast.error("Please enter a URL")
      return
    }

    // Basic URL validation
    try {
      new URL(url)
    } catch {
      toast.error("Please enter a valid URL")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalUrl: url,
          title: title || undefined,
          description: description || undefined,
          countdownSeconds,
        }),
      })

      if (response.ok) {
        const newLink = await response.json()
        onLinkCreated(newLink)

        // Reset form
        setUrl("")
        setTitle("")
        setDescription("")
        setCountdownSeconds(5)

        toast.success("Short link created successfully!")
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to create short link")
      }
    } catch (error) {
      toast.error("Failed to create short link")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="url">Original URL *</Label>
          <Input
            id="url"
            type="url"
            placeholder="https://example.com/very-long-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title (optional)</Label>
          <Input id="title" placeholder="My Website" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          placeholder="Brief description of the link"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="countdown">Countdown Duration (seconds)</Label>
        <Input
          id="countdown"
          type="number"
          min="0"
          max="30"
          value={countdownSeconds}
          onChange={(e) => setCountdownSeconds(Number.parseInt(e.target.value) || 5)}
        />
        <p className="text-xs text-muted-foreground">
          Users will see a countdown before being redirected (0-30 seconds)
        </p>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating...
          </>
        ) : (
          <>
            <Link className="mr-2 h-4 w-4" />
            Create Short Link
          </>
        )}
      </Button>
    </form>
  )
}
