"use client"

import type React from "react"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserButton } from "@clerk/nextjs"
import {
  Menu,
  Search,
  Mail,
  Bell,
  LayoutDashboard,
  FolderOpen,
  Calendar,
  Users,
  TrendingUp,
  FileText,
  DollarSign,
  Plane,
  UserPlus,
  MessageSquare,
  HelpCircle,
  Settings,
  LinkIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CRMLayoutProps {
  children: React.ReactNode
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: LinkIcon, label: "URL Shortener", href: "/shortener" },
  { icon: FolderOpen, label: "Projects", href: "/projects" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: Users, label: "Employees", href: "/employees" },
  { icon: TrendingUp, label: "Performance", href: "/performance" },
  { icon: FileText, label: "Invoices", href: "/invoices" },
  { icon: DollarSign, label: "Payrolls", href: "/payrolls" },
  { icon: Plane, label: "Leave Management", href: "/leave" },
  { icon: UserPlus, label: "Recruitment", href: "/recruitment" },
  { icon: MessageSquare, label: "Notifications", href: "/notifications" },
  { icon: HelpCircle, label: "Help Center", href: "/help" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function CRMLayout({ children }: CRMLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Updated to use pathname for current page detection
  const currentPage = menuItems.find((item) => item.href === pathname)?.label || "Dashboard"

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Brand */}
      <div className="flex items-center gap-2 border-b border-sidebar-border px-6 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <span className="text-sm font-bold">N</span>
        </div>
        <span className="text-lg font-semibold text-sidebar-foreground">NovaCRM</span>
      </div>

      {/* Search */}
      <div className="px-6 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sidebar-foreground/50" />
          <Input
            placeholder="Search..."
            className="pl-9 bg-sidebar-accent border-sidebar-border text-sidebar-accent-foreground placeholder:text-sidebar-foreground/50"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Button
              key={item.label}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive &&
                  "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
              )}
              onClick={() => {
                router.push(item.href)
                setSidebarOpen(false)
              }}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          )
        })}
      </nav>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
            </Sheet>
            <h1 className="text-xl font-semibold text-card-foreground">{currentPage}</h1>
          </div>

          {/* Segmented Buttons */}
          <div className="hidden md:flex items-center gap-1 rounded-lg bg-muted p-1">
            <Button variant="ghost" size="sm" className="bg-background text-foreground shadow-sm">
              Overview
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Order
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Sales
            </Button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
            <Button size="sm" className="hidden sm:inline-flex">
              Invite
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
