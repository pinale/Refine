# refinemuiapp



<div align="center" style="margin: 30px;">
    <a href="https://refine.dev">
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/refine_logo.png"  align="center" />
    </a>
</div>
<br/>

This [refine](https://github.com/pankod/refine) project was generated with [superplate](https://github.com/pankod/refine).

```bash
npx superplate-cli -o refinemuiapp tutorial
```
### Running the development server.
```bash
    npm run dev
```
### Building for production.
```bash
    npm run build
```
### Running the production server.
```bash
    npm run start
```

**refine** is a React-based framework for building data-intensive applications in no time ✨

Refine offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. Use-cases include, but are not limited to admin panels, B2B applications and dashboards.


## Learn More
To learn more about **refine**, please check out the [Documentation](https://refine.dev/docs)

- **Material UI** [Docs](https://refine.dev/docs/ui-frameworks/mui/tutorial/)
- **React Router** [Docs](https://refine.dev/docs/core/providers/router-provider/)
- **REST Data Provider** [Docs](https://refine.dev/docs/core/providers/data-provider/#overview)

\
# Related Resources
```TSX
    import { GridColumns,List, useDataGrid, useMany } from "@pankod/refine-core";

    export const PostList: React.FC = () => {
        const { dataGridProps } = useDataGrid<IPost>();

        const categoryIds = dataGridProps.rows.map((item) => item.category.id);
        const { data: categoriesData, isLoading } = useMany<ICategory>({
            resource: "categories",
            ids: categoryIds,
            queryOptions: {
                enabled: categoryIds.length > 0,
            },
        });
        
        const columns = React.useMemo<GridColumns<IPost>>(
            () => [
                ...
                {
                    field: "category.id",
                    headerName: "Category",
                    type: "number",
                    minWidth: 250,
                    flex: 1,
                    renderCell: function render({ row }) {
                        if (isLoading) {
                            return "Loading...";
                        }

                        const category = categoriesData?.data.find(
                            (item) => item.id === row.category.id,
                        );
                        return category?.title;
                    },
                }
            ],
            [categoriesData, isLoading]
        );

        return (
            <List>
                <DataGrid {...dataGridProps} columns={columns} autoHeight />
            </List>
        );
    }

```


# Search and filtering
Enabled by default thanks to the `useDataGrid` hook
[more info about useDataGrid -> https://refine.dev/docs/api-reference/mui/hooks/useDataGrid/#sorting](https://refine.dev/docs/api-reference/mui/hooks/useDataGrid/#sorting)
```TSX
    //coming soon
```


# Show a single entity/detail page
`useShow()` is the hook to use for fetching data from the **current resource**.\
PAY ATTENTION, to query foreign resources you may use the low-level useOne() hook.\
or \
use `<Show>` to provides a layout that adds extra functionalities like a refresh button, list or giving title to the page.
```TSX
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;
```

then add a show button to the list component
```TSX
    import {ShowButton} from "@pankod/refine-mui";
    const columns = [
        ...
        {
            headerName: "Actions",
            field: "actions",
            minWidth: 250,
            renderCell: function render(params) {
                return <ShowButton hideText recordItemId={params.row.id} />;
            },
        }
    ]
```
[more info about useShow() hook -> https://refine.dev/docs/api-reference/core/hooks/show/useShow/](https://refine.dev/docs/api-reference/core/hooks/show/useShow/)\
[more info about Show component-> https://refine.dev/docs/api-reference/mui/components/basic-views/show/](https://refine.dev/docs/api-reference/mui/components/basic-views/show/)


# Edit a record
`@pankod/refine-react-hook-form` + React Hook Form + MUI = ♥

```TSX
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
```

then add an edit button to the list component
```TSX

import {
    GridColumns,
    TagField,
    DateField,
    ShowButton,
    Stack,
    EditButton,
} from "@pankod/refine-mui";
const columns = React.useMemo<GridColumns<IPost>>(
        () => [
            ...
            {
                field: "status",
                headerName: "Status",
                minWidth: 150,
                flex: 1,
                renderCell: function render(params) {
                    return <TagField value={params.row.status} />;
                },
            },
            {
                field: "createdAt",
                headerName: "CreatedAt",
                minWidth: 220,
                renderCell: function render(params) {
                    return (
                        <DateField format="LLL" value={params.row.createdAt} />
                    );
                },
            },
            {
                headerName: "Actions",
                field: "actions",
                minWidth: 250,
                renderCell: function render(params) {
                    return (
                        <Stack direction="row" spacing={1}>
                            <EditButton hideText recordItemId={params.row.id} />
                            <ShowButton hideText recordItemId={params.row.id} />
                        </Stack>
                    );
                },
            },
        ],
        [categoriesData, isLoading],
```
[more info about `<EditButton>` --> https://refine.dev/docs/api-reference/mui/components/buttons/edit-button/](https://refine.dev/docs/api-reference/mui/components/buttons/edit-button/)



# Create a record

```TSX
<Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
```
Save button is provided by the `<Create>` component submits the form executing the `useCreate` method provided by the `dataProvider`,\
the **create** button is provided from the `<List>` component


# Delete a record
two possibilities:
1) add a delete button to the list component
```TSX
    const columns = ...
            ...
            {
                headerName: "Actions",
                field: "actions",
                minWidth: 250,
                renderCell: function render(params) {
                    return (
                        <Stack direction="row" spacing={1}>
                            <EditButton hideText recordItemId={params.row.id} />
                            <ShowButton hideText recordItemId={params.row.id} />
                            <DeleteButton hideText recordItemId={params.row.id} />
                        </Stack>
                    );
                },
            },
```
2) showing delete button in <PostEdit> component\
To show delete button in edit page, canDelete prop needs to be passed to resource object
```TSX
    <Refine
        ...
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
    />
```

# Authentication

provide a dataProvider to the `<Refine>` component
```TSX
    <Refine
        ...
        authProvider={authProvider}
    /> 
```

the authProvider
```TSX
import { AuthProvider } from "@pankod/refine-core";

const authProvider: AuthProvider = {
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    forgotPassword: () => Promise.resolve(),
    updatePassword: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve(),
};
```


A logout button is automatically showed on the `Sider` component of the `Layout` provided by the  `@pankod/refine-mui` package.\
Alternatively you can implement your own logout flow, manually using `useLogout` that calls the `logout` method from the `authProvider`
```TSX
    const { mutate: logout } = useLogout();
    //somewhere in the layout
    <a onClick={() => logout()}>Logout</a>  
```

# Customize an existing layout

For simple customization you can override single layout parts with custom component\
- Header
- Footer
- Sider
- OffLayoutArea
- Title

```TSX
    <Refine
          ...
          Header={MyCustomHeader}
    />
```
the custom header:\
*copy the code of an existing defautl component provided by the `@pankod/refine-mui` package and modify it according your needs.* 

```TSX
import React from "react";
import { RefineLayoutHeaderProps } from "@pankod/refine-ui-types";
import { useGetIdentity, useLogout } from "@pankod/refine-core";
import { AppBar, Stack, Toolbar, Typography, Avatar } from "@mui/material";
import { Link } from "@pankod/refine-mui";

//copied from @pankod\refine-mui\src\components\layout\header\index.tsx and customized

export const MyCustomHeader: React.FC<RefineLayoutHeaderProps> = () => {
    const { data: user } = useGetIdentity();
    const { mutate: logout } = useLogout();     {/*<---- useLogout to have a custom logout button in the component  */}

    const shouldRenderHeader = user && (user.name || user.avatar);

    return shouldRenderHeader ? (
        <AppBar color="default" position="sticky" elevation={1}>
            <Toolbar>
                <Stack
                    direction="row"
                    width="100%"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <Stack
                        direction="row"
                        gap="16px"
                        alignItems="center"
                        justifyContent="center"
                    >  
                        <Typography variant="subtitle2">
                            {user?.name}
                        </Typography>
                        <Avatar src={user?.avatar} alt={user?.name} />

                        <Link href="" onClick={() => logout()}>Logout</Link>   {/*<---- a logout button added  */}
                    
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    ) : null;
};
```

or, for a completely custom layout write your own `Layout` component\
*take a look at the defautl `Layout` component code provided by `@pankod/refine-mui` package*
```TSX
import React from "react";
import { RefineLayoutLayoutProps } from "@pankod/refine-ui-types";

import { Box } from "@mui/material";

import { Sider as DefaultSider } from "./sider";
import { Header as DefaultHeader } from "./header";

export const Layout: React.FC<RefineLayoutLayoutProps> = ({
    Sider,
    Header,
    Footer,
    OffLayoutArea,
    children,
}) => {
    const SiderToRender = Sider ?? DefaultSider;
    const HeaderToRender = Header ?? DefaultHeader;

    return (
        <Box display="flex" flexDirection="row">
            <SiderToRender />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    minHeight: "100vh",
                }}
            >
                <HeaderToRender />
                <Box
                    component="main"
                    sx={{
                        p: { xs: 1, md: 2, lg: 3 },
                        flexGrow: 1,
                        bgcolor: (theme) => theme.palette.background.default,
                    }}
                >
                    {children}
                </Box>
                {Footer && <Footer />}
            </Box>
            {OffLayoutArea && <OffLayoutArea />}
        </Box>
    );
};
```
