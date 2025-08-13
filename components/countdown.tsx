"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ExternalLink, Shield, Clock } from "lucide-react"

interface CountdownProps {
  originalUrl: string
  title?: string
  countdownSeconds: number
  linkId: string
}

export function Countdown({ originalUrl, title, countdownSeconds, linkId }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(countdownSeconds)
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) {
      handleRedirect()
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft])

  const handleRedirect = async () => {
    if (isRedirecting) return

    setIsRedirecting(true)

    // Track the click
    try {
      await fetch(`/api/track/${linkId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userAgent: navigator.userAgent,
          referer: document.referrer,
        }),
      })
    } catch (error) {
      console.error("Failed to track click:", error)
    }

    // Redirect to the original URL
    window.location.href = originalUrl
  }

  const handleSkip = () => {
    setTimeLeft(0)
  }

  const progress = ((countdownSeconds - timeLeft) / countdownSeconds) * 100

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center space-y-6">
          {/* Security Icon */}
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">{title || "Redirecting..."}</h1>
            <p className="text-sm text-muted-foreground">You will be redirected to your destination in a moment</p>
          </div>

          {/* Countdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-4xl font-bold text-primary">
              <Clock className="h-8 w-8" />
              {timeLeft}
            </div>

            <Progress value={progress} className="w-full" />

            <p className="text-xs text-muted-foreground">Redirecting to: {originalUrl}</p>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button onClick={handleSkip} className="w-full" disabled={isRedirecting}>
              <ExternalLink className="mr-2 h-4 w-4" />
              {isRedirecting ? "Redirecting..." : "Skip & Continue"}
            </Button>

            <p className="text-xs text-muted-foreground">This countdown helps protect against malicious links</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
