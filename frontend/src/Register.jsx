import React,{ useState,useContext, useEffect } from "react"
import Button from "./Button"
import {AuthContext} from "./AuthContext"
import CompanyLogo from "../public/Company.png"
import UserLogo from "../public/User.png"
// import { backend } from 'declarations/backend';
import Popup from "./Popup";

const Register = () => {

    const {register, updateActor} = useContext(AuthContext)
    const [message, setmessage] = useState('')
    const [status, setStatus] = useState('')

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pic, setPic] = useState('');
    const [num, setNum] = useState(0)
    const [role, setRole] = useState('')
    
    const [code, setCode] = useState('')
    const [verifCode, setVerifCode] = useState('')
    const [imagePreview, setImagePreview] = useState(null);

    const [hoveredRole, setHoveredRole] = useState(null);
    
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
        if (pic == ""){
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
                setPic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

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
            page:
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="flex flex-col items-center justify-center w-full max-w-lg bg-[var(--secondary)] rounded-2xl py-16 transition-all">
                    <h3 className="text-2xl font-bold text-[var(--primary)] text-center mb-2">
                        Please Select Your Role
                    </h3>

                    <p className="text-md text-white text-center transition-opacity duration-5000">
                        {hoveredRole ? 
                            hoveredRole === "User" ? "As a User, you can explore job opportunities and apply easily." : 
                            "As a Company, you can post jobs and find the best candidates." : 
                            "Choose your role as you need"}
                    </p>

                    <div className="flex w-full justify-center items-center gap-12 mt-8">
                        <div className="flex flex-col items-center justify-center gap-3 w-44 h-44 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-md cursor-pointer transition-all duration-600 transform hover:scale-[1.1] hover:shadow-2xl"
                            onMouseEnter={() => setHoveredRole("User")} onMouseLeave={() => setHoveredRole(null)} onClick={(e) => submitRole(e)}>
                        <img src={UserLogo} alt="User Icon" className="w-20 h-20 object-contain" />
                            <h4 className="text-white text-lg font-medium transition-opacity duration-300">User</h4>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-3 w-44 h-44 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-md cursor-pointer transition-all duration-600 transform hover:scale-[1.1] hover:shadow-2xl"
                            onMouseEnter={() => setHoveredRole("Company")} onMouseLeave={() => setHoveredRole(null)} onClick={(e) => submitRole(e)}>
                        <img src={CompanyLogo} alt="Company Icon" className="w-20 h-20 object-contain" />
                        <h4 className="text-white text-lg font-medium transition-opacity duration-300">Company</h4>
                        </div>
                    </div>
                </div>
            </div>, 
        },
        {
            submit: submitProfile,
            page:
            <div className="flex flex-col gap-y-5 h-auto items-center justify-center w-2/5 bg-[var(--secondary)] rounded-xl absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] p-10 backdrop-opacity-0 drop-shadow-lg">
                <div className="w-4/5 h-1/5 flex flex-col-reverse gap-1">
                    <input required type="text" onChange={e => setName(e.target.value)} className="box-border bg-transparent border-white border-b-2 py-2 px-2 w-full focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-[var(--primary)] text-md transition-all peer placeholder-transparent" id="name" name="name" placeholder="Your Name"/>
                    <label htmlFor="name" className="text-white font-bold transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:translate-y-8 peer-focus:translate-y-0 peer-focus:text-blue-400">
                        What's your name?
                    </label>
                </div>

                <div className="w-4/5 h-1/5 flex flex-col-reverse gap-1s">
                    <input required type="text" onChange={e => setEmail(e.target.value)} className="box-border bg-transparent border-white border-b-2 py-2 px-2 w-full focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-[var(--primary)] text-md transition-all peer placeholder-transparent" id="email" name="email" placeholder="Your Enail"/>
                    <label htmlFor="email" className="text-white font-bold transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:translate-y-8 peer-focus:translate-y-0 peer-focus:text-blue-400">
                        What's your email?
                    </label>
                </div>

                <div className="w-4/5 h-1/3 flex flex-col items-center gap-3">
                    <label htmlFor="file" className="text-white font-bold flex flex-col gap-2 w-full text-center">
                        Profile Picture
                        <div className="border-white border-2 w-full p-4 flex flex-col justify-center items-center text-white transition-all cursor-pointer hover:bg-white/10">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-96 h-52 " />
                            ) : (
                                <p>Click to upload file</p>
                            )}
                        </div>
                    </label>
                    <input required type="file" id="file" accept="image/*" onChange={handleImageChange} className="hidden" name="file"/>
                </div>

            <button onClick={e => changeNum(e, stages.length)} className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-semibold py-2 px-4 rounded-md transition-all">
                Next
            </button>
        </div>,
        },
    ]

    const changeNum = (e, idx) => {
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