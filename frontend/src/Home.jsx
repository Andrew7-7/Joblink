import { useContext } from "react"
import AuthContext from "./AuthContext"
import Register from "./Register"

const Home = () => {

    const {user} = useContext(AuthContext)

    return (
    <>
        {user == null ? 
        <Register />
        :
        <>
        </>
        }
    </>
    )
}

export default Home