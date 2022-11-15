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


export const CategoriesList: React.FC = () => {
    const { dataGridProps } = useDataGrid<ICategory>();

    const columns = React.useMemo<GridColumns<ICategory>>(
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
                     //eslint-disable-next-line react-hooks/rules-of-hooks
                    const { data, isLoading } = useList<IPost>({    // <-- is possible to use the generic useList() versio as well
                        resource: 'posts',
                        config: {
                          filters: [
                            {
                              operator: 'eq',
                              field: 'category.id',
                              value: row.id,
                            },
                          ],
                        },
                      });
            
                      if (isLoading) {
                        return 'Loading...';
                      }
                      
                      return <TagField value={data?.total} />; 
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
        []
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