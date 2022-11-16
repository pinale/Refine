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
import { CategoriesList } from "pages/categories/list";
import { CustomPage1 } from "pages/custom/custompage1";
import { CustomPage2 } from "pages/custom/custompage2";


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
          routerProvider={{
            ...routerProvider,
            routes: [
              {
                path: '/custompage1',
                Element: <CustomPage1 />,
                layout: true
              },
              {
                path: '/custompage2',
                Element: <CustomPage2 />,
                layout: true
              }
            ]
          }}
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
            {
              name:"categories",
              list: CategoriesList,
              //show: PostShow,
              //edit: PostEdit,
              //create: PostCreate,
              //canDelete: true
            },
          ]}
          Header={MyCustomHeader}
          LoginPage={Login}
        />
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
