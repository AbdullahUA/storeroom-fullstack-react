import React from 'react'

const ProductCardAdmin = ({ data }) => {
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
                <button className='border px-1 text-sm py-1 border-green-500 hover:bg-green-500 hover:text-white rounded'>Edit</button>
                <button className='border px-1 text-sm py-1 border-red-500 hover:bg-red-500 hover:text-white rounded'>Delete</button>
            </div>
        </div>
    )
}

export default ProductCardAdmin
