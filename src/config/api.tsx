import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
