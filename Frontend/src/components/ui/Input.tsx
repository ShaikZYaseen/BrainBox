
interface inputProps{
  type:string,
  placeholder?:string
}
const Input = (props:inputProps) => {
  return (
    <div className='bg-black rounded-md'>
      <input className="bg-black text-white text-[10px] p-1 rounded-md" type={props.type} placeholder={props.placeholder}/>
    </div>
  )
}

export default Input