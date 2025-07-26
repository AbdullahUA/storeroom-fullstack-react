import React from 'react'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { useGlobalContext } from '../provider/GlobalProvider'
import { useState } from 'react'
import Loading from '../components/Loading.jsx'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'

const AddToCartButton = ({ data }) => {

    const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    const [qty, setQty] = useState(0)
    const [cartItemDetails, setCartItemDetails] = useState()

    const handleAddToCart = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.addToCart,
                data: {
                    productId: data?._id
                }
            })

            const { data: responseData } = response
            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchCartItem) {
                    fetchCartItem()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    const increaseQty = (e) => {
        e.preventDefault()
        e.stopPropagation()
        fetchCartItem()
        updateCartItem(cartItemDetails?._id, qty + 1)
    }
    const decreaseQty = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (qty === 1) {
            deleteCartItem(cartItemDetails?._id)
        } else {

            updateCartItem(cartItemDetails?._id, qty - 1)
        }
    }

    useEffect(() => {
        const checkingitem = cartItem.some(item => item?.productId?._id === data._id)
        setIsAvailableCart(checkingitem)
        const product = cartItem.find(item => item?.productId?._id === data._id)
        setQty(product?.quantity)
        setCartItemDetails(product)
    }, [data, cartItem])
    return (
        <div className='w-full max-w-[150px]'>
            {
                isAvailableCart ? (
                    <div className='flex h-full w-full'>
                        <button onClick={decreaseQty} className='bg-green-500 hover:bg-green-600 text-white flex-1 w-full p-1 rounded flex justify-center items-center'><FaMinus /></button>
                        <p className='flex-1 w-full font-semibold px-1 flex justify-center items-center'>{qty}</p>
                        <button onClick={increaseQty} className='bg-green-500 hover:bg-green-600 text-white flex-1 w-full p-1 rounded flex justify-center items-center'><FaPlus /></button>
                    </div>


                ) : (
                    <button onClick={handleAddToCart} className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded'>
                        {loading ? <Loading /> : ("Add")}
                    </button>
                )
            }



        </div>
    )
}

export default AddToCartButton
