import React from "react";
import styles from "../StatusIcon/StatusIcon.module.css";
import CircleIcon from "@mui/icons-material/Circle";

type StatusIconProps = {
  status: string;
};

export enum StatusCodeEnum {
  ACTIVE = "1",
  INACTIVE = "2",
  AWAITING = "3",
  DEACTIVATED = "4",
}

function getStatusText(status: string) {
  switch (status) {
    case StatusCodeEnum.ACTIVE:
      return { text: "Ativo", color: "#49ad5b" };
    case StatusCodeEnum.INACTIVE:
      return { text: "Inativo", color: "#d6323f" };
    case StatusCodeEnum.AWAITING:
      return { text: "Aguardando ativação", color: "#d2a710" };
    case StatusCodeEnum.DEACTIVATED:
      return { text: "Desativado", color: "#d2d2d2" };
  }
}

export default function StatusIcon({ status }: StatusIconProps) {
  const statusInfo = getStatusText(status);

  return (
    <div className={styles.container}>
      <CircleIcon style={{ fontSize: "14px", color: `${statusInfo?.color}` }} />
      <p className={styles.text}>{statusInfo?.text}</p>
    </div>
  );
}
