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
    editUser(id as string, data as UserType);
  };

  return <UserForm onSubmitHandler={onSubmitHandler} previousValues={user} />;
}
