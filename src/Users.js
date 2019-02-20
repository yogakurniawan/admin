import React from "react";
import {
  List,
  Edit,
  Create,
  Datagrid,
  TextField,
  EditButton,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField
} from "react-admin";

export const UserList = props => {
  try {
    const profileJson = localStorage.getItem("RAFirebaseProfile");
    const profile = JSON.parse(profileJson);
    return (
      <List title="All users" {...props}>
        <Datagrid>
          <TextField source="name" />
          <TextField source="username" />
          <TextField source="email" />
          {profile && profile.isAdmin ? <EditButton /> : null}
        </Datagrid>
      </List>
    );
  } catch (error) {}
};

export const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="username" />
      <TextInput source="email" />
      <ImageInput
        source="image"
        label="Related Image"
        accept="image/*"
        multiple
      >
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export const UserEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="username" />
      <TextInput source="email" />
      <ImageInput
        source="image"
        label="Related Image"
        accept="image/*"
        multiple
      >
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);
