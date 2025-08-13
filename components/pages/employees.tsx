"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, UserPlus, Search, MoreHorizontal, Mail } from "lucide-react"

interface Employee {
  id: string
  user: {
    name: string
    email: string
    avatar?: string
  }
  employeeId: string
  department: string
  position: string
  salary: number
  joinDate: string
  status: string
}

export function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockEmployees: Employee[] = [
      {
        id: "1",
        user: {
          name: "John Doe",
          email: "john.doe@novacrm.com",
          avatar: "/diverse-user-avatars.png",
        },
        employeeId: "EMP001",
        department: "Engineering",
        position: "Senior Developer",
        salary: 85000,
        joinDate: "2023-01-15",
        status: "ACTIVE",
      },
      {
        id: "2",
        user: {
          name: "Jane Smith",
          email: "jane.smith@novacrm.com",
          avatar: "/diverse-user-avatars.png",
        },
        employeeId: "EMP002",
        department: "Design",
        position: "Design Lead",
        salary: 78000,
        joinDate: "2022-08-20",
        status: "ACTIVE",
      },
      {
        id: "3",
        user: {
          name: "Mike Johnson",
          email: "mike.johnson@novacrm.com",
          avatar: "/diverse-user-avatars.png",
        },
        employeeId: "EMP003",
        department: "Operations",
        position: "Operations Manager",
        salary: 72000,
        joinDate: "2023-03-10",
        status: "ACTIVE",
      },
      {
        id: "4",
        user: {
          name: "Sarah Wilson",
          email: "sarah.wilson@novacrm.com",
          avatar: "/diverse-user-avatars.png",
        },
        employeeId: "EMP004",
        department: "Marketing",
        position: "Marketing Specialist",
        salary: 65000,
        joinDate: "2023-06-01",
        status: "INACTIVE",
      },
    ]

    setTimeout(() => {
      setEmployees(mockEmployees)
      setLoading(false)
    }, 500)
  }, [])

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const stats = {
    total: employees.length,
    active: employees.filter((e) => e.status === "ACTIVE").length,
    departments: new Set(employees.map((e) => e.department)).size,
    avgSalary: Math.round(employees.reduce((sum, e) => sum + e.salary, 0) / employees.length),
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Employees</h1>
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
          <h1 className="text-3xl font-bold">Employees</h1>
          <p className="text-muted-foreground">Manage your team members</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.departments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Salary</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.avgSalary.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={employee.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {employee.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employee.user.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.employeeId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {employee.user.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{employee.position}</p>
                  </TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    <Badge variant={employee.status === "ACTIVE" ? "default" : "secondary"}>{employee.status}</Badge>
                  </TableCell>
                  <TableCell>{new Date(employee.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell>${employee.salary.toLocaleString()}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? "No employees found matching your search." : "No employees found."}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
