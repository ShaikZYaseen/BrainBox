import React from 'react'
import Input from './ui/Input'
import { Button } from './ui/Button'

const Login = () => {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <h1 className='font-bold text-[30px]'>Login</h1>
    <div className='shadow-md bg-gray-300 h-[300px] w-[300px] flex flex-col justify-center rounded-2xl items-center'>
      <div className='mb-2'>
        <p className='font-bold'>Email:</p>
        <Input type="text" placeholder="Enter your email."/>
         </div>
      <div>
      <p className='font-bold'>password:</p>
        <Input type="password" placeholder='Enter your password'/>
        </div>
        <div className='mt-2'>
        <Button text="Login" size="sm" variant="primary"/>
        </div>
    </div>
    </div>

  )
}

export default Login