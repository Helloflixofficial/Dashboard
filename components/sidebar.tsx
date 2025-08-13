"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  FolderOpen,
  Calendar,
  Users,
  TrendingUp,
  FileText,
  DollarSign,
  UserCheck,
  UserPlus,
  Bell,
  HelpCircle,
  LinkIcon,
  Menu,
  Zap,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "URL Shortener", href: "/shortener", icon: LinkIcon },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Employees", href: "/employees", icon: Users },
  { name: "Performance", href: "/performance", icon: TrendingUp },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "Payrolls", href: "/payrolls", icon: DollarSign },
  { name: "Leave Management", href: "/leave", icon: UserCheck },
  { name: "Recruitment", href: "/recruitment", icon: UserPlus },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Help Center", href: "/help", icon: HelpCircle },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("flex h-full flex-col bg-gray-900 border-r border-gray-800", className)}>
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-6 border-b border-gray-800">
        <Zap className="h-8 w-8 text-blue-500" />
        <span className="text-xl font-bold text-white">NovaCRM</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white",
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-gray-400 hover:text-white h-10 w-10">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 bg-gray-900 border-gray-800">
        <div className="flex h-full flex-col bg-gray-900">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 px-6 border-b border-gray-800">
            <Zap className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-white">NovaCRM</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors min-h-[48px]",
                    isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white",
                  )}
                >
                  <item.icon className="h-6 w-6 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
