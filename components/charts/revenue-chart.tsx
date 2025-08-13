"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", revenue: 12000, expenses: 8000 },
  { month: "Feb", revenue: 15000, expenses: 9000 },
  { month: "Mar", revenue: 18000, expenses: 11000 },
  { month: "Apr", revenue: 22000, expenses: 12000 },
  { month: "May", revenue: 25000, expenses: 13000 },
  { month: "Jun", revenue: 28000, expenses: 14000 },
  { month: "Jul", revenue: 32000, expenses: 16000 },
  { month: "Aug", revenue: 35000, expenses: 18000 },
  { month: "Sep", revenue: 38000, expenses: 19000 },
  { month: "Oct", revenue: 42000, expenses: 21000 },
  { month: "Nov", revenue: 45000, expenses: 22000 },
  { month: "Dec", revenue: 48000, expenses: 24000 },
]

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis
          dataKey="month"
          stroke="#9CA3AF"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          // Improved mobile responsiveness with smaller font and better spacing
          interval="preserveStartEnd"
          minTickGap={20}
        />
        <YAxis
          stroke="#9CA3AF"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          // Shorter format for mobile screens
          width={40}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "#F9FAFB",
            fontSize: "12px",
          }}
          formatter={(value: number, name: string) => [
            `$${value.toLocaleString()}`,
            name === "revenue" ? "Revenue" : "Expenses",
          ]}
          labelStyle={{ color: "#D1D5DB" }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={{ fill: "#3B82F6", strokeWidth: 2, r: 3 }}
          activeDot={{ r: 5, stroke: "#3B82F6", strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="expenses"
          stroke="#EF4444"
          strokeWidth={2}
          dot={{ fill: "#EF4444", strokeWidth: 2, r: 3 }}
          activeDot={{ r: 5, stroke: "#EF4444", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
