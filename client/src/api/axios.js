import axios from "axios";
const BASE_URL = "http://54.87.196.46:8010/api";
// const BASE_URL = "http://localhost:3000/";

export default axios.create({
  baseURL: BASE_URL,
});

// export const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });
