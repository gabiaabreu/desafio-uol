import React, { useState } from "react";
import styles from "../UserCard/UserCard.module.css";
import { UserType } from "../../../types";
import Button from "../../atoms/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import StatusIcon from "../../atoms/StatusIcon/StatusIcon";
import AlertDialog from "../../atoms/AlertDialog";
import { VariantStyles } from "../../atoms/Button/Button";

type UserCardProps = {
  user: UserType;
  deleteHandler: () => void;
};

export default function UserCard({ user, deleteHandler }: UserCardProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#e29933",
      },
    },
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  function handleCloseDialog() {
    setDialogOpen(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.card}>
        <div className={styles.nameEmail}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
        <div className={styles.cpfPhone}>
          <p>{user.cpf}</p>
          <p>{user.phone}</p>
        </div>
        <div className={styles.status}>
          <StatusIcon status={user.status} />
        </div>
        <Button
          text="Editar"
          variant={VariantStyles.PRIMARY}
          styleProps={{ maxWidth: "110px" }}
          linkTo={`/edit/${user.id}`}
        />
        <IconButton
          color="primary"
          onClick={() => setDialogOpen(true)}
          style={{ backgroundColor: "transparent", maxWidth: "30px" }}
          disableRipple
        >
          <DeleteOutlineIcon />
        </IconButton>
      </div>
      <AlertDialog
        isOpen={dialogOpen}
        handleClose={handleCloseDialog}
        handleSubmit={deleteHandler}
        title="Tem certeza que deseja excluir?"
        content="Essa ação não poderá ser desfeita"
      />
    </ThemeProvider>
  );
}
