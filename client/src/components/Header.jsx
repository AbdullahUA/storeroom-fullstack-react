import React from 'react'
import logo from '../assets/Store room logo.png'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";


const Header = () => {
  const [isMobile] = useMobile(768)
  const location = useLocation()
  const navigate = useNavigate()
  const isSearchPage = location.pathname === '/search'
  console.log('ismobile', isMobile)

  const redirectToLoginPage=()=>{
    navigate('/login')
  }

  return (
    <header className='h-29 lg:h-28 lg:shadow-md sticky top-0 flex flex-col justify-center bg-white'>
      {
        !(isSearchPage && isMobile) && (
          <div className='container mx-auto  flex items-center  px-2 justify-between '>
            {/* {Logo} */}
            <div className='h-full'>
              <Link to={"/"} className=' h-full flex justify-center ittems-center '>
                <img src={logo} width={200} height={60} alt='logo' className='hidden lg:block' />
                <img src={logo} width={120} height={60} alt='logo' className='lg:hidden' />
              </Link>
            </div>
            {/* {Search bar} */}
            <div className='hidden lg:block'>
              <Search />
            </div>

            {/* {Login and my cart} */}

            <div className=''>
              {/* for Mobile version */}
              <button className='text-neutral-600 lg:hidden'>
                <FaUserCircle size={33} />
              </button>
              {/* for desktop version */}
              <div className='hidden lg:flex items-center gap-10'>
                <button onClick={redirectToLoginPage} className='text-lg'>Login</button>
                <button className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-3 rounded text-white'>
                  {/* add to cart icons */}
                  <div className='animate-bounce'>
                    <BsCart4 size={28}  />
                  </div>
                  <div className='font-semibold'>
                      <p>My cart</p>
                  </div>
                </button>
              </div>
            </div>

          </div>
        )
      }

      <div className='container mx-auto px-2 lg:hidden mb-3'>
        <Search />
      </div>
    </header>
  )
}

export default Header
