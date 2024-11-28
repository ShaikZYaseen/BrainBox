import Input from './ui/Input'
import { Button } from './ui/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Loginauth } from '../services/auth'
import toast, { Toaster } from 'react-hot-toast'
import { userState } from './recoil/auth'
import { useRecoilState } from 'recoil'

const Login = () => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate();
  const [user,setUser] = useRecoilState(userState)

  const handleLogin = async() => {
    const data = {email,password}
    const response =await Loginauth(data);
    if(!response.error){
        toast.success("Login successful");
        setUser(response.user);
        localStorage.setItem('token', response.token);
        navigate("/dashboard");
    }else{
      toast.error(response.message)
    }
  }

  return (
    <div className='w-screen h-screen bg-black flex flex-col justify-center items-center'>
      <Toaster/>
      <h1 className='font-bold text-white text-[30px]'>Login</h1>
    <div className='shadow-md pt-7 bg-gray-300 h-[270px] w-[300px] flex flex-col justify-center rounded-2xl items-center'>
      <div className='mb-2'>
        <p className='font-bold'>Email :</p>
        <Input onChange={(e)=>setEmail(e.target.value)} type="text" size="sm" placeholder="Enter your email."/>
         </div>
      <div>
      <p className='font-bold'>Password :</p>
        <Input onChange={(e)=>setPassword(e.target.value)} size="sm" type="password" placeholder='Enter your password'/>
        </div>
        <div className='mt-4'>
        <Button onClick={()=>handleLogin()} text="Login" size="sm" variant="primary"/>
        </div>
        <p className='mt-2 text-[13px] pt-3'>Don't have an account ? <Link to="/signup" className=''>signup</Link></p>
    </div>
    </div>

  )
}

export default Login