import PropTypes from "prop-types";
import { Box, CircularProgress, Typography } from "@mui/material";

/**
 * Reusable loader that optionally shows a helper message.
 */
const Loader = ({ message, fullHeight = false }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      my: 4,
      minHeight: fullHeight ? "50vh" : "auto",
      gap: 2,
    }}
  >
    <CircularProgress />
    {message && (
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    )}
  </Box>
);

Loader.propTypes = {
  message: PropTypes.string,
  fullHeight: PropTypes.bool,
};

export default Loader;
