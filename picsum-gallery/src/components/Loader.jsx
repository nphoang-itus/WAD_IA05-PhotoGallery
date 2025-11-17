import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        my: 4, // margin-top = margin-bottom = 4
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
