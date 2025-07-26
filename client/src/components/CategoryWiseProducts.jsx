import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError.js'
import Axios from '../utils/Axios.js'
import SummaryApi from '../common/SummaryApi.js'
import CardLoading from './CardLoading.jsx'
import CardProduct from './CardProduct.jsx'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { validURLConvert } from '../utils/validURLConvert.js'
import { useSelector } from 'react-redux'


const CategoryWiseProducts = ({ id, name }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef()
    const subCategoryData = useSelector(state => state.product.allSubCategory)
    const loadingCardNumber = new Array(6).fill(null)



    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProductByCategory,
                data: {
                    id: id
                }

            })
            const { data: responseData } = response
            // console.log( 'Category Wise Products',responseData.data)
            if (responseData.success) {
                setLoading(false)
                setData(responseData.data)
            }

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {

        fetchCategoryWiseProduct();
    }, []);


    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200
    }
    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200
    }


    const handleRedirectProductListPage = () => {
    
        const subCategory = subCategoryData.find(sub => {
            const filteredData = sub.category.some(c => {
                return c._id == id
            })
            return filteredData ? true : null
        })
         if (!subCategory) return ''
        const url = `/${validURLConvert(name)}-${id}/${validURLConvert(subCategory?.name)}-${subCategory?._id}`
        return url
        
    }
    const redirectURL=  handleRedirectProductListPage()

    return (
        <div>

            <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
                <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
                <Link to={redirectURL} className='text-green-600 hover:text-green-400'> See All</Link>
            </div>
            <div className='relative flex items-center'>
                <div className='flex gap-4 md:gap-6 lg:gap-8 container mx-auto p-4 overflow-x-scroll scrollbar-none scroll-smooth' ref={containerRef} >
                    {
                        loading &&
                        loadingCardNumber.map((_, index) => {
                            return (
                                <CardLoading key={'CategoryWiseProductDisplay123' + index} />
                            )
                        })
                    }

                    {


                        data.map((p, index) => {
                            return (
                                <CardProduct data={p} key={p._id + 'CategoryWiseProductDisplay' + index} />
                            )
                        })
                    }


                </div>
                <div className='w-fulll left-0 right-0 absolute hidden lg:flex justify-between container mx-auto px-2'>
                    <button onClick={handleScrollLeft} className='z-10 relative bg-white hover:bg-gray-300 shadow-lg text-lg p-4 rounded-full'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleScrollRight} className='z-10 relative bg-white hover:bg-gray-300 shadow-lg text-lg p-4 rounded-full'>
                        <FaAngleRight />
                    </button >
                </div>
            </div>
        </div>
    )
}

export default CategoryWiseProducts
