import type { HeadacheEntry } from "../App";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  entries: HeadacheEntry[];
  onDelete: (id: string) => void;
}

export default function HeadacheList({ entries }: Props) {
  if (entries.length === 0) {
    return <Typography>No headaches logged yet.</Typography>;
  }

    const { user } = useAuth();

  const handleDelete = async (id: string) => {
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "entries", id));  
  };
  console.log(entries);

  return (
    <Stack spacing={2}>
      {entries.map((entry) => (
        <Card key={entry.id} variant="outlined">
          <CardContent>

          <IconButton
            size="small"
            onClick={() => {
              console.log("Deleting entry id:", entry.id);
              handleDelete(entry.id);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>

            {/* Top section */}
            <Typography variant="h6">
              {entry.date} – {entry.startTime} → {entry.endTime}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Duration: {entry.duration} min | Onset: {entry.onset}
            </Typography>

            <Divider sx={{ my: 1 }} />

            {/* Middle section */}
            <Typography>
              Sleep: {entry.hoursOfSleep} hrs | Stress: {entry.stressLevel}/10 | 
              Activity: {entry.activityLevel}/10
            </Typography>

            <Typography>
              Pain Location: {entry.painLocation} | Pain Level: {entry.painLevel}/10
            </Typography>

            {/* Symptoms */}
            {entry.otherSymptoms.length > 0 && (
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
                {entry.otherSymptoms.map((symptom) => (
                  <Chip key={symptom} label={symptom} size="small" />
                ))}
              </Stack>
            )}

            {/* Relief measures */}
            {entry.reliefMeasures && (
              <Typography sx={{ mt: 1 }}>
                Relief: {entry.reliefMeasures}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
