import React from "react";
import { FieldValues } from "react-hook-form/dist/types";
import { postUser } from "../../services";
import { UserType } from "../../types";
import UserForm from "../../components/organisms/UserForm";
import { getUnmaskedValue } from "../../utils/masks";

export default function NewUser() {
  const onSubmitHandler = (data: FieldValues) => {
    const numericCpf = getUnmaskedValue(data.cpf);
    const numericPhone = getUnmaskedValue(data.phone);

    const formattedUser = {
      cpf: numericCpf,
      phone: numericPhone,
      ...data,
    };

    postUser(formattedUser as UserType);
  };

  return <UserForm onSubmitHandler={onSubmitHandler} />;
}
