import React, { Component } from "react";
import { Admin, Resource } from "react-admin";
import { RestProvider, base64Uploader } from "ra-data-firebase-client";
import AuthProvider from "./lib/AuthProvider";

import { UserList, UserEdit, UserCreate, UserShow } from "./Users";

const firebaseConfig = {
  apiKey: "AIzaSyDyTBLLk2DC1GYovd_nmxYKF1Lkl83P7V0",
  authDomain: "hazel-delight-146613.firebaseapp.com",
  databaseURL: "https://hazel-delight-146613.firebaseio.com",
  projectId: "hazel-delight-146613",
  storageBucket: "hazel-delight-146613.appspot.com",
  messagingSenderId: "419611045372"
};

const trackedResources = [
  { name: "posts", isPublic: true },
  { name: "users", isPublic: true }
];

const authConfig = {
  userProfilePath: "/users/"
};

// to run this demo locally, please feel free to disable authProvider to bypass login page

const dataProvider = base64Uploader(
  RestProvider(firebaseConfig, { trackedResources })
);

class App extends Component {
  render() {
    return (
      <Admin
        dataProvider={dataProvider}
        authProvider={AuthProvider(authConfig)}
      >
        <Resource
          name="users"
          show={UserShow}
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
        />
      </Admin>
    );
  }
}
export default App;
