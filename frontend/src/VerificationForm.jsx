import Button from "./Button"
import FormLayout from "./FormLayout"

const VerificationForm = ({submit}) => {
   return (
    <FormLayout>
        <h4 className="font-medium text-white w-4/5 rounded-lg h-[50px] flex justify-center items-center text-2xl border-white border-2">123456</h4>
        <div className="w-4/5">
            <label htmlFor="code" className="text-left w-full text-white font-bold">Input Verification Code</label>
            <input required type="text" className="bg-transparent border-white border-b-2 py-1 px-2 w-full focus:outline-none text-[var(--primary)]" id="code" name="code"/>
        </div>
        <Button onclick={submit} text={"Register"}/>
    </FormLayout>
   ) 
}

export default VerificationForm