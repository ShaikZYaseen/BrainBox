import React, { useState } from 'react'
import Input from './ui/Input'
import { Button } from './ui/Button'
import { Link } from 'react-router-dom'
import { Signupauth } from '../services/auth'

const Signup = () => {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false)

    const handleSubmit = async() => {
       setLoading(true) ;
       const data = {username,email,password}
       const response = await Signupauth(data);
       console.log(response)
    }

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center bg-black'>
        <h1 className='text-white font-bold text-[30px]'>Signup</h1>
        <div className='h-[400px] w-[300px] bg-gray-300 rounded-2xl pt-7 flex flex-col justify-center items-center'>
        <div className='mb-2 p-2'>
        <p className='font-bold pb-1'>Username :</p>
        <Input size="md" type="text" onChange={(e)=>setUsername(e.target.value)} placeholder="Enter your name."/>
         </div>
        <div className='mb-2 p-2'>
        <p className='font-bold pb-1'>Email :</p>
        <Input size="md" type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email."/>
         </div>
      <div className='p-2'>
      <p className='font-bold pb-1'>Password :</p>
        <Input size="md" type="password" onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password'/>
      </div>
      <div className='mt-4'>
        <Button onclick={()=>handleSubmit()} text="Signup" size="sm" variant="primary"/>
        </div>
        <p className='mt-2 text-[13px] pt-3'>already have an account ? <Link to="/login" className=''>login</Link></p>
        </div>
    </div>
  )
}

export default Signup