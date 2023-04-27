import React from "react";
import styles from "./LoadingSkeleton.module.css";

export default function LoadingSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.header} />
      <div className={styles.content} />
      <div className={styles.content} />
      <div className={styles.content} />
      <div className={styles.content} />
      <div className={styles.content} />
    </div>
  );
}
