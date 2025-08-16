import Axios from "./Axios"
import SummaryApi from "../common/SummaryApi"

const fetchUserDetails = async (userId) => {
    try {
        const response = await Axios({...SummaryApi.userDetails});
        return response.data
    } catch (error) {
        console.error("Error fetching user details:", error);
        
    }
}
export default fetchUserDetails;