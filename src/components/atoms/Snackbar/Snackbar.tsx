import React from "react";
import { IconButton, Snackbar as MUISnackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface SnackbarProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function Snackbar({ isOpen, onClose, message }: SnackbarProps) {
  return (
    <MUISnackbar
      open={isOpen}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={onClose}
      message={message}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
      autoHideDuration={4000}
    />
  );
}
