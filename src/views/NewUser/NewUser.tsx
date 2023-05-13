import React from "react";
import { FieldValues } from "react-hook-form/dist/types";
import { postUser } from "../../services";
import { UserType } from "../../types";
import UserForm from "../../components/organisms/UserForm";

export default function NewUser() {
  const onSubmitHandler = (data: FieldValues) => {
    console.log({ data });

    const numericCpf = data.cpf.replace(/\D/g, "");
    const numericPhone = data.phone.replace(/\D/g, "");

    const formattedUser = {
      id: data.id,
      name: data.name,
      email: data.email,
      cpf: numericCpf,
      phone: numericPhone,
      status: data.status,
    };

    console.log(formattedUser);

    postUser(formattedUser as UserType);
  };

  return <UserForm onSubmitHandler={onSubmitHandler} />;
}
