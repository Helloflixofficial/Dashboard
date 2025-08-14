"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  UserCheck,
  Calendar,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Plus,
} from "lucide-react";

interface LeaveRequest {
  id: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  status: "pending" | "approved" | "rejected";
  reason: string;
  appliedDate: string;
}

export function LeaveManagementPage() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      setLeaveRequests([
        {
          id: "1",
          employeeName: "John Smith",
          leaveType: "Annual Leave",
          startDate: "2024-01-15",
          endDate: "2024-01-19",
          days: 5,
          status: "approved",
          reason: "Family vacation",
          appliedDate: "2024-01-01",
        },
        {
          id: "2",
          employeeName: "Sarah Johnson",
          leaveType: "Sick Leave",
          startDate: "2024-01-10",
          endDate: "2024-01-12",
          days: 3,
          status: "pending",
          reason: "Medical appointment",
          appliedDate: "2024-01-08",
        },
        {
          id: "3",
          employeeName: "Mike Davis",
          leaveType: "Personal Leave",
          startDate: "2024-01-20",
          endDate: "2024-01-22",
          days: 3,
          status: "rejected",
          reason: "Personal matters",
          appliedDate: "2024-01-05",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredRequests = leaveRequests.filter(
    (request) =>
      request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRequests = leaveRequests.length;
  const pendingRequests = leaveRequests.filter(
    (r) => r.status === "pending"
  ).length;
  const approvedRequests = leaveRequests.filter(
    (r) => r.status === "approved"
  ).length;
  const totalDays = leaveRequests
    .filter((r) => r.status === "approved")
    .reduce((sum, r) => sum + r.days, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Leave Management</h1>
          <p className="text-gray-400 mt-2">
            Manage employee leave requests and approvals
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Requests
            </CardTitle>
            <UserCheck className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalRequests}</div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Pending
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {pendingRequests}
            </div>
            <p className="text-xs text-gray-500">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Approved
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {approvedRequests}
            </div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Days
            </CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalDays}</div>
            <p className="text-xs text-gray-500">Approved days</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search leave requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-900 border-gray-700 text-white"
          />
        </div>
        <Button
          variant="outline"
          className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Leave Requests Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Leave Requests</CardTitle>
          <CardDescription className="text-gray-400">
            Employee leave requests and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Employee
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Leave Type
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Start Date
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    End Date
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Days
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-b border-gray-800 hover:bg-gray-800/50"
                  >
                    <td className="py-3 px-4">
                      <div className="text-white font-medium">
                        {request.employeeName}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      {request.leaveType}
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      {new Date(request.startDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      {new Date(request.endDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      {request.days} days
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          request.status === "approved"
                            ? "default"
                            : request.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                        className={
                          request.status === "approved"
                            ? "bg-green-600 text-white"
                            : request.status === "pending"
                            ? "bg-yellow-600 text-white"
                            : "bg-red-600 text-white"
                        }
                      >
                        {request.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {request.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                        >
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
