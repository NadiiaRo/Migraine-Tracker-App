import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
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
  },
);

// (Optional but Recommended)

// If you want your background color to apply globally, wrap your app with:

// import { CssBaseline } from "@mui/material";

// Then:

// <ThemeProvider theme={theme}>
//   <CssBaseline />
//   <RouterWrapper />
// </ThemeProvider>

// This applies:

// background color

// typography reset

// consistent styling