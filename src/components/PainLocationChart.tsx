import { PieChart } from "@mui/x-charts/PieChart";
import { type HeadacheEntry } from "../App";

interface PainLocationChartProps {
  entries: HeadacheEntry[];
}

export function PainLocationChart({ entries }: PainLocationChartProps) {
  // Count occurrences
  const counts = {
    front: 0,
    left: 0,
    right: 0,
    back: 0,
  };

  entries.forEach((entry) => {
    if (counts[entry.painLocation as keyof typeof counts] !== undefined) {
      counts[entry.painLocation as keyof typeof counts]++;
    }
  });

  const data = [
    { id: 0, value: counts.front, label: "Front" },
    { id: 1, value: counts.left, label: "Left" },
    { id: 2, value: counts.right, label: "Right" },
    { id: 3, value: counts.back, label: "Back" },
  ];

  return (
    <PieChart
      series={[
        {
          data,
        },
      ]}
      width={450}
      height={300}
    />
  );
}
