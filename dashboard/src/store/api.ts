import axios from "axios";
 
const api = axios.create({
    // baseURL: "http://localhost:8000/api",
    baseURL: "http://ecoommerce.codemax.live/api",
});

export default api;