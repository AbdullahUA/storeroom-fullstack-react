import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import { toast } from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { RiExternalLinkFill } from "react-icons/ri";
import isAdmin from '../utils/isAdmin'


const UserMenu = ({ close }) => {
    const user = useSelector((state) => state?.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.logout
            })
            if (response.data.success) {
                if (close) {
                    close()
                }
                dispatch(logout())
                localStorage.clear()
                toast.success(response.data.message)
                navigate('/')

            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const handleCloseUserMenu = () => {
        if (close) {
            close()
        }
    }

    return (
        <div>
            <div className='font-semibold'>My Account</div>
            <div className='text-sm flex items-center gap-1'>
                <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile} <span className='text-sm text-red-500'> {user.role === 'ADMIN' ? "(Admin)" : ''}</span></span>
                <Link onClick={handleCloseUserMenu} to={'/dashboard/profile'} className='hover:text-primary-200'>
                    <RiExternalLinkFill size={15} />
                </Link> </div>
            <Divider />
            <div className='text-sm grid gap-2'>
                {
                    isAdmin(user) && (

                        <Link onClick={handleCloseUserMenu} to={'/dashboard/category'} className='px-2 hover:bg-orange-200 py-1 text-neutral-600 hover:text-neutral-900'>Category</Link>
                    )
                }

                {
                    isAdmin(user) && (

                        <Link onClick={handleCloseUserMenu} to={'/dashboard/subcategory'} className='px-2 hover:bg-orange-200 py-1 text-neutral-600 hover:text-neutral-900'>Sub category</Link>
                    )
                }
                {
                    isAdmin(user) && (

                        <Link onClick={handleCloseUserMenu} to={'/dashboard/upload-product'} className='px-2 hover:bg-orange-200 py-1 text-neutral-600 hover:text-neutral-900'>Upload Product</Link>
                    )
                }
                {
                    isAdmin(user) && (

                        <Link onClick={handleCloseUserMenu} to={'/dashboard/product'} className='px-2 hover:bg-orange-200 py-1 text-neutral-600 hover:text-neutral-900'>Product</Link>
                    )
                }

                <Link onClick={handleCloseUserMenu} to={'/dashboard/myorders'} className='px-2 hover:bg-orange-200 py-1 text-neutral-600 hover:text-neutral-900'>My Order</Link>
                <Link onClick={handleCloseUserMenu} to={'/dashboard/address'} className='px-2 hover:bg-orange-200 py-1 text-neutral-600 hover:text-neutral-900'>My Address</Link>
                <button onClick={handleLogout} className='text-left px-2 hover:bg-orange-200 py-1 hover:text-red-500'>Log out</button>

            </div>
        </div>
    )
}

export default UserMenu
