import Button from "./Button"
import FormLayout from "./FormLayout"

const ProfileForm = ({submit}) => {
    return (
     <FormLayout>
        <div className="flex justify-between w-4/5">
            <div className="w-[45%] h-1/3">
                <label htmlFor="name" className="text-left w-full text-white font-bold">Whats your name?</label>
                <input required type="text" className="bg-transparent border-white border-b-2 py-1 px-2 w-full focus:outline-none text-[var(--primary)]" id="name" name="name"/>
            </div>
            <div className="w-[45%] h-1/3">
                <label htmlFor="name" className="text-left w-full text-white font-bold">Whats your email?</label>
                <input required type="email" className="bg-transparent border-white border-b-2 py-1 px-2 w-full focus:outline-none  text-[var(--primary)]" id="email" name="email"/>
            </div>
        </div>
        <div className="w-4/5 h-1/3">
            <label  htmlFor="file" className="text-white font-bold flex flex-col gap-1">
                Profile Picture
                <p className="border-white border-2 w-full p-5 flex justify-center items-center text-white rounded-md">Input your file here</p>
            </label>
            <input required type="file" id="file" className="hidden" name="file"/>
        </div>
            <Button text={"Next"} onclick={submit}/>
     </FormLayout>
    ) 
 }
 
 export default ProfileForm