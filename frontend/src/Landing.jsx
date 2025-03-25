import { useContext } from "react"
import AuthContext from "./AuthContext"
import Button from "./Button"

const Landing = () => {

    const {_, login} = useContext(AuthContext)
    return (
      <>
        <div className='absolute top-[40%] z-10 left-[10%] w-2/5 flex flex-col gap-y-5'>
        <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-pink-500 to-yellow-300 font-bold text-7xl text-left">JOBLINK</h1>
        <h2 className='bg-clip-text text-transparent bg-gradient-to-br from-pink-500 to-pink-300 font-bold text-2xl text-left'>Trusted Web3 career network with verified experience and secure identity</h2>
        
        <Button onclick={login} text={"Getting Started"}/>
        </div>
        <span className='w-[400px] h-[400px] bg-pink-400 absolute top-[30%] right-[5%] opacity-25 rounded-full blur-3xl'>
        </span>
        <span className='w-[400px] h-[400px] bg-purple-700 absolute top-[10%] left-[-5%] opacity-50 rounded-full blur-3xl'>
        </span>
      </>
    )
}

export default Landing