import React from "react";
import styles from "../UserCard/UserCard.module.css";
import { UserType } from "../../../types";
import Button from "../../atoms/Button";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteUser } from "../../../services";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
          <p>{user.status}</p>
        </div>
        <Link to={`/edit/${user.id}`} style={{ textDecoration: "none" }}>
          <Button text="Editar" variant="primary"></Button>
        </Link>
        <IconButton color="primary" onClick={deleteHandler} style={{ backgroundColor: 'transparent' }} >
          <DeleteOutlineIcon />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}
