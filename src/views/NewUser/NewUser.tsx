import React from "react";
import { FieldValues } from "react-hook-form/dist/types";
import { postUser } from "../../services";
import { UserType } from "../../types";
import UserForm from "../../components/organisms/UserForm";

export default function NewUser () {

  const onSubmitHandler = (data: FieldValues) => {
    console.log({ data });
    postUser(data as UserType);
  };

  return <UserForm onSubmitHandler={onSubmitHandler} />
}
