import './App.css';
import Header from './components/Header.tsx';
import HeadacheForm from './components/HeadacheForm.tsx';
import HeadacheList from './components/HeadacheList.tsx';
import { Container } from '@mui/material';
import { useState } from 'react';

export interface HeadacheEntry {
  id: number;
  date: string;               // "YYYY-MM-DD"
  startTime: string;          // "HH:MM"
  endTime: string;            // "HH:MM"
  duration: number;           // in minutes, calculated automatically
  onset: "slow" | "average" | "rapid" | "sudden";
  hoursOfSleep: number;       // in hours
  stressLevel: number;        // 1-10
  activityLevel: number;      // 1-10
  painLocation: "front" | "left" | "back" | "right";
  painLevel: number;          // 1-10
  otherSymptoms: string[];    // array of selected symptoms
  reliefMeasures: string;     // text input for medications or actions
}

function App() {
  const [entries, setEntries] = useState<HeadacheEntry[]>([]);

  // Function to add a new headache entry
  const addEntry = (entry: HeadacheEntry) => {
    setEntries([entry, ...entries]);
  };

  return (
    <div>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {/* Form goes here */}
        <HeadacheForm onAdd={addEntry} />
        {/* List of entries */}
        <HeadacheList entries={entries} />
      </Container>
    </div>
  );
}

export default App;
