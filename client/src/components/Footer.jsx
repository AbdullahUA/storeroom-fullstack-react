import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const footer = () => {
  return (
    <footer className='h-20 shadow-md'>
        <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:flex-justify-between gap-2'>
            <p>© 2025 All rights reserved</p>

        <div className='flex items-center gap-4 justify-center text-2xl '>
          <a href="" className='hover:text-primary-100' >
          <FaFacebook className='text-2xl' />
            </a>  
            <a href="" className='hover:text-primary-100'>
            <FaInstagram className='text-2xl' /> 
            </a>
            <a href="" className='hover:text-primary-100'>
                <FaLinkedin className='text-2xl' />
            </a>
        </div>
        </div>
    </footer>
  )
}

export default footer
