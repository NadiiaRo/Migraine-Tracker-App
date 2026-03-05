import { useState } from "react";
import type { HeadacheEntry } from "../App";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Slider,
  FormControl,
  InputLabel,
  Select,
  Button,
  Stack
} from "@mui/material";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { collection, addDoc } from "firebase/firestore";

const symptomsList = [
  "nausea", "vomiting", "light sensitivity", "sound sensitivity", "aura",
  "dizziness", "fatigue", "tinnitus", "eye pain",
];

export default function HeadacheForm() {
  const { user } = useAuth();

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [onset, setOnset] = useState("average");
  const [painLocation, setPainLocation] = useState("temple");
  const [painLevel, setPainLevel] = useState(5);
  const [hoursOfSleep, setHoursOfSleep] = useState(8);
  const [stressLevel, setStressLevel] = useState(5);
  const [activityLevel, setActivityLevel] = useState(5);
  const [otherSymptoms, setOtherSymptoms] = useState<string[]>([]);
  const [reliefMeasures, setReliefMeasures] = useState("");

  const handleSymptomChange = (symptom: string) => {
    setOtherSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!date || !startTime || !endTime) {
      console.log("Missing required fields");
      return;
    }
  
    try {
      const start = new Date(`1970-01-01T${startTime}`);
      const end = new Date(`1970-01-01T${endTime}`);
      const duration = (end.getTime() - start.getTime()) / 60000;
  
      const newEntry: HeadacheEntry = {
        id: Date.now(),
        date,
        startTime,
        endTime,
        duration,
        onset: onset as any,
        painLocation: painLocation as any,
        painLevel,
        hoursOfSleep,
        stressLevel,
        activityLevel,
        otherSymptoms,
        reliefMeasures
      };
  
      if (!user) {
        console.error("User missing");
        return;
      }
  
      await addDoc(
        collection(db, "users", user.uid, "entries"),
        newEntry
      );
  
      console.log("Entry saved");
  
      // reset form
      setDate("");
      setStartTime("");
      setEndTime("");
      setOnset("average");
      setHoursOfSleep(8);
      setStressLevel(5);
      setActivityLevel(5);
      setPainLocation("temple");
      setPainLevel(5);
      setOtherSymptoms([]);
      setReliefMeasures("");
  
    } catch (error) {
      console.error("Firestore save error:", error);
    }
  };

  return (
    <Card
      sx={{
        position: "sticky",
        top: 20,
        p: 2,
        borderRadius: 4,
        backdropFilter: "blur(20px)",
        background: "rgba(255,255,255,0.55)",
        boxShadow: "0 8px 28px rgba(0,0,0,0.1)"
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 600,
            fontSize: "1.1rem",
            color: "#111",
          }}
        >
          Add Headache
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>

            <TextField
            size="small"
              label="Date"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <Stack direction="row" spacing={2}>
              <TextField
              size="small"
                label="Start Time"
                type="time"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
              size="small"
                label="End Time"
                type="time"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Stack>

            <FormControl fullWidth size="small">
              <InputLabel>Onset</InputLabel>
              <Select value={onset} onChange={e => setOnset(e.target.value)} label="Onset">
                <MenuItem value="slow">Slow</MenuItem>
                <MenuItem value="average">Average</MenuItem>
                <MenuItem value="rapid">Rapid</MenuItem>
                <MenuItem value="sudden">Sudden</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Pain Location</InputLabel>
              <Select
                value={painLocation}
                onChange={e => setPainLocation(e.target.value)}
                label="Pain Location"
              >
                <MenuItem value="forehead">Forehead</MenuItem>
                <MenuItem value="temple">Temple</MenuItem>
                <MenuItem value="backOfHead">Back Of Head</MenuItem>
                <MenuItem value="eyes">Eyes</MenuItem>
                <MenuItem value="neck">Neck</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            <Typography sx={{ fontWeight: 500 }}>Pain Level</Typography>
            <Slider
            size="small"
              value={painLevel}
              onChange={(_, v) => setPainLevel(v as number)}
              min={1}
              max={10}
              valueLabelDisplay="auto"
            />

            <TextField
            size="small"
              label="Hours of Sleep"
              type="number"
              value={hoursOfSleep}
              onChange={e => setHoursOfSleep(Number(e.target.value))}
              fullWidth
            />

<Typography sx={{ fontWeight: 500, fontSize: "2 rem" }}>
  Other Symptoms
</Typography>

<Stack
  direction="row"
  flexWrap="wrap"
  gap={1}
  sx={{ mt: 0.5 }}
>
  {symptomsList.map((symptom) => {
    const selected = otherSymptoms.includes(symptom);

    return (
      <Button
        key={symptom}
        variant={selected ? "contained" : "outlined"}
        onClick={() => handleSymptomChange(symptom)}
        sx={{
          textTransform: "none",
          borderRadius: "20px",
          px: 2.2,
          py: 0.8,
          fontSize: "1 rem",
          minHeight: "28px",
          backgroundColor: selected ? "primary.main" : "rgba(0,0,0,0.05)",
          color: selected ? "#fff" : "#333",
          borderColor: "rgba(0,0,0,0.08)",
          "&:hover": {
            backgroundColor: selected
              ? "primary.dark"
              : "rgba(0,0,0,0.1)",
          },
        }}
      >
        {symptom}
      </Button>
    );
  })}
</Stack>

            <TextField
            size="small"

              label="Relief Measures"
              value={reliefMeasures}
              onChange={e => setReliefMeasures(e.target.value)}
              fullWidth
              multiline
              rows={2}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 1,
                py: 1.2,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              Save Entry
            </Button>

          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
