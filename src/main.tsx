import React from "react";
import { createRoot } from 'react-dom/client'
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9c6bff",   // lavender for headache tracker
    },
    secondary: {
      main: "#7b61ff",
    },
    background: {
      default: "#f5f5f7", // iOS gray
      paper: "#ffffff",
    },
  },

  shape: {
    borderRadius: 4, // soft iOS corners
  },

  typography: {
    fontFamily: `"SF Pro Display", "Inter", "Roboto", sans-serif`,
  },
});

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
)
