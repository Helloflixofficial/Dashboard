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
  UserPlus,
  Briefcase,
  Users,
  TrendingUp,
  Search,
  Filter,
  Plus,
} from "lucide-react";

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract";
  status: "open" | "closed" | "on-hold";
  applicants: number;
  postedDate: string;
  salary: string;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  status:
    | "applied"
    | "screening"
    | "interview"
    | "offer"
    | "hired"
    | "rejected";
  appliedDate: string;
  experience: string;
}

export function RecruitmentPage() {
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"jobs" | "candidates">("jobs");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      setJobOpenings([
        {
          id: "1",
          title: "Senior Software Engineer",
          department: "Engineering",
          location: "Remote",
          type: "full-time",
          status: "open",
          applicants: 24,
          postedDate: "2024-01-01",
          salary: "$120k - $150k",
        },
        {
          id: "2",
          title: "Product Manager",
          department: "Product",
          location: "New York",
          type: "full-time",
          status: "open",
          applicants: 18,
          postedDate: "2024-01-05",
          salary: "$130k - $160k",
        },
        {
          id: "3",
          title: "UX Designer",
          department: "Design",
          location: "San Francisco",
          type: "full-time",
          status: "on-hold",
          applicants: 12,
          postedDate: "2024-01-10",
          salary: "$100k - $130k",
        },
      ]);

      setCandidates([
        {
          id: "1",
          name: "Alice Johnson",
          email: "alice@example.com",
          position: "Senior Software Engineer",
          status: "interview",
          appliedDate: "2024-01-15",
          experience: "5 years",
        },
        {
          id: "2",
          name: "Bob Smith",
          email: "bob@example.com",
          position: "Product Manager",
          status: "screening",
          appliedDate: "2024-01-12",
          experience: "7 years",
        },
        {
          id: "3",
          name: "Carol Davis",
          email: "carol@example.com",
          position: "UX Designer",
          status: "offer",
          appliedDate: "2024-01-08",
          experience: "4 years",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredJobs = jobOpenings.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalJobs = jobOpenings.length;
  const openJobs = jobOpenings.filter((j) => j.status === "open").length;
  const totalCandidates = candidates.length;
  const totalApplicants = jobOpenings.reduce(
    (sum, job) => sum + job.applicants,
    0
  );

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
          <h1 className="text-3xl font-bold text-white">Recruitment</h1>
          <p className="text-gray-400 mt-2">
            Manage job openings and candidate applications
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Post New Job
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Jobs
            </CardTitle>
            <Briefcase className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalJobs}</div>
            <p className="text-xs text-gray-500">Active postings</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Open Positions
            </CardTitle>
            <UserPlus className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{openJobs}</div>
            <p className="text-xs text-gray-500">Currently hiring</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Applicants
            </CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {totalApplicants}
            </div>
            <p className="text-xs text-gray-500">All positions</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Candidates
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {totalCandidates}
            </div>
            <p className="text-xs text-gray-500">In pipeline</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-900 p-1 rounded-lg border border-gray-800">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "jobs"
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          }`}
        >
          Job Openings
        </button>
        <button
          onClick={() => setActiveTab("candidates")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "candidates"
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          }`}
        >
          Candidates
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder={`Search ${
              activeTab === "jobs" ? "jobs" : "candidates"
            }...`}
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

      {/* Content */}
      {activeTab === "jobs" ? (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Job Openings</CardTitle>
            <CardDescription className="text-gray-400">
              Current job postings and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Position
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Department
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Location
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Applicants
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
                  {filteredJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="border-b border-gray-800 hover:bg-gray-800/50"
                    >
                      <td className="py-3 px-4">
                        <div className="text-white font-medium">
                          {job.title}
                        </div>
                        <div className="text-sm text-gray-400">
                          {job.salary}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {job.department}
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {job.location}
                      </td>
                      <td className="py-3 px-4 text-gray-300 capitalize">
                        {job.type}
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {job.applicants}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            job.status === "open"
                              ? "default"
                              : job.status === "on-hold"
                              ? "secondary"
                              : "outline"
                          }
                          className={
                            job.status === "open"
                              ? "bg-green-600 text-white"
                              : job.status === "on-hold"
                              ? "bg-yellow-600 text-white"
                              : "bg-gray-600 text-white"
                          }
                        >
                          {job.status}
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
      ) : (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Candidates</CardTitle>
            <CardDescription className="text-gray-400">
              Candidate applications and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Position
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Experience
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Applied
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.map((candidate) => (
                    <tr
                      key={candidate.id}
                      className="border-b border-gray-800 hover:bg-gray-800/50"
                    >
                      <td className="py-3 px-4">
                        <div className="text-white font-medium">
                          {candidate.name}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {candidate.email}
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {candidate.position}
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {candidate.experience}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="default"
                          className={
                            candidate.status === "hired"
                              ? "bg-green-600 text-white"
                              : candidate.status === "offer"
                              ? "bg-blue-600 text-white"
                              : candidate.status === "interview"
                              ? "bg-purple-600 text-white"
                              : candidate.status === "screening"
                              ? "bg-yellow-600 text-white"
                              : candidate.status === "rejected"
                              ? "bg-red-600 text-white"
                              : "bg-gray-600 text-white"
                          }
                        >
                          {candidate.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {new Date(candidate.appliedDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                        >
                          View Profile
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
