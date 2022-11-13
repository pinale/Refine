import React from "react";
import { RefineLayoutHeaderProps } from "@pankod/refine-ui-types";
import { useGetIdentity, useLogout } from "@pankod/refine-core";
import { AppBar, Stack, Toolbar, Typography, Avatar } from "@mui/material";
import { Link } from "@pankod/refine-mui";

//copied from @pankod\refine-mui\src\components\layout\header\index.tsx and customized

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
                        <Link href="" onClick={() => logout()}>Logout</Link>  
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    ) : null;
};