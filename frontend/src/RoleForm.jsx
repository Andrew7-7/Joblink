import Button from "./Button"
import FormLayout from "./FormLayout"

const RoleForm = ({submit}) => {
    return (
        <FormLayout>
            <h4 className="font-bold text-xl text-[var(--primary)]">You haven't registered yet! Choose your role</h4>
            <div className="flex w-full justify-evenly">
                <Button text="User" onclick={e => submit(e)}/>
                <Button text="Company" onclick={e => submit(e)}/>
            </div>
        </FormLayout>
    )
}

export default RoleForm