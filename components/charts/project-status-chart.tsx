"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Active", value: 12, color: "#10B981" },
  { name: "Completed", value: 8, color: "#3B82F6" },
  { name: "On Hold", value: 3, color: "#F59E0B" },
  { name: "Cancelled", value: 2, color: "#EF4444" },
]

export function ProjectStatusChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          // Adjusted inner/outer radius for better mobile display
          innerRadius="35%"
          outerRadius="65%"
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "#F9FAFB",
            fontSize: "12px",
          }}
          formatter={(value: number, name: string) => [`${value} projects`, name]}
        />
        <Legend
          wrapperStyle={{ color: "#D1D5DB", fontSize: "11px" }}
          formatter={(value) => <span style={{ color: "#D1D5DB" }}>{value}</span>}
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          // Better mobile legend spacing
          iconSize={8}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
