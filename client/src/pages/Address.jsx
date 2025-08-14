import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../components/AddAddress'
import { MdDelete, MdEdit } from 'react-icons/md'
import EditAddressDetails from '../components/EditAddressDetails'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useGlobalContext } from '../provider/GlobalProvider'

const Address = () => {
  const addressList = useSelector((state) => state.addresses.addressList)
  const [openAddress, setOpenAddress] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({})
  const { fetchAddress } = useGlobalContext()

  const handleDisableAddress = async (id) => {
    try {

      const response = await Axios({
        ...SummaryApi.disableAddress,
        data: {
          _id: id
        }
      })
      const { data: responsedata } = response
      if (responsedata.success) {
        toast.success("Address Removed")
        if (fetchAddress) {
          fetchAddress()
        }

      }


    } catch (error) {
      AxiosToastError(error)
    }
  }


  return (
    <div>
      <div className='bg-white shadow-lg px-2 py-2 flex justify-between gap-4 items-center'>
        <h2 className='font-semibold text-ellipsis line-clamp-1'>Addresses</h2>
        <button onClick={() => setOpenAddress(true)} className='border border-primary-200 text-primary-200 px-2 py-1 hover:bg-primary-200 hover:text-white rounded'>
          Add Address</button>
      </div>
      <div className='bg-blue-50 p-2 grid gap-4'>
        {
          addressList.map((address, index) => {
            return (
              <div key={index + 'addressList'} className={`border rounded p-3 flex gap-3 hover:bg-white ${!address.status && 'hidden'}`}>

                <div className='w-full'>
                  <p>{address.address_line}</p>
                  <p>{address.city}</p>
                  <p>{address.state}</p>
                  <p>{address.country}-{address.pincode}</p>
                  <p>{address.mobile}</p>
                </div>

                <div className=' grid gap-4 '>
                  <button onClick={() => {
                    setOpenEdit(true)
                    setEditData(address)
                  }} className='bg-green-300 p-1 rounded hover:bg-green-500'>
                    <MdEdit size={25} />
                  </button>
                  <button onClick={()=>handleDisableAddress(address._id)}     className='bg-red-300 p-1 rounded hover:bg-red-500'>
                    <MdDelete size={25} />
                  </button>
                </div>
              </div>

            )
          })

        }
        < div onClick={() => setOpenAddress(true)}  className='h-16 bg-blue-100 hover:bg-blue-200 border-2 border-dotted border-blue-400 flex justify-center items-center cursor-pointer'>
          Add address
        </div>

      </div>


      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
        )
      }

      {
        openEdit && (
          <EditAddressDetails data={editData} close={() => setOpenEdit(false)} />
        )
      }


    </div>
  )
}

export default Address
