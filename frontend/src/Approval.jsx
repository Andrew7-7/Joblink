import React, {useState, useContext, useEffect} from 'react';
import { backend } from 'declarations/backend';
import {AuthContext} from "./AuthContext"
import Popup from "./Popup"
import Button from "./Button"

const statusEnum = [
  "Rejected",
  "Accepted"
]

const Approval = () => {
  
  const [message, setmessage] = useState('')
  const [status, setStatus] = useState('')
  const [approvalStatus, setApprovalStatus] = useState(0)
  const [approvals, setApprovals] = useState([])
  const {principal} = useContext(AuthContext)

  function variantToString(variant) {
    return Object.keys(variant)[0];
  }
  async function timeout(){
        setTimeout(() => {
                setStatus('')
                setmessage('')
            }, 3000)
    }

  const getUser = async (id) => {
    try{
      const user = await backend.get_user({principal_id: id})
      return user
    }catch(e){
      return null
    }
  }

  const getApprovals = async () =>{
    try{
      const res = await backend.get_company_experience_request({principal_company_id:principal});
      const approvals = await Promise.all(res.map(async (e) => {
        const user = await getUser(`${e.data.principal_user_id}`) ?? [{name:"error"}]
        return {
          data: e.data,
          status:variantToString(e.status),
          user: user[0]
        }
      }))
      setApprovals(approvals)
    }catch(e){

    }
    
  }

  useEffect(() => {
    getApprovals()
  }, [])

  const updateApproval = async (idx) => {
    try{
      const res = await backend.update_experience_request({
        principal_company_id:principal,
        index:idx,
        status: approvalStatus == 0?{Rejected:null}:{Accepted:null}
      })
      if ("Ok" in res){
        return ""
      }else{
        return res.Err
      }
    }catch(e){
      return "" +e
    }
  }

  const submit = async (e,idx) => {
    e.preventDefault()
    const result = await updateApproval(idx)
    if (result == ""){
      setmessage("Approval Update Success")
      setStatus("success")
    }else{
      setmessage(result)
      setStatus("failed")
    }
    timeout()
  }

  const dateFormat = (date) => {
        return `${date.toLocaleString("defaulft", {month:"short"})} ${date.getFullYear()}`
    }
  
  return (
  <div className ="my-24 absolute z-10 w-full">
    <Popup type={"failed"} status={status} message={message}/>
    <Popup type={'success'} status={status} message={message}/>
    <div className="flex flex-col gap-y-3 w-full items-center">
    {approvals.map((approval, index) => (
      <div
        key={index}
        className="border-infinite/20 hover:border-infinite/40 transform rounded-xl border bg-[var(--secondary)] p-6 shadow-lg  transition-all duration-300 w-4/5 "
      >
      <div className ="w-full flex justify-between items-center border-b-2 py-2 border-white">
      <h1 className="text-white text-lg">Request by {approval.user.name}</h1>
      <h1 className={`${approval.status == "Accepted"?"text-green-500":"text-red-500"} text-lg`}>{approval.status}</h1>
      </div>
      <div className="flex items-center py-2 justify-between w-full">
        <div className="w-full">
          <p className="text-white text-lg font-bold">{approval.data.position}</p>
          <p className="text-gray-400 text-sm mt-2">
              {dateFormat(new Date(Number(approval.data.start_date)))} - {approval.data.end_date != 0 ? dateFormat(new Date(Number(approval.data.end_date))):"Now"}
          </p>
        </div>
          {approval.status != "Accepted" && <form className="text-infinite text-lg flex font-medium w-2/5" onSubmit={(e) => submit(e,index)}>
            <select onChange={(e) => setApprovalStatus(e.target.value)}
                className="w-1/2 bg-transparent placeholder:text-slate-700 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                {statusEnum.map((e, idx) => <option value={idx}>{e}</option>)}
            </select>
            <Button onclick={()=>{}} text="Update"/>
          </form>}
        </div>
      </div>
    ))}
    </div>
  </div>
)};

export default Approval;
