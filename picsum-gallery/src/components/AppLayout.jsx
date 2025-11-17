import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

/**
 * Application shell that keeps the header consistent across pages.
 */
const AppLayout = ({ children }) => (
  <Box
    minHeight="100vh"
    display="flex"
    flexDirection="column"
    bgcolor="background.default"
  >
    <AppBar position="sticky" enableColorOnDark>
      <Toolbar>
        <PhotoCameraIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div">
          Picsum Gallery
        </Typography>
      </Toolbar>
    </AppBar>

    <Box component="main" flexGrow={1}>
      {children}
    </Box>
  </Box>
);

export default AppLayout;