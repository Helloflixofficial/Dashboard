"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { day: "Mon", sent: 120, opened: 85, clicked: 32 },
  { day: "Tue", sent: 150, opened: 110, clicked: 45 },
  { day: "Wed", sent: 180, opened: 125, clicked: 38 },
  { day: "Thu", sent: 200, opened: 140, clicked: 52 },
  { day: "Fri", sent: 170, opened: 115, clicked: 41 },
  { day: "Sat", sent: 90, opened: 65, clicked: 22 },
  { day: "Sun", sent: 80, opened: 55, clicked: 18 },
]

export function EmailMetricsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
        <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            color: "hsl(var(--popover-foreground))",
            fontSize: "12px",
          }}
          labelStyle={{ color: "hsl(var(--popover-foreground))" }}
        />
        <Line
          type="monotone"
          dataKey="sent"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: "hsl(var(--chart-1))" }}
        />
        <Line
          type="monotone"
          dataKey="opened"
          stroke="hsl(var(--chart-2))"
          strokeWidth={2}
          dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: "hsl(var(--chart-2))" }}
        />
        <Line
          type="monotone"
          dataKey="clicked"
          stroke="hsl(var(--chart-3))"
          strokeWidth={2}
          dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: "hsl(var(--chart-3))" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
