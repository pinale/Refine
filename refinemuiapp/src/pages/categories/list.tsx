import React from "react";
import { useMany } from "@pankod/refine-core";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    TagField,
    DateField,
    List,
    ShowButton,
    Stack,
    EditButton,
    DeleteButton,
} from "@pankod/refine-mui";

import { ICategory,IPost } from "interfaces";


export const CategoriesList: React.FC = () => {
    const { dataGridProps } = useDataGrid<ICategory>();

    const categorieIds = dataGridProps.rows.map((item) => item.id);

    console.log("categorieIds",categorieIds);

    const { data: postsData, isLoading } = useMany<IPost>({
        resource: "posts",
        ids: categorieIds,
        queryOptions: {
            enabled: categorieIds.length > 0,
        },
    });

    const columns = React.useMemo<GridColumns<IPost>>(
        () => [
            { field: "id", headerName: "Id", flex: 1, minWidth: 350 },
            { field: "title", headerName: "Title", flex: 1, minWidth: 500 },
            {
                field: "post.id",
                headerName: "N° Posts",
                type: "number",
                minWidth: 250,
                flex: 1,
                renderCell: function render({ row }) {
                    if (isLoading) {
                        return "Loading...";
                    }

                    //TODO: Create count function, this is wrong
                    const category = postsData?.data.find(
                        (item) => item.category.id === row.id,
                    );
                    
                    return <TagField value={postsData?.data.length} />; 
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
        [postsData, isLoading],
    );
    

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};