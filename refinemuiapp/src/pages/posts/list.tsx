import React from "react";
import { CrudFilter, ConditionalFilter, LogicalFilter, useMany } from "@pankod/refine-core";
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

import routerProvider from "@pankod/refine-react-router-v6";
const { useParams, Link } = routerProvider;

export const PostList: React.FC = () => {

    const params = useParams();
    const { dataGridProps, filters, setFilters } = useDataGrid<IPost>({
        syncWithLocation: true,
        defaultSetFilterBehavior: "merge"
    });


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
            { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
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
            },
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
                            <DeleteButton hideText recordItemId={params.row.id} />
                        </Stack>
                    );
                },
            },
        ],
        [categoriesData, isLoading],
    );

    return (
        <List>
            <div className="flex flex-row">
                {
                    filters.map((f : CrudFilter  ) => {
                       //return  (<div>{`${f.field} | ${f.operator} | ${f.value}`}</div>)) 
                        
                        // if (f as LogicalFilter)
                        // {
                        //     console.log("logical filter");
                        // }

                        // if (f as ConditionalFilter)
                        // {
                        //     console.log("conditional filter");
                        // }


                       //this type checking works only with classes, not with interfaces or types 
                       //f instanceof LogicalFilter;
                       return (
                                <div>
                                    {`${(f as LogicalFilter).field} | ${f.operator} | ${f.value}`}
                                </div>
                            )
                    })
                }
            </div>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};