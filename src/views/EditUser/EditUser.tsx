import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FieldValues } from "react-hook-form/dist/types";
import { editUser, getUserById } from "../../services";
import { UserType } from "../../types";
import UserForm from "../../components/organisms/UserForm";

export default function EditUser() {
  const { id } = useParams();

  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    id &&
      getUserById(id).then((data) => {
        setUser(data);
      });
  }, []);

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

    editUser(id as string, formattedUser as UserType);
  };

  return <UserForm onSubmitHandler={onSubmitHandler} previousValues={user} />;
}
