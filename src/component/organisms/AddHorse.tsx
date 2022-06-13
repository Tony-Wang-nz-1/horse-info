import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import AddHorseForm from "./AddHorseForm";

const AddHorse = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add horse</DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom>Add a new horse</DialogContentText>
          <AddHorseForm close={handleClose} />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default AddHorse;
