import React, { useState } from 'react'
import { FaCloudUploadAlt, FaLessThanEqual } from 'react-icons/fa'
import uploadImage from '../utils/UploadImage'
import Loading from '../components/Loading.jsx'
import ViewImage from '../components/ViewImage'
import { MdDelete } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { IoClose } from 'react-icons/io5'
import AddField from '../components/AddField.jsx'
import AxiosToastError from '../utils/AxiosToastError.js'
import SummaryApi from '../common/SummaryApi.js'
import SuccessAlert from '../utils/SuccessAlert.js'
import Axios from '../utils/Axios.js'


const UploadProduct = () => {

  const [data, setData] = useState({
    name: '',
    image: [],
    category: [],
    subCategory: [],
    unit: '',
    stock: '',
    price: '',
    discount: '',
    description: '',
    more_details: {}
  })


  const [imageLoading, setImageLoading] = useState(false)
  const [viewImageURL, setViewImageURL] = useState('')
  const allCategory = useSelector(state => state.product.allCategory)
  const allSubCategory = useSelector(state => state.product.allSubCategory)
  const [selectCategory, setSelectCategory] = useState('')
  const [selectSubCategory, setSelectSubCategory] = useState('')
  const [openAddField, setOpenAddField] = useState(false)
  const [fieldName, setFieldName] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })

  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }
    setImageLoading(true)
    const response = await uploadImage(file);

    const { data: imageResponse } = response;
    const imageUrl = imageResponse.data.url
    setData((prev) => ({
      ...prev,
      image: [...prev.image, imageUrl]

    }))
    setImageLoading(false)
  }

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1)
    setData((prev) => {
      return {
        ...prev
      }
    })
  }

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1)
    setData((prev) => {
      return {
        ...prev
      }
    })
  }

  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1)
    setData((prev) => {
      return {
        ...prev
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('ProductData', data)
    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: data
      })
      const { data: responseData } = response
      if (responseData.success) {
        setData({
          name: '',
          image: [],
          category: [],
          subCategory: [],
          unit: '',
          stock: '',
          price: '',
          discount: '',
          description: '',
          more_details: {}
        })
        SuccessAlert(responseData.message)
      }

    } catch (error) {
      return (
        AxiosToastError(error)
      )
    }
  }

  const handleAddField = () => {
    setData((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldName]: ''
        }
      }
    })
    setFieldName('')
    setOpenAddField(false)
  }

  return (
    <section>
      <div className='p-2  bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Upload Product</h2>
      </div>

      <div className='grid p-3'>
        <form action="" className=' grid gap-4' onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor="name" className='font-medium'>Name</label>
            <input className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
              type="text"
              id='name'
              placeholder='Enter product name'
              name='name'
              value={data.name}
              onChange={handleChange} required />
          </div>
          <div className='grid gap-1'>
            <label htmlFor="description" className='font-medium'>Description</label>
            <textarea className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none'
              type="text"
              placeholder='Enter product description'
              name='description'
              id='description'
              value={data.description}
              multiple
              rows={3}
              onChange={handleChange} required
            />
          </div>
          <div>
            <p className='font-medium'>Image</p>
            <div>
              <label htmlFor='productImage' className='bg-blue-100 h-24 border rounded flex justify-center items-center cursor-pointer hover:text-primary-200' >
                <div className='text-center flex  items-center justify-center flex-col '>
                  {
                    imageLoading ? <Loading /> : (
                      <>
                        <FaCloudUploadAlt size={35} />
                        <p className=''>Upload Image</p>
                      </>
                    )
                  }

                </div>
                <input type="file"
                  id='productImage'
                  hidden
                  onChange={handleUploadImage}
                  accept='image/*' />
              </label>
              {/* display Uploaded Images */}
              <div className='flex flex-wrap gap-4'>
                {
                  data.image.map((img, index) => {
                    return (
                      <div key={img + index} className='h-20 mt-2 w-20 min-w-20 bg-blue-50 border relative group'>
                        <img src={img}
                          alt={img}
                          className='w-full h-full object-scale-down cursor-pointer'
                          onClick={() => setViewImageURL(img)}
                        />
                        <div onClick={() => handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-500 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer'>
                          <MdDelete />
                        </div>

                      </div>
                    )
                  })
                }

              </div>
            </div>
          </div>
          <div className='grid gap-1'>
            <label className='font-medium'>
              Category
            </label>
            <div>
              <select className='bg-blue-50 border w-full p-2 rounded'
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value
                  const category = allCategory.find(el => el._id === value)
                  console.log(category)
                  setData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, category]
                    }
                  })
                  setSelectCategory('')
                }}>
                <option value={""}>Select Category</option>
                {
                  allCategory.map((c, index) => {
                    return (
                      <option value={c?._id}>{c.name}</option>
                    )
                  })
                }

              </select>

              <div className='flex flex-wrap gap-2'>
                {
                  data.category.map((c, index) => {
                    return (
                      <div key={c._id + index + 'productSection'} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                        <p>{c.name}</p>
                        <div className=' hover:bg-red-600 hover:rounded hover:text-white cursor-pointer'
                          onClick={() => handleRemoveCategory(index)}
                        >
                          <IoClose size={20} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>

            </div>
          </div>
          <div className='grid gap-1'>
            <label className='font-medium'>
              Subcategory
            </label>
            <div>
              <select className='bg-blue-50 border w-full p-2 rounded'
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value
                  const subCategory = allSubCategory.find(el => el._id === value)
                  console.log(subCategory)
                  setData((prev) => {
                    return {
                      ...prev,
                      subCategory: [...prev.subCategory, subCategory]
                    }
                  })
                  setSelectSubCategory('')
                }}>
                <option value={""}>Select SubCategory</option>
                {
                  allSubCategory.map((c, index) => {
                    return (
                      <option value={c?._id}>{c.name}</option>
                    )
                  })
                }

              </select>

              <div className='flex flex-wrap gap-2'>
                {
                  data.subCategory.map((c, index) => {
                    return (
                      <div key={c._id + index + 'productSection'} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                        <p>{c.name}</p>
                        <div className=' hover:bg-red-600 hover:rounded hover:text-white cursor-pointer'
                          onClick={() => handleRemoveSubCategory(index)}
                        >
                          <IoClose size={20} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>

            </div>
          </div>
          <div className='grid gap-1'>
            <label htmlFor="unit" className='font-medium'>Number of Unit</label>
            <input className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
              type="text"
              placeholder='Enter product unit'
              name='unit' id='unit' value={data.unit}
              onChange={handleChange}
              required />
          </div>
          <div className='grid gap-1'>
            <label htmlFor="stock" className='font-medium'>Number of Stock</label>
            <input className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
              type="number"
              placeholder='Enter product stock'
              name='stock' id='stock' value={data.stock}
              onChange={handleChange}
              required />
          </div>
          <div className='grid gap-1'>
            <label htmlFor="price" className='font-medium'>Price</label>
            <input className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
              type="number"
              placeholder='Enter product price'
              name='price' id='price' value={data.price}
              onChange={handleChange}
              required />
          </div>
          <div className='grid gap-1'>
            <label htmlFor="discount" className='font-medium'>Discount</label>
            <input className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
              type="number"
              placeholder='Enter product discount'
              name='discount' id='discount' value={data.discount}
              onChange={handleChange}
              required />
          </div>

          {/* Add More fields */}

          {
            Object.keys(data?.more_details)?.map((k, index) => {
              return (
                <div className='grid gap-1'>
                  <label htmlFor={k} className='font-medium'>{k}</label>
                  <input className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                    type="text"
                    name='discount' id={k} value={data?.more_details[k]}
                    onChange={(e) => {
                      const value = e.target.value
                      setData((prev) => {
                        return {
                          ...prev,
                          more_details: {
                            ...prev.more_details,
                            [k]: value
                          }
                        }
                      })
                    }}
                    required />
                </div>
              )
            })
          }

          <div className='bg-blue-100 hover:bg-primary-200 hover:text-white cursor-pointer py-1 px-3 w-32 text-center font-semibold border border-primary-200 rounded flex justify-center items-center'
            onClick={() => setOpenAddField(true)}
          >
            Add Fields
          </div>

          <button className='bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold'>Submit</button>

        </form>
      </div>

      {
        viewImageURL && (
          <ViewImage url={viewImageURL} close={() => setViewImageURL('')} />
        )
      }

      {
        openAddField && (
          <AddField
            close={() => setOpenAddField(false)}
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            submit={handleAddField}
          />
        )
      }

    </section>
  )
}

export default UploadProduct
