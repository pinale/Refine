import React from 'react'
import { AuthPage } from '@pankod/refine-mui'
import { RememeberMe } from './RememberMe'

import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

export const Login = () => {
  return (
    <AuthPage
        providers={[
            {
                name: "google",
                label: "Sign in with Google",
                icon: (
                    <GoogleIcon style={{ fontSize: 24 }} />
                ),
            },
            {
                name: "github",
                label: "Sign in with GitHub",
                icon: (
                    <GitHubIcon style={{ fontSize: 24 }} />
                ),
            },
        ]}
        rememberMe={<RememeberMe />}
    />
  )
}




    
