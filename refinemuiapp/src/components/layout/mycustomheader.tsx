//copied from @pankod\refine-mui\src\components\layout\header\index.tsx and customized

import React from "react";
import { RefineLayoutHeaderProps } from "@pankod/refine-ui-types";
import { useGetIdentity, useLogout } from "@pankod/refine-core";
import { AppBar, Stack, Toolbar, Typography, Avatar } from "@mui/material";
import { Link as MUILink} from "@pankod/refine-mui";

import routerProvider from "@pankod/refine-react-router-v6";
const { Link } = routerProvider;

export const MyCustomHeader: React.FC<RefineLayoutHeaderProps> = () => {
    const { data: user } = useGetIdentity();
    const { mutate: logout } = useLogout();

    const shouldRenderHeader = user && (user.name || user.avatar);

    return shouldRenderHeader ? (
        <AppBar color="default" position="sticky" elevation={1}>
            <Toolbar>
                <Stack
                    direction="row"
                    width="100%"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Stack
                        direction="row"
                        gap="16px"
                        alignItems="center"
                        justifyContent="center"
                    >  
                        <Link to="/custompage1">Custom Page 1</Link>  
                        <Link to="/custompage2">Custom Page 2</Link>  
                    </Stack>
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
                        <MUILink onClick={() => logout()}>Logout</MUILink>  
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    ) : null;
};