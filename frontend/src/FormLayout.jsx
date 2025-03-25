const FormLayout = ({children}) => {
    return (
        <div className="flex flex-col gap-y-5 z-10 h-auto items-center justify-center w-2/5 bg-[var(--secondary)] rounded-xl absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] p-10 backdrop-opacity-0 drop-shadow-lg">
            {children}
        </div>
    )
}

export default FormLayout