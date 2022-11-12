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