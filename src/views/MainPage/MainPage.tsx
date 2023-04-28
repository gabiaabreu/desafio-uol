import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../../components/atoms/Button";
import UserCard from "../../components/molecules/UserCard";
import { deleteUser, getAllUsers, getUsersByPage } from "../../services";
import { UserType } from "../../types";
import styles from "../MainPage/MainPage.module.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LoadingSkeleton from "../../components/atoms/LoadingSkeleton/LoadingSkeleton";

export default function MainPage() {
  const [pageList, setPageList] = useState<UserType[]>([]);
  const [usersList, setUsersList] = useState<UserType[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsersByPage(page).then((data: UserType[]) => {
      setPageList(data);
    });
  }, [page, pageList]);

  useEffect(() => {
    getAllUsers().then((data: UserType[]) => {
      setUsersList(data);
      setIsLoading(false);
    });
  }, [page]);

  const deleteHandler = (id: string) => {
    deleteUser(id);
  };

  function nextPage() {
    setPage((currentPage) => currentPage + 1);
  }

  function previousPage() {
    setPage((currentPage) => currentPage - 1);
  }

  const pageQty = Math.ceil(usersList?.length / 5);
  const isLastPage = page === pageQty;

  return (
    <div className={styles.page}>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className={styles.content}>
          <div className={styles.usersContent}>
            <div className={styles.titleText}>
              <p className={styles.usersTitle}>Listagem de usuários</p>
              <p className={styles.usersText}>
                Escolha um cliente para visualizar os detalhes
              </p>
            </div>
            <Button
              text="Novo cliente"
              variant="secondary"
              linkTo="/newuser"
              styleProps={{ minWidth: "130px" }}
            />
          </div>
          {pageList?.map((user: UserType) => (
            <UserCard
              key={user.id}
              user={user}
              deleteHandler={() => deleteHandler(user.id)}
            />
          ))}
          <div className={styles.lastLine}>
            <p className={styles.usersText}>
              {pageList.length > 1
                ? `Exibindo ${pageList.length} clientes`
                : `Exibindo ${pageList.length} cliente`}
            </p>
            <IconButton onClick={() => previousPage()} disabled={page === 1}>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton onClick={() => nextPage()} disabled={isLastPage}>
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
}
