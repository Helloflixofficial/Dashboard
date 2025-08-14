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
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  Search,
  Filter,
} from "lucide-react";

interface Payroll {
  id: string;
  employeeName: string;
  position: string;
  baseSalary: number;
  overtime: number;
  bonuses: number;
  deductions: number;
  netPay: number;
  payPeriod: string;
  status: "paid" | "pending" | "processing";
  payDate: string;
}

export function PayrollsPage() {
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      setPayrolls([
        {
          id: "1",
          employeeName: "John Smith",
          position: "Software Engineer",
          baseSalary: 8000,
          overtime: 500,
          bonuses: 1000,
          deductions: 800,
          netPay: 8700,
          payPeriod: "December 2024",
          status: "paid",
          payDate: "2024-12-31",
        },
        {
          id: "2",
          employeeName: "Sarah Johnson",
          position: "Product Manager",
          baseSalary: 9500,
          overtime: 0,
          bonuses: 1500,
          deductions: 950,
          netPay: 10050,
          payPeriod: "December 2024",
          status: "pending",
          payDate: "2024-12-31",
        },
        {
          id: "3",
          employeeName: "Mike Davis",
          position: "Designer",
          baseSalary: 7000,
          overtime: 300,
          bonuses: 500,
          deductions: 650,
          netPay: 7150,
          payPeriod: "December 2024",
          status: "processing",
          payDate: "2024-12-31",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPayrolls = payrolls.filter(
    (payroll) =>
      payroll.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payroll.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPayroll = payrolls.reduce(
    (sum, payroll) => sum + payroll.netPay,
    0
  );
  const avgSalary = payrolls.length > 0 ? totalPayroll / payrolls.length : 0;

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
      <div>
        <h1 className="text-3xl font-bold text-white">Payroll Management</h1>
        <p className="text-gray-400 mt-2">
          Manage employee payrolls and compensation
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Payroll
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${totalPayroll.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Employees
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {payrolls.length}
            </div>
            <p className="text-xs text-gray-500">Active employees</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Average Salary
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${avgSalary.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">Per employee</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Pay Period
            </CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Dec 2024</div>
            <p className="text-xs text-gray-500">Current period</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search employees..."
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

      {/* Payroll Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Payroll Records</CardTitle>
          <CardDescription className="text-gray-400">
            Employee compensation and payroll details
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
                    Position
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Base Salary
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Overtime
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Bonuses
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Net Pay
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
                {filteredPayrolls.map((payroll) => (
                  <tr
                    key={payroll.id}
                    className="border-b border-gray-800 hover:bg-gray-800/50"
                  >
                    <td className="py-3 px-4">
                      <div className="text-white font-medium">
                        {payroll.employeeName}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      {payroll.position}
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      ${payroll.baseSalary.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      ${payroll.overtime.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      ${payroll.bonuses.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-white font-medium">
                      ${payroll.netPay.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          payroll.status === "paid"
                            ? "default"
                            : payroll.status === "pending"
                            ? "secondary"
                            : "outline"
                        }
                        className={
                          payroll.status === "paid"
                            ? "bg-green-600 text-white"
                            : payroll.status === "pending"
                            ? "bg-yellow-600 text-white"
                            : "bg-blue-600 text-white"
                        }
                      >
                        {payroll.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        View Details
                      </Button>
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
