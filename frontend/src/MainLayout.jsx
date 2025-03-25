import { useContext, useState } from "react";
import ActorProvider from "./ActorProvider";
import Header from "./Header";
import AuthProvider from "./AuthProvider";
import AuthContext from "./AuthContext";

const MainLayout = ({children}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)
    return (
        <>
            <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
            <div className="min-h-screen w-full bg-gradient-to-b from-[var(--background)] to-[var(--secondary)] overflow-hidden">
                {children}
            </div>
        </>
    );
}

export default MainLayout