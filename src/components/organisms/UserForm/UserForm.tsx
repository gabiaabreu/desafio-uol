import React, { useEffect, useState } from "react";
import styles from "../UserForm/UserForm.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import { UserType } from "../../../types";

interface UserFormProps {
  onSubmitHandler: (data: FieldValues) => void;
  id?: string;
  previousValues?: UserType;
}

export default function UserForm({
  onSubmitHandler,
  id,
  previousValues,
}: UserFormProps) {
  const navigate = useNavigate();

  const handleBackPress = () => {
    navigate(-1);
  };

  const [userInfo, setUserInfo] = useState<UserType>();

  useEffect(() => {
    previousValues && setUserInfo(previousValues);
  }, [previousValues]);

  const userSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    cpf: yup.string().length(11).required("CPF é obrigatório!"),
    phone: yup
      .string()
      .min(10, "Telefone deve conter entre 10 e 11 caracteres.")
      .max(11)
      .required(),
    status: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  console.log(previousValues);
  console.log('nome: ', userInfo?.name);

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
        <input
          type="text"
          placeholder={previousValues ? previousValues.name : "Nome"}
          {...register("name")}
          required
          defaultValue={userInfo?.name}
        />
        <p>{errors.name?.message as string}</p>
        <input
          type="email"
          placeholder="E-mail"
          {...register("email")}
          required
          defaultValue={userInfo?.email}
        />
        <p>{errors.email?.message as string}</p>
        <input type="text" placeholder="CPF" {...register("cpf")} required defaultValue={userInfo?.cpf} />
        <p>{errors.cpf?.message as string}</p>
        <input
          type="text"
          placeholder="Telefone"
          {...register("phone")}
          required
          defaultValue={userInfo?.phone}
        />
        <p>{errors.phone?.message as string}</p>
        <select {...register("status")} required defaultValue={userInfo?.status}>
          <option value={1}>Ativo</option>
          <option value={2}>Inativo</option>
          <option value={3}>Aguardando ativação</option>
          <option value={4}>Desativado</option>
        </select>
        <div className={styles.buttons}>
          <Button variant="secondary" text={previousValues ? "Editar" : "Cadastrar"} type="submit" />
          <Button variant="primary" text="Voltar" onPress={handleBackPress} />
        </div>
      </form>
    </div>
  );
}
