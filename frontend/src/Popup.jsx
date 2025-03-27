import React from "react";

export const Popup = ({status, type, message}) => {
  const types = {
    "failed": "bg-red-500",
    "success":"bg-green-500"
  }

  return (
      <div className={`${types[type]} z-50 fixed bottom-0 ${status != type?"right-[-20vw] w-0":"right-0 min-w-1/5"} h-[10%] m-5 flex justify-center items-center rounded-lg border-white border-2 transition-[right] ease-in-out duration-800 px-5 gap-x-2`}>
          <div className="w-[25px] h-[25px] object-cover">
            <img src="/exclamation-circle.png" className="w-full h-full"/>
          </div>
          <h4 className="text-white font-semibold text-lg">{message}</h4>
      </div>

  )
}

export default Popup
