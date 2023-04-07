import React from "react";
import styles from "../PageTitle/PageTitle.module.css";
import PersonIcon from "../../../assets/Raster.png";

interface PageTitleProps {
  title?: string;
}

export default function PageTitle(props: PageTitleProps) {
  return (
    <div>
      <div className={styles.content}>
        <img src={PersonIcon} className={styles.icon} />
        <p className={styles.title}>{props.title ? props.title : "Página"}</p>
      </div>
      <div className={styles.divider}></div>
    </div>
  );
}
