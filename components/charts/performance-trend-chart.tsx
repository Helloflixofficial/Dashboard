"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", performance: 85, efficiency: 78 },
  { month: "Feb", performance: 88, efficiency: 82 },
  { month: "Mar", performance: 92, efficiency: 85 },
  { month: "Apr", performance: 89, efficiency: 88 },
  { month: "May", performance: 94, efficiency: 91 },
  { month: "Jun", performance: 96, efficiency: 93 },
]

export function PerformanceTrendChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
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
          formatter={(value, name) => [`${value}%`, name === "performance" ? "Performance" : "Efficiency"]}
        />
        <Area
          type="monotone"
          dataKey="performance"
          stroke="hsl(var(--chart-1))"
          fillOpacity={1}
          fill="url(#performanceGradient)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="efficiency"
          stroke="hsl(var(--chart-2))"
          fillOpacity={1}
          fill="url(#efficiencyGradient)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
