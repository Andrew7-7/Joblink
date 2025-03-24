import { useState } from "react";
import ContextProvider from "./ActorContext";

const ActorProvider = ({children}) => {
    const [actor, setActor] = useState();

    return (
        <ContextProvider.Provider value={{actor, setActor}}>
        {children}
        </ContextProvider.Provider>
    )
};

export default ActorProvider