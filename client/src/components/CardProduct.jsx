import React from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { validURLConvert } from '../utils/validURLConvert.js'
import AxiosToastError from '../utils/AxiosToastError.js'
import { useState } from 'react'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios.js'
import toast from 'react-hot-toast'
import { useGlobalContext } from '../provider/GlobalProvider.jsx'
import AddToCartButton from './AddToCartButton.jsx'

const CardProduct = ({ data }) => {
  const url = `/product/${validURLConvert(data.name)}-${data._id}`
  const [loading, setLoading] = useState(false)
  const {fetchCartItem,updateCartItem}=useGlobalContext()


  const increaseQty=()=>{

  }

 
  return (
    <Link to={url} className='border py-2 lg:p-4 grid gap-1 lg:gap-2 min-w-36 max-w-52 lg:min-w-52 lg:max-w-52 rounded bg-white'>
      <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
        <img src={data.image[0]}
          className='w-full h-full object-scale-down lg:scale-125'
        />
      </div>
      <div className='flex items-center gap-1'>
        <div className=' rounded text-sm  w-fit p-[1px] px-2 h-fit  bg-green-400'>
          10 min
        </div>
        <div>
          {
            !data.discount == 0 && (
              <p className='text-green-700 bg-green-100 px-2 w-fit text-sm rounded-full'>{data.discount}% discount</p>
            )
          }
        </div>
      </div>
      <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm   lg:text-base  line-clamp-2'>
        {data.name}
      </div>
      <div className='px-2 text-sm lg:px-0 lg:text-base w-fit'>
        {data.unit}
      </div>

      <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base '>

        <div className=' font-semibold'>
          {DisplayPriceInRupees(data.price)}
        </div>


        <div className=''>
          {
            data.stock !== 0 ? (
             <AddToCartButton data={data}/>

            ) : (
              <p className='text-red-500 text-sm text-center px-2 lg:px-2 py-1'>Out of stock</p>
            )
          }

        </div>
      </div>
    </Link>
  )
}

export default CardProduct
