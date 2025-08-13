"use client";

import { MobileSidebar } from "./sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Settings, LogOut, User } from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";

export function Header() {
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-gray-950 px-6">
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <h1 className="text-lg font-semibold text-white md:text-xl">
          Business Management Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white"
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user?.imageUrl || "/placeholder.svg"}
                  alt={user?.fullName || "User"}
                />
                <AvatarFallback className="bg-blue-600 text-white">
                  {user?.firstName?.charAt(0) ||
                    user?.emailAddresses[0]?.emailAddress.charAt(0) ||
                    "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-gray-900 border-gray-800"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal text-gray-300">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-white">
                  {user?.fullName || "User"}
                </p>
                <p className="text-xs leading-none text-gray-400">
                  {user?.emailAddresses[0]?.emailAddress}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 hover:text-white">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 hover:text-white">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem
              className="text-gray-300 hover:bg-gray-800 hover:text-white"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
