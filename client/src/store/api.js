import axios from "axios";
 
const api = axios.create({
    // baseURL: "http://localhost:8000/api",
    baseURL: "https://ecoommerce.codemax.live/api",
});

export default api;