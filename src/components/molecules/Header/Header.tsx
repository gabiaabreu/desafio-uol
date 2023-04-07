import React from "react";
import Logo from "../../../assets/uol-lg.png";
import styles from "../Header/Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <img src={Logo} className={styles.logo} />
    </div>
  );
}
