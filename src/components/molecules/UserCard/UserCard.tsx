import React from "react";
import styles from "../UserCard/UserCard.module.css";
import { UserType } from "../../../types";
import Button from "../../atoms/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteUser } from "../../../services";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import StatusIcon from "../../atoms/StatusIcon/StatusIcon";

export default function UserCard(user: UserType) {
  const deleteHandler = () => {
    user && deleteUser(user.id);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#e29933",
      },
    },
  });

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
          variant="primary"
          styleProps={{ maxWidth: "110px" }}
          linkTo={`/edit/${user.id}`}
        />
        <IconButton
          color="primary"
          onClick={deleteHandler}
          style={{ backgroundColor: "transparent", maxWidth: "30px" }}
          disableRipple
        >
          <DeleteOutlineIcon />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}
