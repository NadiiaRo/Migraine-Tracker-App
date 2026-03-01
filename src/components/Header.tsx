// What “sticky” gives you

// Header sticks to the top even when scrolling

// Unlike fixed, it doesn’t cover content → no extra padding needed

// Smooth + modern for apps

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <AppBar 
      position="sticky"
      color="primary"
      sx={{ top: 0, zIndex: 1100 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* App title */}
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Migraine Tracker
        </Typography>

        {/* User info + logout */}
        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body1">{user.email}</Typography>

            <Button 
              variant="outlined" 
              color="inherit" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
