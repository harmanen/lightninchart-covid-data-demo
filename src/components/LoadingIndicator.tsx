import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const LoadingIndicator = () => {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "2em",
    }}>
      <Box sx={{
        bgcolor: "wallpaper.main",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "20em",
        padding: "2em",
        borderRadius: "20em",
      }}>
        <Typography sx={{ color: "primary.main", marginBottom: "2em" }}> Fetching data, please wait... </Typography>
        <CircularProgress />
      </Box>
    </Box>
  )
}
