import axios from "axios";
const BASE_URL = "https://54.83.109.185:4000/api";
// const BASE_URL = "http://localhost:3000/";

export default axios.create({
  baseURL: BASE_URL,
});

// export const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });
