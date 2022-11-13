

import { DashboardPageProps } from '@pankod/refine-core/dist/interfaces';
import { Box, Button, Card, CardContent, CardHeader, Typography } from '@pankod/refine-mui';
import React from 'react'

export const  Dashboard :React.FC<DashboardPageProps> = ({initialData}) =>  {
    
    return (
        <Card>
            <CardHeader
                sx={{ display: "flex", flexWrap: "wrap" }}
                title={
                    (
                        <Typography variant="h5">
                            Home
                        </Typography>
                    )
                }>
            </CardHeader>
            <CardContent>
                <img src="https://raw.githubusercontent.com/refinedev/refine/master/logo.png"   width="150"  />&nbsp;
                <img src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" alt="firebase" width="40" height="40"/>
            </CardContent>
        </Card>
    );
}

export default Dashboard