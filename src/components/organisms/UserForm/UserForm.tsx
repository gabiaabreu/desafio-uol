import React, { useEffect, useState } from "react";
import styles from "../UserForm/UserForm.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import { UserType } from "../../../types";
import { VariantStyles } from "../../atoms/Button/Button";
import { MenuItem, TextField } from "@mui/material";

interface UserFormProps {
  onSubmitHandler: (data: FieldValues) => void;
  previousValues?: UserType;
}

const statusDict = [
  { value: "1", label: "Ativo" },
  { value: "2", label: "Inativo" },
  { value: "3", label: "Aguardando ativação" },
  { value: "4", label: "Desativado" },
];

export default function UserForm({
  onSubmitHandler,
  previousValues,
}: UserFormProps) {
  const navigate = useNavigate();

  const handleBackPress = () => {
    navigate(-1);
  };

  const [userInfo, setUserInfo] = useState<UserType>();
  const [name, setName] = useState(userInfo?.name);
  const [email, setEmail] = useState(userInfo?.email);
  const [cpf, setCpf] = useState(userInfo?.cpf);
  const [phone, setPhone] = useState(userInfo?.phone);

  console.log(userInfo);

  useEffect(() => {
    previousValues && setUserInfo(previousValues);
    reset(userInfo);
    setName(userInfo?.name);
    setEmail(userInfo?.email);
    setCpf(userInfo?.cpf);
    setPhone(userInfo?.phone);
  }, [previousValues, userInfo]);

  const userSchema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório!"),
    email: yup.string().email().required("E-mail é obrigatório!"),
    cpf: yup
      .string()
      .length(11, "Insira um CPF válido")
      .required("CPF é obrigatório!"),
    phone: yup
      .string()
      .min(10, "Telefone deve conter entre 10 e 11 caracteres.")
      .max(11, "Telefone deve conter entre 10 e 11 caracteres.")
      .required("Telefone é obrigatório!"),
    status: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  return (
    <div className={styles.container}>
      <div className={styles.titleText}>
        <p className={styles.usersTitle}>
          {previousValues ? "Editar Usuário" : "Criar novo usuário"}
        </p>
        <p className={styles.usersText}>
          {"Informe os campos a seguir para "}
          {previousValues ? "editar o usuário:" : "cadastrar um novo usuário:"}
        </p>
      </div>
      <form className={styles.forms} onSubmit={handleSubmit(onSubmitHandler)}>
        <TextField
          id="outlined-basic"
          label={"Nome"}
          variant="outlined"
          {...register("name")}
          value={name ?? ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setName(event.target.value)
          }
        />
        <p className={styles.errorMessage}>{errors.name?.message as string}</p>
        <TextField
          type="email"
          id="outlined-basic"
          label={"E-mail"}
          variant="outlined"
          {...register("email")}
          value={email ?? ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
        />
        <p className={styles.errorMessage}>{errors.email?.message as string}</p>
        <TextField
          id="outlined-basic"
          label={"CPF"}
          variant="outlined"
          {...register("cpf")}
          value={cpf ?? ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setCpf(event.target.value)
          }
        />
        <p className={styles.errorMessage}>{errors.cpf?.message as string}</p>
        <TextField
          id="outlined-basic"
          label={"Telefone"}
          variant="outlined"
          {...register("phone")}
          value={phone ?? ""}
        />
        <p className={styles.errorMessage}>{errors.phone?.message as string}</p>
        <TextField
          id="outlined-basic"
          select
          label={"Status"}
          variant="outlined"
          {...register("status")}
          defaultValue={previousValues?.status ?? "1"}
        >
          {statusDict.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              {status.label}
            </MenuItem>
          ))}
        </TextField>
        <div className={styles.buttons}>
          <Button
            variant={VariantStyles.SECONDARY}
            text={previousValues ? "Editar" : "Criar"}
            type="submit"
            styleProps={{ width: "100px", marginRight: "15px" }}
          />
          <Button
            variant={VariantStyles.PRIMARY}
            text="Voltar"
            onPress={handleBackPress}
            styleProps={{ width: "100px" }}
          />
        </div>
      </form>
    </div>
  );
}
