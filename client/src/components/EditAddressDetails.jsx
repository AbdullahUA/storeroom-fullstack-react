import React from 'react'
import { useForm } from "react-hook-form"
import Axios from '../utils/Axios.js'
import SummaryApi from '../common/SummaryApi.js'
import AxiosToastError from '../utils/AxiosToastError.js'
import toast from 'react-hot-toast'
import { IoClose } from 'react-icons/io5'
import { useGlobalContext } from '../provider/GlobalProvider.jsx'

const EditAddressDetails = ({ close, data }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            _id: data._id,
            userId: data.userId,
            address_line: data.address_line,
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            country: data.country,
            mobile: data.mobile

        }
    })
    const { fetchAddress } = useGlobalContext()
    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await Axios({
                ...SummaryApi.editAddress,
                data: {
                    ...data,
                    address_line: data.address_line,
                    city: data.city,
                    state: data.state,
                    pincode: data.pincode,
                    country: data.country,
                    mobile: data.mobile
                }
            })
            const { data: responseData } = response

            if (responseData.success) {
                if (close) {
                    close()
                    reset()
                    fetchAddress()
                }
                toast.success(responseData.message)

            }
        } catch (error) {
            AxiosToastError(error)
        }

    }





    return (
        <section className='bg-black fixed top-0 bottom-0 right-0 left-0 z-50 bg-opacity-70 overflow-auto'>
            <div className='bg-white p-4 w-full max-w-lg mx-auto rounded'>
                <div className='font-semibold flex justify-between items-center gap-4'>
                    <h2 className='font-semibold'>Edit Address</h2>

                    <button onClick={close} className='hover:text-red-500'>
                        <IoClose size={25} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} action="" className='mt-4 grid gap-4 '>
                    <div className='grid gap-1'>
                        <label htmlFor="addressLine">Address Line:</label>
                        <input type="text" name=""
                            id="addressLine" className='border bg-blue-50
                          p-2 rounded'
                            {...register('address_line', { required: true })}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="city">City:</label>
                        <input type="text" name=""
                            id="city" className='border bg-blue-50
                          p-2 rounded'
                            {...register('city', { required: true })}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="state">State:</label>
                        <input type="text" name=""
                            id="state" className='border bg-blue-50
                          p-2 rounded'
                            {...register('state', { required: true })}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="pincode">Pincode:</label>
                        <input type="text" name=""
                            id="pincode" className='border bg-blue-50
                          p-2 rounded'
                            {...register('pincode', { required: true })}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="country">Country:</label>
                        <input type="text" name=""
                            id="country" className='border bg-blue-50
                          p-2 rounded'
                            {...register('country', { required: true })}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="mobile">Mobile No:</label>
                        <input type="text" name=""
                            id="mobile" className='border bg-blue-50
                          p-2 rounded'
                            {...register('mobile', { required: true })}
                        />
                    </div>


                    <button type='submit' className='w-full bg-primary-200 font-semibold py-2'>Update</button>
                </form>
            </div>
        </section>
    )
}

export default EditAddressDetails
