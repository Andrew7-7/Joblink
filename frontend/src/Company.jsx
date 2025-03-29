import React, {useEffect, useState} from 'react';
import { backend } from 'declarations/backend';

const Company = () => {
  
  const [companies, setCompanies] = useState([])

  const getCompanies = async () => {
    try{
      const res = await backend.get_companies()
      setCompanies(res)
      
    }catch(e){
      
    }
  }
  useEffect(() => {
    getCompanies()
  }, [])
  
  return (
  <div className="absolute z-10 my-24 flex w-full justify-center">
    <div className="w-4/5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {companies.map((company, index) => (
        <div
          key={index}
          className="border-infinite/20 hover:border-infinite/40 transform rounded-xl border bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <div className="mb-4 flex items-center">
            <span className="w-[70px] aspect-square mr-4 rounded-full overflow-hidden text-4xl"><img src={company.profile_pic} alt="🏢" className="w-full h-full object-cover"/></span>
            <span className="text-xl font-bold tracking-tight text-black">{company.name}</span>
          </div>
          <div className="text-infinite text-lg font-medium">
            <h4>Email: {company.email}</h4>
          </div>
        </div>
      ))}
    </div>
  </div>
  
)};

export default Company;
