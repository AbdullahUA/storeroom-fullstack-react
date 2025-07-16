import React from 'react'
import { useSelector } from 'react-redux'
import isAdmin from '../utils/isAdmin'

const AdminPermission = ({ children }) => {
    const user = useSelector((state) => state?.user)
    return (
        <>

            {
                isAdmin(user) ? children : (
                    <div className='text-red-600 bg-red-100 p-4 font-semibold'>You do not have admin permissions.</div>
                )
            }
        </>
    )
}

export default AdminPermission
