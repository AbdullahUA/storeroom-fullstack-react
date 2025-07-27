
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails.js';
import { setUserDetails } from './store/userSlice.js'
import { setAllCategory, setAllSubCategory, setLoadingCategory } from './store/productSlice.js';
import { useDispatch } from 'react-redux';
import SummaryApi from './common/SummaryApi.js';
import Axios from './utils/Axios.js';
import { handleAddItemCart } from './store/cartProduct.js';
import GlobalProvider from './provider/GlobalProvider.jsx';
import { FaCartShopping } from 'react-icons/fa6';
import CartMobileLink from './components/CartMobileLink.jsx';

function App() {

  const dispatch = useDispatch()

  const fetchUser = async () => {
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...SummaryApi.getCategory
      })

      const { data: responseData } = response
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data))
      }

    } catch (error) {

    } finally {
      dispatch(setLoadingCategory(false))
    }


  }

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory
      })

      const { data: responseData } = response
      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data))
      }

    } catch (error) {

    } finally {

    }


  }



  useEffect(() => {
    fetchCategory()
    fetchUser()
    fetchSubCategory()

  }, [])

  return (
    <>
      <GlobalProvider>
        <Header />
        <main className='min-h-[78vh]'>
          <Outlet />
        </main>
        <Footer />
        <Toaster />
        <CartMobileLink />
      </GlobalProvider>
    </>
  )
}

export default App
