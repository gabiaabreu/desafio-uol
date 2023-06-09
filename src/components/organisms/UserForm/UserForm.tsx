import React, { useEffect, useState } from "react";
import styles from "../UserForm/UserForm.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import { UserType } from "../../../types";
import { VariantStyles } from "../../atoms/Button/Button";
import { Alert, MenuItem, TextField } from "@mui/material";
import { getMaskedCPF, getMaskedPhone } from "../../../utils/masks";
import Snackbar from "../../atoms/Snackbar";
import { validateCPF } from "../../../utils/cpfValidation";
import { StatusCodeEnum } from "../../atoms/StatusIcon/StatusIcon";

const statusDict = [
  { value: "1", label: "Ativo" },
  { value: "2", label: "Inativo" },
  { value: "3", label: "Aguardando ativação" },
  { value: "4", label: "Desativado" },
];

interface UserFormProps {
  onSubmitHandler: (data: FieldValues) => void;
  previousValues?: UserType;
}

export default function UserForm({
  onSubmitHandler,
  previousValues,
}: UserFormProps) {
  const navigate = useNavigate();
  const [toggleSuccessSnackbar, setToggleSuccessSnackbar] = useState(false);
  const [toggleFailSnackbar, setToggleFailSnackbar] = useState(false);

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
      .transform((value) => value.replace(/\D/g, ""))
      .test("cpf", "Insira um CPF válido", function (value) {
        return validateCPF(value);
      })
      .length(11, "Insira um CPF válido")
      .required("CPF é obrigatório!"),
    phone: yup
      .string()
      .transform((value) => value.replace(/\D/g, ""))
      .min(10, "Insira um número de telefone válido")
      .max(11, "Insira um número de telefone válido")
      .required("Telefone é obrigatório!"),
    status: yup.string().required("Status é obrigatório!"),
  });

  function validateSchema() {
    userSchema
      .validate(userInfo)
      .then(() => {
        setToggleSuccessSnackbar(true);
      })
      .catch((validationError) => {
        console.error("Validation errors:", validationError.errors);
        setToggleFailSnackbar(true);
      });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  type fieldDataType = {
    value: string;
    translation: string;
  };

  const fieldData: fieldDataType[] = [
    { value: "name", translation: "Nome" },
    { value: "email", translation: "E-mail" },
    { value: "cpf", translation: "CPF" },
    { value: "phone", translation: "Telefone" },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const isCPF = name === "cpf";
    const isPhone = name === "phone";

    if (isCPF) {
      const result = getMaskedCPF(value);
      setUserInfo((prevState) => ({
        ...prevState,
        [name]: result,
      }));
    } else if (isPhone) {
      const result = getMaskedPhone(value);
      setUserInfo((prevState) => ({
        ...prevState,
        [name]: result,
      }));
    } else {
      setUserInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    onSubmitHandler(data);
    !previousValues &&
      setUserInfo({
        id: "",
        name: "",
        email: "",
        cpf: "",
        phone: "",
        status: "",
      });
  };

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
        isOpen={toggleSuccessSnackbar}
        message={
          previousValues
            ? "Usuário editado com sucesso"
            : "Usuário criado com sucesso"
        }
        onClose={() => setToggleSuccessSnackbar(false)}
      />
      <Snackbar
        isOpen={toggleFailSnackbar}
        onClose={() => setToggleFailSnackbar(false)}
      >
        <Alert
          onClose={() => setToggleFailSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Preencha os campos corretamente!
        </Alert>
      </Snackbar>
      <form className={styles.forms} onSubmit={handleSubmit(submitHandler)}>
        {fieldData.map((field) => (
          <React.Fragment key={field.value}>
            <TextField
              id="outlined-basic"
              label={field.translation}
              variant="outlined"
              {...register(field.value)}
              value={userInfo[field.value as keyof UserType]}
              onChange={handleChange}
            />
            <p className={styles.errorMessage}>
              {errors[field.value]?.message as string}
            </p>
          </React.Fragment>
        ))}
        <TextField
          id="outlined-basic"
          select
          label={"Status"}
          variant="outlined"
          {...register("status")}
          defaultValue={previousValues?.status ?? StatusCodeEnum.ACTIVE}
          value={userInfo.status}
          onChange={handleChange}
        >
          {statusDict.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              {status.label}
            </MenuItem>
          ))}
        </TextField>
        <p className={styles.errorMessage}>
          {errors.status?.message as string}
        </p>
        <div className={styles.buttons}>
          <Button
            variant={VariantStyles.SECONDARY}
            text={previousValues ? "Editar" : "Criar"}
            type="submit"
            styleProps={{ width: "100px", marginRight: "15px" }}
            onPress={() => validateSchema()}
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
