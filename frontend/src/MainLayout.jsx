import { useContext, useState } from "react";
import ActorProvider from "./ActorProvider";
import Header from "./Header";

const MainLayout = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <ActorProvider>
            <Header
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}/>
            {children}
        </ActorProvider>
    );
}

export default MainLayout