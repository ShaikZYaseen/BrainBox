import Input from './ui/Input'
import { Button } from './ui/Button'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='w-screen h-screen bg-black flex flex-col justify-center items-center'>
      <h1 className='font-bold text-white text-[30px]'>Login</h1>
    <div className='shadow-md pt-7 bg-gray-300 h-[270px] w-[300px] flex flex-col justify-center rounded-2xl items-center'>
      <div className='mb-2'>
        <p className='font-bold'>Email :</p>
        <Input type="text" size="sm" placeholder="Enter your email."/>
         </div>
      <div>
      <p className='font-bold'>Password :</p>
        <Input size="sm" type="password" placeholder='Enter your password'/>
        </div>
        <div className='mt-4'>
        <Button text="Login" size="sm" variant="primary"/>
        </div>
        <p className='mt-2 text-[13px] pt-3'>Don't have an account ? <Link to="/signup" className=''>signup</Link></p>
    </div>
    </div>

  )
}

export default Login