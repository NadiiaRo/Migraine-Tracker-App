import { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { useAuth } from "./context/AuthContext";
import { db } from "./firebase";

import Header from "./components/Header";
import HeadacheForm from "./components/HeadacheForm";
import HeadacheList from "./components/HeadacheList";
import { MonthlyChart } from "./components/MonthlyChart";

import "./App.css";

/* ============================= */
/*            TYPES              */
/* ============================= */

export interface HeadacheEntry {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  onset: "slow" | "average" | "rapid" | "sudden";
  hoursOfSleep: number;
  stressLevel: number;
  activityLevel: number;
  painLocation:
    | "forehead"
    | "temple"
    | "backOfHead"
    | "eyes"
    | "neck"
    | "other";
  painLevel: number;
  otherSymptoms: string[];
  reliefMeasures: string;
}

/* ============================= */
/*         DASHBOARD APP         */
/* ============================= */

function App() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<HeadacheEntry[]>([]);

  /* ============================= */
  /*     FIRESTORE SUBSCRIPTION    */
  /* ============================= */

  useEffect(() => {
    if (!user) return;

    const entriesQuery = query(
      collection(db, "users", user.uid, "entries"),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(entriesQuery, (snapshot) => {
      const data = snapshot.docs.map(
        (doc) => doc.data() as HeadacheEntry
      );
      setEntries(data);
    });

    return unsubscribe;
  }, [user]);

  /* ============================= */
  /*            LAYOUT             */
  /* ============================= */

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      {/* Top Header */}
      <Header />

      <Box sx={{ display: "flex" }}>
        {/* Sidebar */}
        <Paper
          elevation={0}
          sx={{
            width: 360,
            flexShrink: 0,
            p: 3,
            overflowY: "auto",
            position: "sticky",
            height: "calc(100vh - 80px)",
            borderRight: "1px solid rgba(0,0,0,0.08)",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(18px)",
          }}
        >
          <HeadacheForm />
        </Paper>

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              letterSpacing: -0.5,
              color: "#1c1c1e",
            }}
          >
            Dashboard
          </Typography>

          {/* Monthly Chart Card */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              backgroundColor: "white",
              boxShadow:
                "0px 6px 20px rgba(0,0,0,0.06), 0px 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Monthly Frequency
            </Typography>
            <MonthlyChart entries={entries} />
          </Paper>

          {/* Recent Entries Card */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              backgroundColor: "white",
              boxShadow:
                "0px 6px 20px rgba(0,0,0,0.06), 0px 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Recent Entries
            </Typography>
            <HeadacheList entries={entries} />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default App;