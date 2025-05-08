import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { toast } from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowComfirmPassword] = useState(false)
    const navigate=useNavigate()
    const handleShowPassword = () => {
        setShowPassword((prev) => (!prev))
    }
    const handleShowConfirmPassword = () => {
        setShowComfirmPassword((prev) => (!prev))
    }

    
    const validValue = Object.values(data).every(item => item)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(data.password !== data.confirmPassword){
            toast.error("Password and Confirm Password should be same")
            return
        }
        try {
            
        const response = await Axios({
            ...SummaryApi.register,
             data:data
        })
        console.log('Response',response)
        if (!response.data.success) {
            toast.error(response.data.message)
          } else {
            toast.success(response.data.message)
            setData({
                name:"",
                email:"",
                password:"",
                confirmPassword:""
            })
            navigate('/login')
          }
        } catch (error) {
            AxiosToastError(error)
        }

    }
    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p>Welcome to Storeroom</p>
                <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor="name">Name :</label>
                        <input type="text"
                            id='name'
                            placeholder='Enter your name'
                            autoFocus
                            className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                            name='name'
                            value={data.name}
                            onChange={handleChange} />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="email">Email :</label>
                        <input type="email"
                            id='email'
                            placeholder='Enter your email'
                            className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                            name='email'
                            value={data.email}
                            onChange={handleChange} />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="password">Password :</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>

                            <input type={showPassword ? "text" : "password"}
                                id='password'
                                placeholder='Enter your Password'
                                autoFocus
                                className='w-full outline-none'
                                name='password'
                                value={data.password}
                                onChange={handleChange} />
                            <div onClick={handleShowPassword} className='cursor-pointer'>
                                {
                                    showPassword ?
                                        <FaRegEye size={20} />
                                        :
                                        <FaRegEyeSlash size={20} />
                                }
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="confirmPassword">Confirm Password :</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>

                            <input type={showConfirmPassword ? "text" : "password"}
                                id='confirmPassword'
                                placeholder='Enter your Confirm Password'
                                autoFocus
                                className='w-full outline-none'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleChange} />
                            <div onClick={handleShowConfirmPassword} className='cursor-pointer'>
                                {
                                    showConfirmPassword ?
                                        <FaRegEye size={20} />
                                        :
                                        <FaRegEyeSlash size={20} />
                                }
                            </div>
                        </div>
                    </div>
                    <button disabled={!validValue} className={` ${validValue ?"bg-green-800 hover:bg-green-700" :"bg-gray-500"}  text-white py-2 rounded font-semibold my-3 tracking-wide`} >Register</button>
                </form>

                <p>
                    Already have account ? <Link to={"/login"} className='font-semibold text-green-800 hover:text-green-600'>Login</Link>
                </p>
            </div>
        </section>
    )
} 

export default Register
