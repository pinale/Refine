import { AuthPage,Refine, AuthProvider } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { PostIcon } from "./icons";
import 'index.css';
import { Layout } from "components/Layout";
import { PostList } from "./pages/posts/list";
import Home from "pages/home/Home";
import CustomPage from "pages/customs/CustomPage";

const App: React.FC = () => {
    
    const authProvider: AuthProvider = {
        login: async ({ providerName, email }) => {
            if (providerName === "google") {
                window.location.href =
                    "https://accounts.google.com/o/oauth2/v2/auth";
                return Promise.resolve(false);
            }

            if (providerName === "github") {
                window.location.href =
                    "https://github.com/login/oauth/authorize";
                return Promise.resolve(false);
            }

            if (email) {
                localStorage.setItem("email", email);
                return Promise.resolve();
            }

            return Promise.reject();
        },
        register: ({ email, password }) => {
            if (email && password) {
                return Promise.resolve();
            }
            return Promise.reject();
        },
        updatePassword: ({ password }) => {
            if (password) {
                //we can update password here
                return Promise.resolve();
            }
            return Promise.reject();
        },
        forgotPassword: ({ email }) => {
            if (email) {
                //we can send email with forgot password link here
                return Promise.resolve();
            }
            return Promise.reject();
        },
        logout: () => {
            localStorage.removeItem("email");
            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: () =>
            localStorage.getItem("email")
                ? Promise.resolve()
                : Promise.reject(),
        getPermissions: () => Promise.resolve(["admin"]),
        getUserIdentity: () =>
            Promise.resolve({
                id: 1,
                name: "Jane Doe",
                avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
            }),
    };
    
    
    
    return (
        <Refine
            routerProvider={{...routerProvider,
                routes:[
                    {path:'/custompage', element: <CustomPage />, layout: true },
                    {
                        path: "/register",
                        element: <AuthPage type="register" />,
                    },
                    {
                        path: "/forgot-password",
                        element: <AuthPage type="forgotPassword" />,
                    },
                    {
                        path: "/update-password",
                        element: <AuthPage type="updatePassword" />,
                    }
                ] //as typeof routerProvider.routes
            }}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[{ name: "posts", icon: PostIcon , list: PostList}]}
            authProvider={authProvider}
            LoginPage={() => <AuthPage />}
            Layout={Layout}
            DashboardPage={Home}
            
        />
    );
};

export default App;