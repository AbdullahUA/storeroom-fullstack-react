import React, { useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel';
import { useEffect } from 'react';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import EditCategory from '../components/EditCategory';
import ConfirmBox from '../components/ConfirmBox';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useSelector } from 'react-redux';
const CategoryPage = () => {
  const [openUploadCategoryModel, setOpenUploadCategoryModel] = useState(false);
  const [loading, setLoading] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false)
  const [editData, setEditData] = useState({
    name: '',
    image: ''
  })

  const [deleteCategory, setDeleteCategory] = useState({
    _id: ''
  })
  const handleDeleteCategory = async () => {
    try {

      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory
      })

      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
        setOpenDeleteConfirmBox(false)
      }

    } catch (error) {
      AxiosToastError(error)
      console.error("Error deleting category:", error);
    }
  }

  const allCategory = useSelector((state) => state.product.allCategory)

  useEffect(() => {
    setCategoryData(allCategory)
  }, [allCategory]
  )

  const fetchCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getCategory
      })

      const { data: responseData } = response
      if (responseData.success) {
        setCategoryData(responseData.data)
      }

    } catch (error) {

    } finally {
      setLoading(false)
    }


  }
  useEffect(() => {
    fetchCategory()
  }, [])

  return (
    <section>
      <div className='p-2  bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Category</h2>
        <button onClick={() => setOpenUploadCategoryModel(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Category</button>
      </div>
      {
        !categoryData[0] && !loading && (
          <NoData />
        )
      }
      <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
        {
          categoryData.map((category, index) => {
            return (
              <div className='w-32 h-56 rounded shadow-md' key={category._id}>
                <img src={category.image}
                  alt={category.name}
                  className='w-full object-scale-down'
                />

                <div className=' items-center h-9 flex gap-2'>
                  <button className='flex-1 bg-green-100 hover:bg-green-200  text-green-600 font-medium py-1 rounded'
                    onClick={() => {
                      setOpenEdit(true)
                      setEditData(category)
                    }}>
                    Edit
                  </button>
                  <button onClick={() => {
                    setOpenDeleteConfirmBox(true)
                    setDeleteCategory(category)
                  }

                  }
                    className='flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded'

                  >
                    Delete
                  </button>
                </div>

              </div>

            )
          })
        }
      </div>

      {
        loading && (
          <Loading />
        )
      }

      {
        openUploadCategoryModel && (
          <UploadCategoryModel close={() => setOpenUploadCategoryModel(false)}  />)
      }

      {
        openEdit && (
          <EditCategory data={editData} fetchData={fetchCategory} close={() => setOpenEdit(false)} />
        )
      }
      {
        openDeleteConfirmBox && (
          <ConfirmBox close={() => setOpenDeleteConfirmBox(false)} cancel={() => setOpenDeleteConfirmBox(false)} confirm={handleDeleteCategory} />
        )
      }



    </section >
  )
}

export default CategoryPage
