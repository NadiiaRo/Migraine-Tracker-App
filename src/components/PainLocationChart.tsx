import { PieChart } from "@mui/x-charts/PieChart";
import { type HeadacheEntry } from "../App";

interface PainLocationChartProps {
  entries: HeadacheEntry[];
}

export function PainLocationChart({ entries }: PainLocationChartProps) {
  // Count occurrences
  const counts = {
    forehead: 0,
    temple: 0,
    backOfHead: 0,
    eyes: 0,
    neck: 0,
    other: 0,
  };

  entries.forEach((entry) => {
    if (counts[entry.painLocation as keyof typeof counts] !== undefined) {
      counts[entry.painLocation as keyof typeof counts]++;
    }
  });

  const data = [
    { id: 0, value: counts.forehead, label: "Forehead" },
    { id: 1, value: counts.temple, label: "Temple" },
    { id: 2, value: counts.backOfHead, label: "Back Of Head" },
    { id: 3, value: counts.eyes, label: "Eyes" },
    { id: 4, value: counts.neck, label: "Neck" },
    { id: 5, value: counts.other, label: "Other" },
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
