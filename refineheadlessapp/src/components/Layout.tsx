import { useLogout, useMenu, useNavigation, LayoutProps, useRefineContext  } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

const { Link } = routerProvider;

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { menuItems, selectedKey } = useMenu();
    const { hasDashboard } = useRefineContext();
    console.log("contenuto menu", menuItems);
    
    const { push } = useNavigation();
    const { mutate: logout } = useLogout();

    return (
        <div className="flex min-h-screen flex-col">
            <div className="mb-2 border-b py-2">
                <div className="container mx-auto">
                    <div className="flex flex-row items-center gap-2">
                        <div className="flex flex-row flex-1">
                            <Link to="/">
                                <img
                                    className="w-32"
                                    src="https://refine.dev/img/refine_logo.png"
                                    alt="Logo"
                                />
                            </Link>
                            <ul className="bg-red-400">
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
                            <a onClick={() => logout()}>Logout</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white">{children}</div>
        </div>
    );
};