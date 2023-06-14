import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FieldValues } from "react-hook-form/dist/types";
import { editUser, getUserById } from "../../services";
import { UserType } from "../../types";
import UserForm from "../../components/organisms/UserForm";
import { getUnmaskedValue } from "../../utils/masks";

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
    const numericCpf = getUnmaskedValue(data.cpf);
    const numericPhone = getUnmaskedValue(data.phone);

    const formattedUser = {
      cpf: numericCpf,
      phone: numericPhone,
      ...data,
    };

    editUser(id as string, formattedUser as UserType);
  };

  return <UserForm onSubmitHandler={onSubmitHandler} previousValues={user} />;
}
