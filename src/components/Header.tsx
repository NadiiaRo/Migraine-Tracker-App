// VERSION 1
// function Header() {
//     return (
//         <div>
//             <h1>Hello, Headache Tracker!</h1>
//         </div>
//     );
// }

// export default Header;


// VERSION 2
// import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
// import { useAuth } from "../context/AuthContext";

// export default function Header() {
//   const { user } = useAuth();

//   const handleLogout = async () => {
//     await signOut(auth);
//   };

//   return (
//     <AppBar position="static" color="primary">
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//         {/* App name */}
//         <Typography variant="h6" sx={{ fontWeight: 600 }}>
//           Headache Tracker
//         </Typography>

//         {/* If user is logged in → show email + logout */}
//         {user && (
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <Typography variant="body1">
//               {user.email}
//             </Typography>

//             <Button
//               variant="outlined"
//               color="inherit"
//               onClick={handleLogout}
//             >
//               Logout
//             </Button>
//           </Box>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// }


// VERSION 3
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
          Headache Tracker
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
