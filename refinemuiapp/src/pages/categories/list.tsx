import React from "react";
import { useList } from "@pankod/refine-core";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    TagField,
    List,
    ShowButton,
    Stack,
    EditButton,
    DeleteButton,
} from "@pankod/refine-mui";

import { ICategory, IPost } from "interfaces";



import routerProvider from "@pankod/refine-react-router-v6";
const { Link } = routerProvider;

export const CategoriesList: React.FC = () => {
    const { dataGridProps } = useDataGrid<ICategory>();


    const { data: allPosts, isLoading } = useList({
        resource: 'posts',
        config: {
          hasPagination: false,
        },
      });


    const columns = React.useMemo<GridColumns<ICategory>>(
        () => [
            { field: "id", headerName: "Id", flex: 1, minWidth: 350 },
            { field: "title", headerName: "Title", flex: 1, minWidth: 500 },
            {
                field: "count",
                headerName: "N° Posts",
                type: "number",
                width: 100,
                flex: 1,
                renderCell: function render({ row }) {
                     
                    if (isLoading) {
                    return 'Loading...';
                    }
                    
                    const filteredPosts = allPosts?.data?.filter(
                    (post) => post.category.id === row.id
                    );

                    return (
                        <Link to={`/posts?filters[0][field]=category.id&filters[0][operator]=eq&filters[0][value]=${row.id}`}>
                            <TagField value={filteredPosts?.length} />
                        </Link>
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
                            <DeleteButton hideText recordItemId={params.row.id} />
                        </Stack>
                    );
                },
            },
        ],
        [allPosts, isLoading]
    );
    

    return (
        <List>
            <DataGrid 
            {...dataGridProps} 
            columns={columns} 
            autoHeight 
            rowsPerPageOptions={[10, 20, 30, 50, 100]}
            />
        </List>
    );
};