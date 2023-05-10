import React, { useEffect, useState } from "react";
import styles from "../UserForm/UserForm.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import { UserType } from "../../../types";
import { VariantStyles } from "../../atoms/Button/Button";
import { IconButton, MenuItem, Snackbar, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

  const [toggleSnackbar, setToggleSnackbar] = useState(false);

  const handleBackPress = () => {
    navigate(-1);
  };

  const [userInfo, setUserInfo] = useState<UserType>({
    id: "",
    name: "",
    email: "",
    cpf: "",
    phone: "",
    status: "",
  });

  console.log(userInfo);

  useEffect(() => {
    previousValues && setUserInfo(previousValues);
  }, [previousValues]);

  useEffect(() => {
    previousValues && reset(userInfo);
  }, [userInfo]);

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

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
      <Snackbar
        open={toggleSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={() => setToggleSnackbar(false)}
        message={
          previousValues
            ? "Usuário editado com sucesso"
            : "Usuário criado com sucesso"
        }
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setToggleSnackbar(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        autoHideDuration={4000}
      />
      <form className={styles.forms} onSubmit={handleSubmit(onSubmitHandler)}>
        <TextField
          id="outlined-basic"
          label={"Nome"}
          variant="outlined"
          {...register("name")}
          value={userInfo.name}
          onChange={handleChange}
        />
        <p className={styles.errorMessage}>{errors.name?.message as string}</p>
        <TextField
          type="email"
          id="outlined-basic"
          label={"E-mail"}
          variant="outlined"
          {...register("email")}
          value={userInfo.email}
          onChange={handleChange}
        />
        <p className={styles.errorMessage}>{errors.email?.message as string}</p>
        <TextField
          id="outlined-basic"
          label={"CPF"}
          variant="outlined"
          {...register("cpf")}
          value={userInfo.cpf}
          onChange={handleChange}
        />
        <p className={styles.errorMessage}>{errors.cpf?.message as string}</p>
        <TextField
          id="outlined-basic"
          label={"Telefone"}
          variant="outlined"
          {...register("phone")}
          value={userInfo.phone}
          onChange={handleChange}
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
            onPress={() => setToggleSnackbar(true)}
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
