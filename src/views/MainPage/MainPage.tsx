import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/atoms/Button";
import UserCard from "../../components/molecules/UserCard";
import { getAllUsers } from "../../services";
import { UserType } from "../../types";
import styles from "../MainPage/MainPage.module.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function MainPage() {
  const [usersList, setUsersList] = useState<UserType[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllUsers(page).then((data: UserType[]) => {
      setUsersList(data);
      // setUsersList((prevData: UserType[]) => [...prevData, ...data]);
    });
  }, [page]);

  function nextPage() {
    setPage((currentPage) => currentPage + 1);
  }

  function previousPage() {
    setPage((currentPage) => currentPage - 1);
  }

  // const isLastPage = usersList.length / 5 >= 1;

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.usersContent}>
          <div className={styles.titleText}>
            <p className={styles.usersTitle}>Listagem de usuários</p>
            <p className={styles.usersText}>
              Escolha um cliente para visualizar os detalhes
            </p>
          </div>
          <div className={styles.button}>
            <Link to={"/newuser"} style={{ textDecoration: "none" }}>
              <Button text="Novo cliente" variant="secondary" />
            </Link>
          </div>
        </div>
        {usersList?.map((user: UserType) => (
          <UserCard key={user.id} {...user} />
        ))}
        <div className={styles.lastLine}>
          <p className={styles.usersText}>
            {usersList && `Exibindo ${usersList.length} clientes`}
          </p>
          <IconButton onClick={() => previousPage()} disabled={page === 1}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={() => nextPage()} >
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
