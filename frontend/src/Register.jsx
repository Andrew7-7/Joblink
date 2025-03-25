import { useState } from "react"
import Button from "./Button"
import RoleForm from "./RoleForm"
import ProfileForm from "./ProfileForm";
import VerificationForm from "./VerificationForm";

const Register = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [pic, setPic] = useState();
    const [num, setNum] = useState(0)
    const [role, setRole] = useState('')
    
    const submitRole = (e) => {
        setRole(e.target.value)
        setNum(1)
    } 

    const submitProfile = (e) => {
        setNum(2)
        console.log(e.target)
    }

    const submitVerification = (e) => {
        setNum(3)
    }

    const stages = [
        {
            submit: submitRole,
            page:<RoleForm submit={submitRole}/>,
        },
        {
            submit: submitProfile,
            page:<ProfileForm submit={submitProfile}/>,
        },
        {
            submit: submitVerification,
            page: <VerificationForm submit={submitVerification}/>,
        },
    ]

    return (
        <>
            {stages[num].page}
            <div className="flex justify-between z-10 items-center justify-center w-2/5 h-[10%] bg-[var(--secondary)] rounded-xl absolute left-[50%] top-[90%] translate-y-[-50%] translate-x-[-50%] p-10 backdrop-opacity-0 drop-shadow-lg">
                {stages.map((e, idx) => {
                    return (
                        <>
                            <button className={`rounded-full  font-bold w-[50px] h-[50px] border-4 border-[var(--blue)] ${num == idx?"bg-gradient-to-br from-[var(--primary)] to-[var(--blue)] text-[var(--secondary)]":"text-white"}`} onClick={() => setNum(idx)}>
                                {idx+1}
                            </button>
                            <span className="rounded-full bg-white w-2 h-2"></span>
                            <span className="rounded-full bg-white w-2 h-2"></span>
                            <span className="rounded-full bg-white w-2 h-2"></span>
                        </>
                    )
                })}
                <button className={`rounded-full font-bold w-[50px] h-[50px] border-4 border-[var(--blue)] ${num == 3?"bg-gradient-to-br from-[var(--primary)] to-[var(--blue)] text-[var(--secondary)]":"text-white"}`} onClick={() => setNum(3)}>
                    4
                </button>
            </div>
        </>
    )
}

export default Register