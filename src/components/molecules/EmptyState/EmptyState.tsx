import React from "react";
import styles from "./EmptyState.module.css";

export default function EmptyState() {
  return (
    <div className={styles.container}>
      <p className={styles.mainText}>Nenhum usuário encontrado!</p>
      <p className={styles.secondaryText}>
        Clique no botão para cadastrar um novo cliente.
      </p>
    </div>
  );
}
