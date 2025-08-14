"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { ProjectStatusChart } from "@/components/charts/project-status-chart";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  LinkIcon,
  Calendar,
  FileText,
  Bell,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    title: "Active Projects",
    value: "23",
    change: "+4 new this week",
    icon: LayoutDashboard,
  },
  {
    title: "Team Members",
    value: "156",
    change: "+12 this month",
    icon: Users,
  },
  {
    title: "Short URLs",
    value: "1,247",
    change: "+89 this week",
    icon: LinkIcon,
  },
];

export function Dashboard() {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-white">
          Welcome back,{" "}
          {user?.firstName ||
            user?.emailAddresses[0]?.emailAddress.split("@")[0]}
          !
        </h2>
        <p className="text-gray-400 mt-2">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-black border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-black border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Project Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectStatusChart />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-black border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Team Meeting</span>
              <span className="text-sm text-gray-400">2:00 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Client Call</span>
              <span className="text-sm text-gray-400">4:30 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Project Review</span>
              <span className="text-sm text-gray-400">Tomorrow</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Invoices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">INV-001</span>
              <span className="text-sm text-green-400">Paid</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">INV-002</span>
              <span className="text-sm text-yellow-400">Pending</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">INV-003</span>
              <span className="text-sm text-red-400">Overdue</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-gray-300 text-sm">
              New employee onboarding completed
            </div>
            <div className="text-gray-300 text-sm">
              Monthly report is ready for review
            </div>
            <div className="text-gray-300 text-sm">
              3 new URL shortener requests
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
