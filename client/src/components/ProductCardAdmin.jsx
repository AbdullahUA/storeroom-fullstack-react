import React, { useState } from 'react'
import EditProductAdmin from './EditProductAdmin.jsx'
import { IoClose } from 'react-icons/io5'
import AxiosToastError from '../utils/AxiosToastError.js'
import Axios from '../utils/Axios.js'
import SummaryApi from '../common/SummaryApi.js'
import toast from 'react-hot-toast'

const ProductCardAdmin = ({ fetchProductData, data }) => {

    const [editOpen, setEditOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const handleDelete = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteProduct,
                data: {
                    _id: data._id
                }
            })

            const { data: responseData } = response
            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchProductData) {
                    fetchProductData()
                }
                setOpenDelete(false)
            }

        } catch (error) {
         AxiosToastError(error)
        }
    }

    return (
        <div className='w-36 p-4 bg-white rounded'>
            <div>
                <img
                    src={data?.image[0]}
                    alt={data.name}
                    className='w-full h-full object-scale-down'
                />
            </div>
            <p className='text-ellipsis line-clamp-2 font-medium' >{data.name}</p>
            <p className='text-slate-500'>{data.unit}</p>
            <div className='grid grid-cols-2 gap-3 py-2'>
                <button onClick={() => setEditOpen(true)} className='border px-1 text-sm py-1 border-green-500 hover:bg-green-500 hover:text-white rounded'>Edit</button>
                <button onClick={() => setOpenDelete(true)} className='border px-1 text-sm py-1 border-red-500 hover:bg-red-500 hover:text-white rounded'>Delete</button>
            </div>
            {
                editOpen && (

                    <EditProductAdmin data={data} close={() => setEditOpen(false)} fetchProductData={fetchProductData} />
                )
            }
            {
                openDelete && (

                    <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-600 z-50 bg-opacity-70 flex justify-center items-center'>
                        <div className='bg-white p-4 w-full max-w-md rounded-md'>
                            <div className='flex items-center justify-between  gap-4'>
                                <h3 className='font-semibold'>Permenant Delete</h3>
                                <button onClick={() => { setOpenDelete(false) }} >
                                    <IoClose size={25} />
                                </button>
                            </div>
                            <p className='my-2'>Are you sure want to delete permenantly?</p>
                            <div className='flex justify-end gap-4 py-4'>
                                <button onClick={() => setOpenDelete(false)} className='border px-3 py-1 rounded border-green-500 text-green-500 hover:bg-green-500 hover:text-white'>Cancel</button>
                                <button onClick={handleDelete} className='border px-3 py-1 rounded  border-red-500 text-red-500 hover:bg-red-500 hover:text-white '>Delete</button>

                            </div>

                        </div>
                    </section>
                )
            }

        </div>
    )
}

export default ProductCardAdmin
