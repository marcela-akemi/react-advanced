import axios from "axios";

// Set base URL for Axios instance
const instance = axios.create({
  baseURL: "http://localhost:5000", // Adjust the base URL to match your backend server
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
