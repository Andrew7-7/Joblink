const Button = ({text, onclick}) => {
    return (
    <button value={text} onClick={onclick} className='text-[var(--primary)] hover:brightness-125 hover:scale-105 transition ease-in-out duration-200 hover:text-white w-2/5 font-bold py-2 px-2 bg-gradient-to-br from-pink-500 to-[var(--blue)] rounded-xl'>{text}
    </button>
    )
}

export default Button