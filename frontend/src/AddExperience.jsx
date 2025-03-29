import React,{useState, useContext, useEffect} from "react"
import {AuthContext} from "./AuthContext"
import Popup from "./Popup"
import Button from "./Button"
import { backend } from 'declarations/backend';

const AddExperience = ({setIndex}) => {

  const [message, setmessage] = useState('')
  const [status, setStatus] = useState('')
  const [companies, setCompanies] = useState([])
  const [company, setCompany] = useState('')

  const {principal} = useContext(AuthContext)
  const [pos, setPos] = useState('')
  const [desc, setDesc] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  

  const getCompanies = async () => {
    try{
      const res = await backend.get_companies()
      setCompanies(res)
      if (res.length > 0){
        setCompany(res[0].principal_id)
      }
    }catch(e){
      
    }
  }

  async function timeout(){
        setTimeout(() => {
                setStatus('')
                setmessage('')
            }, 3000)
    }

  const addExperience = async (startDate, endDate) => {
    try{
      const res = await backend.create_experience({
        principal_user_id:principal, 
        principal_company_id: company,
        position:pos, 
        description:desc, 
        start_date:startDate, 
        end_date:endDate ? [endDate]:[], 
      });
      if ("Ok" in res){
          return ""
      }else{
        return res.Err
      }
    }catch(e){
      return "" + e
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    const startDate = new Date(start).getTime()
    const endDate = end == ""?null:new Date(end).getTime()
    
    if (pos.length < 1){
      setmessage("Position cant be empty")
      setStatus("failed")
      timeout()
      return
    }
    if (start.length < 1){
      setmessage("Start date cant be empty")
      setStatus("failed")
      timeout()
      return
    }

    if (endDate != null && endDate < startDate){
      setmessage("Invalid date")
      setStatus("failed")
      timeout()
      return
    }
    const result = await addExperience(startDate, endDate)
    if (result == ""){
      setmessage("Experience Request Added")
      setStatus("success")
      setTimeout(() => {
        setIndex(0)
      }, 3000)
    }else{
      setmessage(result)
      setStatus("failed")
    }
    timeout()
  }

  useEffect(() => {
    getCompanies()
  }, [])

  return (<>
    <Popup type={"failed"} status={status} message={message}/>
    <Popup type={'success'} status={status} message={message}/>
    <div className="flex flex-col gap-y-3 h-4/5 items-center justify-center w-2/5 bg-[var(--secondary)] rounded-xl absolute z-10 left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] p-10 backdrop-opacity-0 drop-shadow-lg">
          <p className="w-4/5 text-red-300 text-md">* shows question that must be filled</p>
              <div className="w-4/5 h-1/6 flex flex-col-reverse gap-1">
                    <div className="relative">
                        <select onChange={(e) => setCompany(e.target.value)}
                            className="w-full bg-transparent placeholder:text-slate-700 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                            {companies.map(e => <option value={e.principal_id}>{e.name}</option>)}
                        </select>
                      </div>
                    <label htmlFor="name" className="text-white font-bold transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:translate-y-8 peer-focus:translate-y-0 peer-focus:text-blue-400">
                        What's your company? *
                    </label>
                </div>
                <div className="w-4/5 h-1/6 flex flex-col-reverse gap-1">
                    <input required type="text" onChange={e => setPos(e.target.value)} className="box-border bg-transparent border-white border-b-2 py-2 px-2 w-full focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-[var(--primary)] text-md transition-all peer placeholder-transparent" id="name" name="name" placeholder="Your Position"/>
                    <label htmlFor="name" className="text-white font-bold transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:translate-y-8 peer-focus:translate-y-0 peer-focus:text-blue-400">
                        What's your position? *
                    </label>
                </div>
                <div className="flex w-4/5 h-1/6 justify-between items-center">
                  <div className="w-[45%] flex flex-col-reverse gap-1">
                      <input required type="date" onChange={e => setStart(e.target.value)} className="box-border bg-transparent border-white border-b-2 py-2 px-2 w-full focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-[var(--primary)] text-md transition-all peer placeholder-transparent" id="name" name="start" placeholder="Start date"/>
                      <label htmlFor="start" className="text-white font-bold transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:translate-y-8 peer-focus:translate-y-0 peer-focus:text-blue-400">
                          Start when? *
                      </label>
                  </div>
                  <div className="w-[45%] flex flex-col-reverse gap-1">
                      <input required type="date" onChange={e => setEnd(e.target.value)} className="box-border bg-transparent border-white border-b-2 py-2 px-2 w-full focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-[var(--primary)] text-md transition-all peer placeholder-transparent" id="name" name="end" placeholder="End date"/>
                      <label htmlFor="end" className="text-white font-bold transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:translate-y-8 peer-focus:translate-y-0 peer-focus:text-blue-400">
                          End when?
                      </label>
                  </div>
                </div> 

                <div className="w-4/5 h-1/6 flex flex-col-reverse gap-1s">
                    <textarea required type="text" onChange={e => setDesc(e.target.value)} className="resize-none box-border bg-transparent border-white border-2 py-2 px-2 w-full focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-[var(--primary)] text-md transition-all placeholder-transparent" id="email" name="email"></textarea>
                    <label htmlFor="email" className="text-white font-bold transition-all">
                        Additional description
                    </label>
                </div>
            <Button onclick={e => submit(e)} text="Submit"/>
        </div>
  </>)
}

export default AddExperience