import { Box, Typography } from "@material-ui/core";
import React from "react";

const SideButtons = ({ buttonContent }) => {
  const changeScreen = () => {};

  return (
    <Box
      onClick={changeScreen}
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 10,
        p: 1,
        width: "200px",
        cursor: "pointer",
        textAlign: "center",
        margin: "0.25rem",
        "&:hover": {
          transition: "0.3s",
          backgroundColor: "#30363D",
          color: "#ffffff",
          transform: "scale(1.05)",
        },
      }}
    >
      <Typography>{buttonContent}</Typography>
    </Box>
  );
};

export default SideButtons;
