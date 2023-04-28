import React from "react";
import styles from "./AlertDialog.module.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Button from "../Button";
import { VariantStyles } from "../Button/Button";

type AlertDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  title?: string;
  content: string;
  leftButtonText?: string;
  rightButtonText?: string;
};

function AlertDialog({
  isOpen,
  handleClose,
  handleSubmit,
  title,
  content,
  leftButtonText,
  rightButtonText,
}: AlertDialogProps) {
  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onPress={handleClose}
            text={leftButtonText ?? "Cancelar"}
            variant={VariantStyles.PRIMARY}
          />
          <Button
            onPress={handleSubmit}
            text={rightButtonText ?? "Confirmar"}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog;
