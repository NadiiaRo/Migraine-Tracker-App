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
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Stack
} from "@mui/material";

interface Props {
  onAdd: (entry: HeadacheEntry) => void;
}

const symptomsList = [
  "nausea",
  "vomiting",
  "light sensitivity",
  "sound sensitivity",
  "dizziness",
  "confusion",
  "tinnitus",
  "eye pain",
  "lightheaded"
];

export default function HeadacheForm({ onAdd }: Props) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [onset, setOnset] = useState("average");
  const [hoursOfSleep, setHoursOfSleep] = useState(8);
  const [stressLevel, setStressLevel] = useState(5);
  const [activityLevel, setActivityLevel] = useState(5);
  const [painLocation, setPainLocation] = useState("front");
  const [painLevel, setPainLevel] = useState(5);
  const [otherSymptoms, setOtherSymptoms] = useState<string[]>([]);
  const [reliefMeasures, setReliefMeasures] = useState("");

  const handleSymptomChange = (symptom: string) => {
    setOtherSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    const duration = (end.getTime() - start.getTime()) / 60000; // minutes

    const newEntry: HeadacheEntry = {
      id: Date.now(),
      date,
      startTime,
      endTime,
      duration,
      onset: onset as any,
      hoursOfSleep,
      stressLevel,
      activityLevel,
      painLocation: painLocation as any,
      painLevel,
      otherSymptoms,
      reliefMeasures
    };
    onAdd(newEntry);
    // reset form
    setDate("");
    setStartTime("");
    setEndTime("");
    setOnset("average");
    setHoursOfSleep(8);
    setStressLevel(5);
    setActivityLevel(5);
    setPainLocation("front");
    setPainLevel(5);
    setOtherSymptoms([]);
    setReliefMeasures("");
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Add Headache
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>

            <TextField
              label="Date"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <Stack direction="row" spacing={2}>
              <TextField
                label="Start Time"
                type="time"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
                label="End Time"
                type="time"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Stack>

            <FormControl fullWidth>
              <InputLabel>Onset</InputLabel>
              <Select
                value={onset}
                onChange={e => setOnset(e.target.value)}
                label="Onset"
              >
                <MenuItem value="slow">Slow</MenuItem>
                <MenuItem value="average">Average</MenuItem>
                <MenuItem value="rapid">Rapid</MenuItem>
                <MenuItem value="sudden">Sudden</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Hours of Sleep"
              type="number"
              value={hoursOfSleep}
              onChange={e => setHoursOfSleep(Number(e.target.value))}
              fullWidth
            />

            <Typography>Stress Level</Typography>
            <Slider
              value={stressLevel}
              onChange={(_, v) => setStressLevel(v as number)}
              min={1}
              max={10}
              marks
              valueLabelDisplay="auto"
            />

            <Typography>Activity Level</Typography>
            <Slider
              value={activityLevel}
              onChange={(_, v) => setActivityLevel(v as number)}
              min={1}
              max={10}
              marks
              valueLabelDisplay="auto"
            />

            <FormControl fullWidth>
              <InputLabel>Pain Location</InputLabel>
              <Select
                value={painLocation}
                onChange={e => setPainLocation(e.target.value)}
                label="Pain Location"
              >
                <MenuItem value="front">Front</MenuItem>
                <MenuItem value="left">Left</MenuItem>
                <MenuItem value="back">Back</MenuItem>
                <MenuItem value="right">Right</MenuItem>
              </Select>
            </FormControl>

            <Typography>Pain Level</Typography>
            <Slider
              value={painLevel}
              onChange={(_, v) => setPainLevel(v as number)}
              min={1}
              max={10}
              marks
              valueLabelDisplay="auto"
            />

            <Typography>Other Symptoms</Typography>
            <FormGroup row>
              {symptomsList.map(symptom => (
                <FormControlLabel
                  key={symptom}
                  control={
                    <Checkbox
                      checked={otherSymptoms.includes(symptom)}
                      onChange={() => handleSymptomChange(symptom)}
                    />
                  }
                  label={symptom}
                />
              ))}
            </FormGroup>

            <TextField
              label="Relief Measures"
              value={reliefMeasures}
              onChange={e => setReliefMeasures(e.target.value)}
              fullWidth
              multiline
              rows={2}
            />

            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
