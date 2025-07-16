import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import fetchUserDetails from '../utils/fetchUserDetails';
import { setUserDetails } from '../store/userSlice';


const Profile = () => {
  const user = useSelector((state) => state?.user)
  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false)
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    address: user.address
  })

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      address: user.address
    })
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData
      })
      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
        const userData = await fetchUserDetails()
        dispatch(setUserDetails(userData.data))
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)

    }

  }

  return (
    <div className='p-4'>
      {/* profile upload and display avatar */}
      <div className='w-20 h-20 flex justify-center items-center rounded-full overflow-hidden drop-shadow-sm'>
        {
          user.avatar ? (
            <img src={user.avatar}
              alt={user.name}
              className='w-full h-full'
            />
          ) : (

            <FaUserCircle size={65} />
          )
        }
      </div>
      <button onClick={() => setProfileAvatarEdit(true)} className='text-sm min-w-20 border border-primary-100 hover:border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-full mt-3'>Edit</button>
      {
        openProfileAvatarEdit && (

          <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
        )
      }

      {/* name, email, mobile and address */}

      <form className='my-4 grid gap-4' onSubmit={handleSubmit}>
        <div className='grid'>
          <label>Name</label>
          <input type="text"
            placeholder='Enter your name'
            className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
            value={userData.name}
            name='name'
            required
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </div>
        <div className='grid'>
          <label htmlFor='email'>Email</label>
          <input type="email"
            id='email'
            placeholder='Enter your Email'
            className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
            value={userData.email}
            name='email'
            required
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
        </div>
        <div className='grid'>
          <label htmlFor='mobile' >Mobile</label>
          <input type="text"
            id='mobile'
            placeholder='Enter your Mobile'
            className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
            value={userData.name}
            name='mobile'
            required
            onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
          />
        </div>
        <button className='border px-4 py-2 font-semibold hover:bg-primary-200 border-primary-200  text-primary-200 hover:text-white rounded'>

          {
            loading ? 'Loading...' : 'Submit'
          }
        </button>
      </form>

    </div>
  )
}

export default Profile
