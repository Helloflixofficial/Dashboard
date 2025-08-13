"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FolderOpen, Plus, Search, Calendar, DollarSign, Users, TrendingUp } from "lucide-react"

interface Project {
  id: string
  name: string
  description?: string
  status: string
  priority: string
  progress: number
  budget?: number
  spent?: number
  startDate?: string
  dueDate?: string
  assignments: { user: { name: string; avatar?: string } }[]
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockProjects: Project[] = [
      {
        id: "1",
        name: "Website Redesign",
        description: "Complete redesign of the company website with modern UI/UX",
        status: "IN_PROGRESS",
        priority: "HIGH",
        progress: 65,
        budget: 50000,
        spent: 32500,
        startDate: "2024-01-01",
        dueDate: "2024-03-31",
        assignments: [
          { user: { name: "John Doe", avatar: "/diverse-user-avatars.png" } },
          { user: { name: "Jane Smith", avatar: "/diverse-user-avatars.png" } },
        ],
      },
      {
        id: "2",
        name: "Mobile App Development",
        description: "Native mobile app for iOS and Android platforms",
        status: "PLANNING",
        priority: "MEDIUM",
        progress: 15,
        budget: 80000,
        spent: 12000,
        startDate: "2024-02-15",
        dueDate: "2024-08-15",
        assignments: [{ user: { name: "Mike Johnson", avatar: "/diverse-user-avatars.png" } }],
      },
      {
        id: "3",
        name: "Database Migration",
        description: "Migrate legacy database to new cloud infrastructure",
        status: "COMPLETED",
        priority: "URGENT",
        progress: 100,
        budget: 25000,
        spent: 23500,
        startDate: "2023-11-01",
        dueDate: "2024-01-15",
        assignments: [
          { user: { name: "Alice Cooper", avatar: "/diverse-user-avatars.png" } },
          { user: { name: "Bob Wilson", avatar: "/diverse-user-avatars.png" } },
        ],
      },
    ]

    setTimeout(() => {
      setProjects(mockProjects)
      setLoading(false)
    }, 500)
  }, [])

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const stats = {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === "IN_PROGRESS").length,
    completed: projects.filter((p) => p.status === "COMPLETED").length,
    overdue: projects.filter((p) => p.dueDate && new Date(p.dueDate) < new Date() && p.status !== "COMPLETED").length,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PLANNING":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "IN_PROGRESS":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "COMPLETED":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "ON_HOLD":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "LOW":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "MEDIUM":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "HIGH":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "URGENT":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Projects</h1>
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
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage and track your projects</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{stats.overdue}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PLANNING">Planning</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="ON_HOLD">On Hold</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="URGENT">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  {project.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className={getStatusColor(project.status)}>{project.status.replace("_", " ")}</Badge>
                <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} />
              </div>

              {/* Budget */}
              {project.budget && (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    <span>Budget</span>
                  </div>
                  <span>
                    ${project.spent?.toLocaleString()} / ${project.budget.toLocaleString()}
                  </span>
                </div>
              )}

              {/* Due Date */}
              {project.dueDate && (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Due Date</span>
                  </div>
                  <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                </div>
              )}

              {/* Team */}
              <div className="flex items-center justify-between">
                <span className="text-sm">Team</span>
                <div className="flex -space-x-2">
                  {project.assignments.slice(0, 3).map((assignment, index) => (
                    <Avatar key={index} className="h-6 w-6 border-2 border-background">
                      <AvatarImage src={assignment.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">
                        {assignment.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {project.assignments.length > 3 && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted border-2 border-background text-xs">
                      +{project.assignments.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all" || priorityFilter !== "all"
                ? "Try adjusting your filters"
                : "Get started by creating your first project"}
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
