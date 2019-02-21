import React, { Fragment } from "react";
import CardActions from "@material-ui/core/CardActions";
import { unparse as convertToCSV } from "papaparse/papaparse.min";
import {
  downloadCSV,
  Show,
  SimpleShowLayout,
  List,
  Edit,
  Create,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  ShowButton,
  SimpleForm,
  TextInput
} from "react-admin";

const exporter = posts => {
  const csv = convertToCSV({
    data: posts,
    fields: ["name", "username", "email"]
  });
  downloadCSV(csv, "posts");
};

export const UserList = props => {
  try {
    const profileJson = localStorage.getItem("RAFirebaseProfile");
    const profile = JSON.parse(profileJson);
    return (
      <List title="All users" exporter={exporter} {...props}>
        <Datagrid>
          <TextField source="name" />
          <TextField source="username" />
          <TextField source="email" />
          {profile && profile.isAdmin ? <EditButton /> : null}
          <ShowButton />
        </Datagrid>
      </List>
    );
  } catch (error) {}
};

const cardActionStyle = {
  zIndex: 2,
  display: "inline-block",
  float: "right"
};

const UserShowActions = ({ permissions, basePath, data, resource }) => {
  const profileJson = localStorage.getItem("RAFirebaseProfile");
  const profile = JSON.parse(profileJson);
  return (
    <CardActions style={cardActionStyle}>
      {profile && profile.isAdmin && (
        <Fragment>
          <EditButton basePath={basePath} record={data} />
          <DeleteButton basePath={basePath} record={data} resource={resource} />
        </Fragment>
      )}
    </CardActions>
  );
};

export const UserShow = props => {
  return (
    <Show actions={<UserShowActions />} {...props}>
      <SimpleShowLayout>
        <TextField source="name" />
        <TextField source="username" />
        <TextField source="email" />
      </SimpleShowLayout>
    </Show>
  );
};

export const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="username" />
      <TextInput source="email" />
    </SimpleForm>
  </Create>
);

export const UserEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="username" />
      <TextInput source="email" />
    </SimpleForm>
  </Edit>
);
