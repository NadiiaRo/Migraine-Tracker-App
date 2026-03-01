import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  Button,
  TextField,
  Stack,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import "../styles/Login.css";

export default function SignIn() {
  const navigate = useNavigate(); // create navigate

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/dashboard"); // redirect after login
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      navigate(""); // redirect after signup
    } catch (err: any) {
      setError(err.message);
      console.error("SIGNUP ERROR:", err);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Sign In</Typography>
        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          {error && <Typography color="error">{error}</Typography>}
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleSignIn}>
              Sign In
            </Button>
            <Button variant="outlined" onClick={handleSignUp}>
              Sign Up
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

// 💡 What Happens After Fix

// App load flow:

// user = undefined → show loading

// Firebase checks auth

// If not logged in → show Login

// After login → user updates → redirect to Dashboard

// No more flashing.

// 🧠 Why This Is Important (Interview Level)

// This is called:

// "Handling async auth state hydration"