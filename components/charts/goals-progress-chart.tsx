"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { goal: "Revenue", progress: 85, target: 100 },
  { goal: "Projects", progress: 92, target: 100 },
  { goal: "Clients", progress: 78, target: 100 },
  { goal: "Team Growth", progress: 95, target: 100 },
  { goal: "Satisfaction", progress: 88, target: 100 },
]

export function GoalsProgressChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="horizontal" margin={{ top: 20, right: 30, left: 60, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
        <XAxis
          type="number"
          domain={[0, 100]}
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <YAxis
          type="category"
          dataKey="goal"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={50}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            color: "hsl(var(--popover-foreground))",
            fontSize: "12px",
          }}
          labelStyle={{ color: "hsl(var(--popover-foreground))" }}
          formatter={(value, name) => [`${value}%`, name === "progress" ? "Progress" : "Target"]}
        />
        <Bar dataKey="target" fill="hsl(var(--muted))" radius={[0, 4, 4, 0]} />
        <Bar dataKey="progress" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
