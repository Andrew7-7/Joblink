import { useContext, useState } from "react";
import ActorProvider from "./ActorProvider";

const MainLayout = ({children}) => {

    return (
        <ActorProvider>
            {children}
        </ActorProvider>
    );
}

export default MainLayout