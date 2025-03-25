import { useContext, useState } from "react";
import ActorProvider from "./ActorProvider";
import Header from "./Header";
import AuthProvider from "./AuthProvider";

const MainLayout = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <ActorProvider>
            <AuthProvider>
                <Header
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}/>
                {children}
            </AuthProvider>
        </ActorProvider>
    );
}

export default MainLayout