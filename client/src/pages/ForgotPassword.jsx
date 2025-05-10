import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { toast } from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [data, setData] = useState({ email: "" })

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const navigate = useNavigate()

    const validValue = Object.values(data).every(item => item)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const response = await Axios({
                ...SummaryApi.forgot_password,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            })
            console.log("Email data:", data);

            console.log('Response', response)
            if (!response.data.success) {
                toast.error(response.data.message)
            } else {
                toast.success(response.data.message)
                navigate('/verification-otp', {
                    state: data
                })
                setData({ email: "" })
            }
        } catch (error) {
            AxiosToastError(error)
        }

    }
    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className='font-semibold text-lg '>Verify Your Email</p>
                <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>

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


                    <button disabled={!validValue} className={` ${validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold my-3 tracking-wide`} >Send Otp</button>
                </form>
                <p>
                    Already have an account ? <Link to={"/login"} className='font-semibold text-green-800 hover:text-green-600'>Login</Link>
                </p>

            </div>
        </section>
    )
}

export default ForgotPassword
