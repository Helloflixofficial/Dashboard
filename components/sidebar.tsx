"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  User,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", id: "dashboard", icon: LayoutDashboard },
  { name: "URL Shortener", id: "shortener", icon: LinkIcon },
  { name: "Projects", id: "projects", icon: FolderOpen },
  { name: "Calendar", id: "calendar", icon: Calendar },
  { name: "Employees", id: "employees", icon: Users },
  { name: "Performance", id: "performance", icon: TrendingUp },
  { name: "Invoices", id: "invoices", icon: FileText },
  { name: "Payrolls", id: "payrolls", icon: DollarSign },
  { name: "Leave Management", id: "leave", icon: UserCheck },
  { name: "Recruitment", id: "recruitment", icon: UserPlus },
  { name: "Notifications", id: "notifications", icon: Bell },
  { name: "Settings", id: "settings", icon: User },
  { name: "Help Center", id: "help", icon: HelpCircle },
];

interface SidebarProps {
  className?: string;
  onNavigate?: (page: string) => void;
  currentPage?: string;
  onClose?: () => void;
}

export function Sidebar({
  className,
  onNavigate,
  currentPage = "dashboard",
  onClose,
}: SidebarProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col bg-black border-r border-gray-800",
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-6 border-b border-gray-800">
        <Zap className="h-8 w-8 text-white" />
        <span className="text-xl font-bold text-white">NovaCRM</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.name}
              onClick={() => {
                onNavigate?.(item.id);
                onClose?.();
              }}
              className={cn(
                "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-left",
                isActive
                  ? "bg-white text-black"
                  : "text-gray-300 hover:bg-gray-900 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden text-gray-400 hover:text-white"
    >
      <Menu className="h-6 w-6" />
      <span className="sr-only">Toggle navigation menu</span>
    </Button>
  );
}
