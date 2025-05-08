import axios from "axios";
import { baseUrl } from "../common/SummaryApi";

const Axios =axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
})

export default Axios;