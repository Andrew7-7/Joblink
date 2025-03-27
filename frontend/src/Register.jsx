import React,{ useState,useContext, useEffect } from "react"
import Button from "./Button"
import {AuthContext} from "./AuthContext"
import { backend } from 'declarations/backend';
import Popup from "./Popup";

const Register = () => {

    const {register, updateActor} = useContext(AuthContext)
    const [message, setmessage] = useState('')
    const [status, setStatus] = useState('')

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pic, setPic] = useState(null);
    const [num, setNum] = useState(0)
    const [role, setRole] = useState('')
    
    const [code, setCode] = useState('')
    const [verifCode, setVerifCode] = useState('')
    
    const submitRole = (e) => {
        e.preventDefault()
        setRole(e.target.value)
        setNum(1)
    } 

    const submitProfile = (e) => {
        e.preventDefault()
        if (name.length < 1){
            if (status == ""){
                setmessage("Name cant be empty")
                setStatus("failed")
                timeout()
            }
            return false
        }
        if (!email.endsWith("@gmail.com")){
            if (status == ""){
                setmessage("Email must ends with @gmail.com!")
                setStatus("failed")
                timeout()
            }
            return false
        }
        if (pic == null){
            if (status == ""){
                setmessage("You must have profile picture")
                setStatus("failed")
                timeout()
            }
            return false
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            setPic(e.target.result);
        };
        reader.readAsDataURL(pic);
        return true
    }

    const submitVerification = async (e) => {
        e.preventDefault()
        if (code == verifCode){
            const res = await register(name, email, pic, role)
            if (res != ""){
                setmessage(res)
                setStatus('failed')
            }else{
                setmessage(`${role} Registered successfully`)
                setStatus("success")
                
                setTimeout(() => {
                    setStatus('')
                    setmessage('')
                    window.location.href = "/"
                }, 3000)
                
            }
        }else{
            if (status == ""){
                setmessage('Verification code incorrect')
                setStatus("failed")
                timeout()
            }
        }
    }

    async function timeout(){
        setTimeout(() => {
                setStatus('')
                setmessage('')
            }, 3000)
    }

    async function generateCode(){
        let text = await backend.generateCode()
        setCode("" + text)
        return 
    }

    useEffect(() => {
        generateCode()
    }, [])
    
    const stages = [
        {
            submit: submitRole,
            page:<div className="flex flex-col gap-y-5 z-10 h-auto items-center justify-center w-2/5 bg-[var(--secondary)] rounded-xl absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] p-10 backdrop-opacity-0 drop-shadow-lg">
                <h4 className="font-bold text-xl text-[var(--primary)]">You havent registered yet! Choose your role</h4>
                <div className="flex w-full justify-evenly">
                    <Button text="User" onclick={e => submitRole(e)}/>
                    <Button text="Company" onclick={e => submitRole(e)}/>
                </div>
            </div>,
        },
        {
            submit: submitProfile,
            page:<div className="flex flex-col gap-y-5 z-10 h-auto items-center justify-center w-2/5 bg-[var(--secondary)] rounded-xl absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] p-10 backdrop-opacity-0 drop-shadow-lg">
                <div className="w-4/5 h-1/5">
                      <label htmlFor="name" className="text-left w-full text-white font-bold">Whats your name?</label>
                      <input required type="text" onChange={e => setName(e.target.value)} className="box-border bg-transparent border-white border-b-2 py-1 px-2 w-full focus:outline-none text-[var(--primary)] text-md" id="name" name="name"/>
                  </div>
                  <div className="w-4/5 h-1/5">
                      <label htmlFor="name" className="text-left w-full text-white font-bold">Whats your email?</label>
                      <input required type="email" onChange={e => setEmail(e.target.value)} className="box-border bg-transparent border-white border-b-2 py-1 px-2 w-full focus:outline-none  text-[var(--primary)] text-md" id="email" name="email"/>
                  </div>
              <div className="w-4/5 h-1/3">
                  <label  htmlFor="file" className="text-white font-bold flex flex-col gap-1">
                      Profile Picture
                      <p className="border-white border-2 w-full p-5 flex justify-center items-center text-white rounded-md">Input your file here</p>
                  </label>
                  <input required type="file" id="file" onChange={e => setPic(e.target.files[0])} className="hidden" name="file"/>
              </div>
              <Button text={"Next"} onclick={e => changeNum(e, stages.length)}/>
            </div>,
        },
    ]

    

    const changeNum = (e,idx) => {
        if (idx > 0){
            if (role == "" && status == ""){
                setmessage("Role must be chosen")
                setStatus("failed")
                timeout()
                return
            }
        }
        if (idx == stages.length){    
            if (!submitProfile(e)){
                return
            } 
        }
        setNum(idx)
    }

    return (
        <>
            <Popup type={"failed"} status={status} message={message}/>
            <Popup type={'success'} status={status} message={message}/>
            {num < stages.length? stages[num].page:<div className="flex flex-col gap-y-5 z-10 h-auto items-center justify-center w-2/5 bg-[var(--secondary)] rounded-xl absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] p-10 backdrop-opacity-0 drop-shadow-lg">
              <h4 className="font-medium text-white w-4/5 rounded-lg h-[50px] flex justify-center items-center text-2xl border-white border-2">{code}</h4>
              <div className="w-4/5">
                  <label htmlFor="code" className="text-left w-full text-white font-bold">Input Verification Code</label>
                  <input required type="text" className="bg-transparent border-white border-b-2 py-1 px-2 w-full focus:outline-none text-[var(--primary)]" id="code" name="code" onChange={(e) => {setVerifCode(e.target.value)}} value={verifCode}/>
              </div>
              <Button onclick={submitVerification} text={"Register"}/>
            </div>}
            <div className="flex justify-between z-10 items-center justify-center w-2/5 h-[10%] bg-[var(--secondary)] rounded-xl absolute left-[50%] top-[90%] translate-y-[-50%] translate-x-[-50%] p-10 backdrop-opacity-0 drop-shadow-lg">
                {stages.map((_, idx) => {
                    return (
                        <>
                            <button className={`rounded-full font-bold w-[50px] h-[50px] border-4 border-[var(--blue)] ${num == idx?"bg-gradient-to-br from-[var(--primary)] to-[var(--blue)] text-[var(--secondary)]":"text-white"}`} onClick={e => changeNum(e, idx)}>
                                {idx+1}
                            </button>
                            <span className="rounded-full bg-white w-2 h-2"></span>
                            <span className="rounded-full bg-white w-2 h-2"></span>
                            <span className="rounded-full bg-white w-2 h-2"></span>
                        </>
                    )
                })}
                <button className={`rounded-full font-bold w-[50px] h-[50px] border-4 border-[var(--blue)] ${num == stages.length?"bg-gradient-to-br from-[var(--primary)] to-[var(--blue)] text-[var(--secondary)]":"text-white"}`} onClick={e => {changeNum(e, stages.length)}}>
                    {stages.length+1}
                </button>
            </div>
        </>
    )
}

export default Register