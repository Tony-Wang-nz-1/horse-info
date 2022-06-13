import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ListHorses from "../organisms/ListHorses";
import AddHorse from "../organisms/AddHorse";

const HorseListPage = () => {
  return (
    <Container fixed>
      <Box>
        <Typography variant="h2" component="div" gutterBottom>
          Horse
        </Typography>
        <AddHorse />
        <ListHorses />
      </Box>
    </Container>
  );
};

export default HorseListPage;
