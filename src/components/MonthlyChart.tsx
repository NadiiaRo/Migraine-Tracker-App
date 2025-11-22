// import { BarChart } from "@mui/x-charts/BarChart";
// import type { HeadacheEntry } from "../App";

// interface MonthlyChartProps {
//   entries: HeadacheEntry[];
// }

// export function MonthlyChart({ entries }: MonthlyChartProps) {
//   // Group entries by year-month
//   const stats = entries.reduce((acc: Record<string, number>, e) => {
//     const month = e.date.slice(0, 7); // e.g., "2025-03"
//     acc[month] = (acc[month] || 0) + 1;
//     return acc;
//   }, {});

//   // Convert to array for charting
//   const labels = Object.keys(stats).sort();
//   const data = labels.map((month) => stats[month]);

//   return (
//     <BarChart
//       xAxis={[{ scaleType: "band", data: labels }]}
//       series={[{ data }]}
//       width={600}
//       height={350}
//     />
//   );
// }


import { BarChart } from "@mui/x-charts/BarChart";
import type { HeadacheEntry } from "../App";

interface MonthlyChartProps {
  entries: HeadacheEntry[];
}

export function MonthlyChart({ entries }: MonthlyChartProps) {
  // 1. Determine current month (YYYY-MM)
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0–11

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 2. Build array of days: ["2025-03-01", ..., "2025-03-31"]
  const pad = (n: number) => String(n).padStart(2, "0");
  const monthStr = `${year}-${pad(month + 1)}`;

  const allDays = Array.from({ length: daysInMonth }, (_, i) => {
    const day = pad(i + 1);
    return `${monthStr}-${day}`;
  });

  // 3. Map entries by date: date → painLevel
  const map = new Map<string, number>();
  entries.forEach((e) => {
    if (e.date.startsWith(monthStr)) {
      map.set(e.date, e.painLevel);
    }
  });

  // 4. Build chart data (full month)
  const data = allDays.map((d) => map.get(d) ?? 1); // missing day = height 1
  const labels = allDays.map((d) => d.slice(8)); // show only day number

  // 5. Color each bar
  const barColors = allDays.map((d) =>
    map.has(d) ? "var(--mui-palette-primary-main)" : "#d0d0d0"
  );

  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: labels }]}
      series={[
        {
          data,
          color: barColors, // <-- MUI X-Charts supports array of colors
        },
      ]}
      width={800}
      height={350}
    />
  );
}
