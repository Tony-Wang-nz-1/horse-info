import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";

import AddOrEditHorseForm from "./AddOrEditHorseForm";
import { Horse } from "./ListHorses";

type EditHorseProps = {
  horse: Horse;
};

const EditHorse: React.FC<EditHorseProps> = ({ horse }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <EditIcon onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit horse</DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom>Edit horse</DialogContentText>
          <AddOrEditHorseForm close={handleClose} horse={horse} />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default EditHorse;
