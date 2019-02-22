import React, { Fragment } from "react";
import CardActions from "@material-ui/core/CardActions";
import firebase from "firebase";
import { unparse as convertToCSV } from "papaparse/papaparse.min";
import {
  downloadCSV,
  Show,
  SimpleShowLayout,
  List,
  Edit,
  Create,
  Toolbar,
  Datagrid,
  TextField,
  SaveButton,
  EditButton,
  DeleteButton,
  ShowButton,
  SimpleForm,
  TextInput
} from "react-admin";

async function checkIfNikExists(nik) {
  return new Promise(resolve => {
    const calegRef = firebase.database().ref("caleg");
    calegRef
      .orderByChild("nik")
      .equalTo(nik)
      .on("value", function(snapshot) {
        resolve(snapshot.val());
      });
  });
}

const nikValidation = values => {
  if (values.nik) {
    return checkIfNikExists(values.nik).then(snapshot => {
      if (snapshot !== null) {
        throw { nik: "NIK can not be same" };
      }
    });
  }
  return Promise.resolve();
};

const exporter = posts => {
  const csv = convertToCSV({
    data: posts,
    fields: [
      "nameLengkap",
      "nik",
      "desa",
      "rt",
      "rw",
      "tps",
      "kecamatan",
      "koordinator"
    ]
  });
  downloadCSV(csv, "daftar_caleg");
};

export const CalegList = props => {
  try {
    const profileJson = localStorage.getItem("RAFirebaseProfile");
    const profile = JSON.parse(profileJson);
    return (
      <List title="All caleg" exporter={exporter} {...props}>
        <Datagrid>
          <TextField source="nameLengkap" />
          <TextField source="nik" />
          <TextField source="desa" />
          <TextField source="rt" />
          <TextField source="rw" />
          <TextField source="tps" />
          <TextField source="kecamatan" />
          <TextField source="koordinator" />
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

const CalegShowActions = ({ basePath, data, resource }) => {
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

export const CalegShow = props => {
  return (
    <Show actions={<CalegShowActions />} {...props}>
      <SimpleShowLayout>
        <TextField source="nameLengkap" />
        <TextField source="nik" />
        <TextField source="desa" />
        <TextField source="rt" />
        <TextField source="rw" />
        <TextField source="tps" />
        <TextField source="kecamatan" />
        <TextField source="koordinator" />
      </SimpleShowLayout>
    </Show>
  );
};

const CalegCreateToolbar = props => {
  console.log(props);
  return (
    <Toolbar {...props}>
      <SaveButton disabled={props.invalid} />
    </Toolbar>
  );
};

export const CalegCreate = props => (
  <Create {...props}>
    <SimpleForm toolbar={<CalegCreateToolbar />} asyncValidate={nikValidation}>
      <TextInput source="nameLengkap" />
      <TextInput source="nik" />
      <TextInput source="desa" />
      <TextInput source="rt" />
      <TextInput source="rw" />
      <TextInput source="tps" />
      <TextInput source="kecamatan" />
      <TextInput source="koordinator" />
    </SimpleForm>
  </Create>
);

export const CalegEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="nameLengkap" />
      <TextInput source="nik" />
      <TextInput source="desa" />
      <TextInput source="rt" />
      <TextInput source="rw" />
      <TextInput source="tps" />
      <TextInput source="kecamatan" />
      <TextInput source="koordinator" />
    </SimpleForm>
  </Edit>
);
