"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", sales: 4000, target: 3500 },
  { month: "Feb", sales: 3000, target: 3200 },
  { month: "Mar", sales: 5000, target: 4000 },
  { month: "Apr", sales: 4500, target: 4200 },
  { month: "May", sales: 6000, target: 5000 },
  { month: "Jun", sales: 5500, target: 5200 },
]

export function SalesPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
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
          formatter={(value, name) => [`$${value}`, name === "sales" ? "Sales" : "Target"]}
        />
        <Bar dataKey="sales" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="target" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
