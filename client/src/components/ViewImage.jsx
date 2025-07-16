import React from 'react'
import { IoClose } from 'react-icons/io5'

const ViewImage = ({url,close}) => {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-900 bg-opacity-70 flex items-center justify-center z-50 p-4'>
      <div className='w-full max-w-md max-h-[80vh] p-4 bg-white'>
       
        <button className='w-fit ml-auto block'>
            <IoClose size={25}
            onClick={close}/>
            </button>     
        <img src={url} alt="View Full Screen" 
        className='w-full h-full object-scale-down' />
        
      </div>
    </div>
  )
}

export default ViewImage
