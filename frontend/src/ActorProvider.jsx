import { useState } from "react";
import ActorContext from "./ActorContext";

const ActorProvider = ({children}) => {
    const [actor, setActor] = useState();

    return (
        <ActorContext.Provider value={{actor, setActor}}>
        {children}
        </ActorContext.Provider>
    )
};

export default ActorProvider