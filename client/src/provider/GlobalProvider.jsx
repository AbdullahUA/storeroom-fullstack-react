import { createContext, useContext } from "react";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import { useDispatch } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct.js";
import { useEffect } from "react";
import AxiosToastError from '../utils/AxiosToastError.js'
import toast from "react-hot-toast";

export const GlobalContext = createContext(null);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();


  const fetchCartItem = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCartItem,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data));
        console.log(responseData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: {
          _id: id,
          qty: qty
        }
      })

      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
        fetchCartItem()
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  const deleteCartItem = async (cardId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: {
          _id: cardId
        }
      })

      const {data:responseData}=response
      if(responseData.success){
        toast.success(responseData.message)
        fetchCartItem()
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }


  useEffect(() => {
    fetchCartItem()
  }, [])

  return <GlobalContext.Provider value={{ fetchCartItem, updateCartItem,deleteCartItem }}>
    {children}
  </GlobalContext.Provider>;
};

export default GlobalProvider