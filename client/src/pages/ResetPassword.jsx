import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { FaRegEye } from 'react-icons/fa6'
import { FaRegEyeSlash } from 'react-icons/fa6'
import AxiosToastError from '../utils/AxiosToastError'

const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })
    //check point
    useEffect(() => {
        if (!location?.state?.data?.success) {
            navigate('/')
        }

        if (location?.state?.email) {
            setData((prev) => {
                return {
                    ...prev,
                    email: location?.state?.email
                }
            })
        }

    }, [])

    console.log("data reset ", data)

    const validValue = Object.values(data).every(el => el)

    const handleChange = (e) => {
        const { name, value } = e.target

        setData(
            (prev) => {
                return {
                    ...prev,
                    [name]: value
                }
            }
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (data.newPassword !== data.confirmPassword) { 
                toast.error("New Password and Confirm Password should be same")
                setData((prev) => ({
                    ...prev,
                    newPassword: "",
                    confirmPassword: ""
                }));
                return
            }
            const response = await Axios({
                ...SummaryApi.reset_password,
                data: data
            })

            if (response.data.error) {
                toast.error(response.data.message)
            }

            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/login')
                setData({
                    email: "",
                    newPassword: "",
                    confirmPassword: ""
                })
            }




        } catch (error) {
            AxiosToastError(error)
        }


    }
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const handleShowNewPassword = () => {
        setShowNewPassword(prev => !prev)
    }
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(prev => !prev)
    }
    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className='font-semibold text-lg '>Enter Your New Password</p>
                <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>

                    <div className='grid gap-1'>
                        <label htmlFor="newPassword">New Password :</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>

                            <input type={showNewPassword ? "text" : "password"}
                                id='newPassword'
                                placeholder='Enter your Password'
                                autoFocus
                                className='w-full outline-none'
                                name='newPassword'
                                value={data.newPassword}
                                onChange={handleChange} />
                            <div onClick={handleShowNewPassword} className='cursor-pointer'>
                                {
                                    showNewPassword ?
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
                                placeholder='Confirm Password'
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


                    <button disabled={!validValue} className={` ${validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold my-3 tracking-wide`} >Reset Password</button>
                </form>
                <p>
                    Already have an account ? <Link to={"/login"} className='font-semibold text-green-800 hover:text-green-600'>Login</Link>
                </p>

            </div>
        </section>
    )
}

export default ResetPassword
