import React from "react";

import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  Layout,
  ThemeProvider,
  LightTheme,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";

import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { PostCreate, PostEdit, PostList, PostShow } from "pages/posts";
import { authProvider } from "providers/authprovider";
import { Login } from "components/authorization/Login";
import { MyCustomHeader } from "components/layout/mycustomheader";
import Dashboard from "pages/dashboard/Dashboard";


function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          notificationProvider={notificationProvider}
          authProvider={authProvider}
          Layout={Layout}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          resources={[
            {
              name:"posts",
              list: PostList,
              show: PostShow,
              edit: PostEdit,
              create: PostCreate,
              canDelete: true
            },
          ]}
          Header={MyCustomHeader}
          LoginPage={Login}
          DashboardPage={Dashboard}
        />
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
