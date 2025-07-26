import React from 'react'
import logo from '../assets/Store room logo.png'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useState } from 'react';
import UserMenu from './UserMenu';
import { useEffect } from 'react';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';



const Header = () => {
  const [isMobile] = useMobile(768)
  const location = useLocation()
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user)
  const cartItem = useSelector(state => state?.cartItem?.cart)
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQty, setTotalQty] = useState(0)

  const isSearchPage = location.pathname === '/search'

  const redirectToLoginPage = () => {
    navigate('/login')
  }
  const handleCloseUserMenu = () => {
    setOpenUserMenu(false)
  }

  const handleMobileUser = () => {
    if (!user?._id) {
      navigate('/login')
      return
    }
  }


  useEffect(() => {
    const qty = cartItem.reduce((prev, curr) => {
      return prev + curr.quantity
    }, 0)
    setTotalQty(qty)

    const tPrice = cartItem.reduce((prev,curr) => {
      return prev + curr.productId.price * curr.quantity
    },0)

    setTotalPrice(tPrice)
  }, [cartItem])

  return (
    <header className='h-29 lg:h-28 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center bg-white'>
      {
        !(isSearchPage && isMobile) && (
          <div className='container mx-auto flex items-center px-2 justify-between'>
            {/* {Logo} */}
            <div className='h-full'>
              <Link to={"/"} className=' h-full flex justify-center items-center '>
                <img src={logo} width={200} height={60} alt='logo' className='hidden lg:block' />
                <img src={logo} width={120} height={60} alt='logo' className='lg:hidden' />
              </Link>
            </div>
            {/* {Search bar} */}
            <div className='hidden lg:block'>
              <Search />
            </div>

            {/* {Login and my cart} */}

            <div>
              {/* for Mobile version */}
              <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser} >
                <FaUserCircle size={33} />
              </button>
              {/* for desktop version */}
              <div className='hidden lg:flex items-center gap-10'>
                {user?._id ? (
                  <div className='relative'>
                    <div onClick={() => setOpenUserMenu(prev => !prev)} className='flex items-center select-none gap-1 cursor-pointer'>
                      <p>Account</p>
                      {
                        openUserMenu ? (
                          <GoTriangleUp size={25} />

                        ) : (

                          <GoTriangleDown size={25} />
                        )
                      }
                    </div>
                    {
                      openUserMenu && (
                        <div className='absolute right-0 top-16'>
                          <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                            <UserMenu close={handleCloseUserMenu} />

                          </div>
                        </div>
                      )
                    }
                  </div>
                ) : (

                  <button onClick={redirectToLoginPage} className='text-lg'>Login</button>
                )
                }

                <button className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-3 rounded text-white'>
                  {/* add to cart icons */}
                  <div className='animate-bounce'>
                    <BsCart4 size={28} />
                  </div>
                  <div className='font-semibold'>
                    {
                      cartItem[0] ? (
                        <div>
                          <p>{totalQty} Items</p>
                          <p>{DisplayPriceInRupees(totalPrice)}</p>
                        </div>) : (
                        <p>My cart</p>
                      )

                    }
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
