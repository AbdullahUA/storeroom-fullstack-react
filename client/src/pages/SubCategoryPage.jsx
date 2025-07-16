import React, { use, useEffect, useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import DisplayTable from '../components/DisplayTable';
import { createColumnHelper } from '@tanstack/react-table';
import ViewImage from '../components/ViewImage';
import { RiPencilFill } from "react-icons/ri";
import { MdDelete } from 'react-icons/md';
import EditSubCategory from '../components/EditSubCategory';
import ConfirmBox from '../components/ConfirmBox';
import toast from 'react-hot-toast';

const SubCategoryPage = () => {
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const columnHelper = createColumnHelper();
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: ''
  })
  const [DeleteData, setDeleteData] = useState({
    _id: ''
  })
  const [openDeleteConfirmbox, setOpenDeleteConfirmBox] = useState(false)


  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getSubCategory
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setSubCategoryData(responseData.data);
        console.log("SubCategory Data:", responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
      console.error("Error fetching subcategories:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchSubCategory();
  }, []);


  const column = [
    columnHelper.accessor('name', {
      header: 'Name',
    }),
    columnHelper.accessor('image', {
      header: 'Image',
      cell: ({ row }) => {
        console.log("Image Data:", row.original.image);
        return <div className='justify-center flex items-center'>
          <img className='w-8 h-8 cursor-pointer' src={row.original.image} alt={row.original.name}
            onClick={() => setImageUrl(row.original.image)}
          />
        </div>
      }
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: ({ row }) => {
        return (
          <>
            {
              row.original.category.map((cat, index) => {
                return (
                  <p key={cat._id + "table"} className='shadow-md px-1 inline-block'>{cat.name}</p>
                )
              })
            }
          </>

        )
      }
    }),
    columnHelper.accessor('_id', {
      header: 'Actions',
      cell: ({ row }) => {
        return (
          <div className='flex items-center justify-center gap-2'>
            <button onClick={() => {
              setOpenEdit(true)
              setEditData(row.original)
            }} className='p-2 bg-green-100 rounded-full text-green-500 hover:text-green-600 hover:bg-green-200'>
              <RiPencilFill size={20} />
            </button>
            <button onClick={() => {
              setOpenDeleteConfirmBox(true)
              setDeleteData(row.original)
            }} className='p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600 hover:bg-red-200'>
              <MdDelete size={20} />
            </button>
          </div>
        )
      }
    })

  ]

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: DeleteData
      })

      const { data: responseData } = response

    if(responseData.success){
      toast.success(responseData.message)
      fetchSubCategory()
      setOpenDeleteConfirmBox(false)
      setDeleteData({_id:''})

    }      

    } catch (error) {
      AxiosToastError(error)

    }

  }

  return (
    <section>
      <div className='p-2  bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Sub Category</h2>
        <button onClick={() => setOpenAddSubCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Sub Category</button>
      </div>

      <div className='overflow-auto w-full max-w-[95vw]'>
        <DisplayTable
          data={subCategoryData}
          column={column} />
      </div>

      {
        openAddSubCategory && (
          <UploadSubCategoryModel 
          close={() => setOpenAddSubCategory(false)}
          fetchSubCategory={fetchSubCategory} />
        )
      }

      {
        imageUrl &&
        <ViewImage url={imageUrl} close={() => setImageUrl('')} />
      }

      {
        openEdit && (
          <EditSubCategory data={editData} fetchData={fetchSubCategory} close={() => setOpenEdit(false)} />
        )
      }

      {
        openDeleteConfirmbox && (
          <ConfirmBox
            cancel={() => setOpenDeleteConfirmBox(false)}
            close={() => setOpenDeleteConfirmBox(false)}
            confirm={handleDeleteSubCategory}
          />
        )
      }


    </section>
  )
}

export default SubCategoryPage
