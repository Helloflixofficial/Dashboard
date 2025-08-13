"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, AlertTriangle, Info, X, Check } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: string
  isRead: boolean
  createdAt: string
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockNotifications: Notification[] = [
      {
        id: "1",
        title: "New Project Assignment",
        message: "You have been assigned to the Website Redesign project",
        type: "INFO",
        isRead: false,
        createdAt: "2024-02-15T10:30:00Z",
      },
      {
        id: "2",
        title: "Invoice Payment Received",
        message: "Payment of $15,000 received from Acme Corp",
        type: "SUCCESS",
        isRead: false,
        createdAt: "2024-02-14T14:20:00Z",
      },
      {
        id: "3",
        title: "Leave Request Approved",
        message: "Your vacation leave request has been approved",
        type: "SUCCESS",
        isRead: true,
        createdAt: "2024-02-13T09:15:00Z",
      },
      {
        id: "4",
        title: "System Maintenance",
        message: "Scheduled maintenance will occur this weekend",
        type: "WARNING",
        isRead: true,
        createdAt: "2024-02-12T16:45:00Z",
      },
      {
        id: "5",
        title: "Password Expiry Warning",
        message: "Your password will expire in 7 days",
        type: "WARNING",
        isRead: false,
        createdAt: "2024-02-11T08:00:00Z",
      },
    ]

    setTimeout(() => {
      setNotifications(mockNotifications)
      setLoading(false)
    }, 500)
  }, [])

  const stats = {
    total: notifications.length,
    unread: notifications.filter((n) => !n.isRead).length,
    info: notifications.filter((n) => n.type === "INFO").length,
    warnings: notifications.filter((n) => n.type === "WARNING").length,
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "SUCCESS":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "WARNING":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "ERROR":
        return <X className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "SUCCESS":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "WARNING":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "ERROR":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Notifications</h1>
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
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your latest notifications</p>
        </div>
        <Button onClick={markAllAsRead} disabled={stats.unread === 0}>
          <Check className="mr-2 h-4 w-4" />
          Mark All Read
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{stats.unread}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Info</CardTitle>
            <Info className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.info}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{stats.warnings}</div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                  !notification.isRead ? "bg-muted/50 border-primary/20" : "border-border"
                }`}
              >
                <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3
                        className={`font-medium ${!notification.isRead ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {notification.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className={getTypeColor(notification.type)}>{notification.type}</Badge>
                      {!notification.isRead && (
                        <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {notifications.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No notifications</h3>
              <p>You're all caught up!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
