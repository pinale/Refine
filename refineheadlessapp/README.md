# Getting Started with Refineheadlessapp
An example refine app in headless mode:


```SH
npx create-react-app refineheadlessapp --template typescript
npm i @pankod/refine-core @pankod/refine-react-router-v6
npm i @pankod/refine-simple-rest
npm run dev
```

# Page customization
append routes to the routerProvider props  
```TSX
<Refine
    routerProvider={{...routerProvider,
        routes:[
            {path:'/custompage', element: <CustomPage />, layout: true }  //layout automatically wrap the page in the layout
        ] 
    }}
/>
```

or wrap the custom page with
```TSX
import { LayoutWrapper } from "@pankod/refine-core";
function CustomPage() {
  return (
    <LayoutWrapper>
        <div>CustomPage</div>
    </LayoutWrapper>
  )
}
```

# Protect pages with Authorization

```TSX
<Refine
    routerProvider={{...routerProvider,
        routes:[
            {path:'/custompage', element: <CustomPage />, layout: true },
            {
                path: "/register",
                element: <AuthPage type="register" />,  //<AuthPage> can act as Register, forgotpassword, updatepassword page 
            },
            {
                path: "/forgot-password",
                element: <AuthPage type="forgotPassword" />,
            },
            {
                path: "/update-password",
                element: <AuthPage type="updatePassword" />,
            }
        ] 
    }}
    authProvider={authProvider}
    LoginPage={() => <AuthPage />}  //<AuthPage> can act as LoginPage
/>
```

[AuthPage customization docs](https://refine.dev/docs/api-reference/core/components/auth-page/)


## Logout
if you use a UI Framework integration (MUI,Ant...) a logout button is already present in the `Sider` component.\
Is it possiblle customize an existing `Sider` too [https://refine.dev/docs/api-reference/mui/customization/mui-custom-sider/#recreating-the-default-sider-menu](https://refine.dev/docs/api-reference/mui/customization/mui-custom-sider/#recreating-the-default-sider-menu)



If you want to handle the logout flow manually use `useLogout` that calls the `logout` method from the `authProvider`\
somewhere in the Layout...
```TSX

const { Link } = routerProvider;  //"@pankod/refine-react-router-v6";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { menuItems, selectedKey } = useMenu();
    const { hasDashboard } = useRefineContext();
    const { push } = useNavigation();
    const { mutate: logout } = useLogout();

    return (
            <div className="container mx-auto">
                <div className="flex flex-row items-center gap-2">
                    <div className="flex flex-row flex-1">
                        ...
                        <ul>
                            {hasDashboard && (
                                    <li className="inline-block">
                                        <Link to="/">
                                             <a className={selectedKey === "/" ? "font-bold" : "" }>  
                                                <span>Dashboard</span>
                                            </a>
                                        </Link>
                                    </li>
                            )}
                            {menuItems.map(({ name, label, icon, route }) => { 
                                    const isSelected = route === selectedKey;
                                    return (
                                        <li key={name} className="inline-block">
                                            <a
                                                className={`flex cursor-pointer items-center gap-1 px-2 py-1 capitalize ${isSelected && "font-bold"}`}
                                                onClick={() => push(route || "")}>
                                                {icon}
                                                <span>{label ?? name}</span>
                                            </a>
                                        </li>
                                    )
                            })}
                        </ul>
                    </div>
                    <div>
                        <a onClick={() => logout()}>Logout</a>  {//  <---- logout mutation }
                    </div>
                </div>
            </div>
    )
};        
```
It returns the result of react-query's useMutation. Data that is resolved from the logout will be returned as the data in the query result.

[more info about useLogout hook ](https://refine.dev/docs/api-reference/core/hooks/auth/useLogout/)



# Menu
`useMenu` returns ONLY RESOURCES defined in `<Refine>` component and is able to manage herarchy resources for multilevel menu very easily (with `parentName` attribute)\
[https://refine.dev/docs/api-reference/core/hooks/ui/useMenu/#multi-level-menus](https://refine.dev/docs/api-reference/core/hooks/ui/useMenu/#multi-level-menus)


next
- https://refine.dev/docs/examples/multi-level-menu/
- https://refine.dev/docs/advanced-tutorials/multi-level-menu/