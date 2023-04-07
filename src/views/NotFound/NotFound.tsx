import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button";
import styles from "../NotFound/NotFound.module.css";

export default function NotFound() {

  const navigate = useNavigate();

  const handleBackPress = () => {
    navigate(-1);
  }

  return (
    <div className={styles.container} id="error-page">
      <p className={styles.title}>404</p>
      <p className={styles.description}>Página não encontrada!</p>
      <Button variant="secondary" text="Voltar" onPress={handleBackPress} />
    </div>
  );
}
