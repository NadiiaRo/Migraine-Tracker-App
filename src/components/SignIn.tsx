import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { Button, TextField, Stack, Typography, Card, CardContent } from "@mui/material";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created!");
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
            <Button variant="contained" onClick={handleSignIn}>Sign In</Button>
            <Button variant="outlined" onClick={handleSignUp}>Sign Up</Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
