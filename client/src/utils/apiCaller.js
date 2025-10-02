// utils/apiCall.js
import axios from "axios";

export async function apiCall({ url, method = "GET", data = null, withCredentials = false }) {
  try {
    const response = await axios({
      baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
      url,
      method,
      data,
      withCredentials,
      headers: {
        "Content-Type": data instanceof FormData ? "multipart/form-data" : "application/json",
      },
    });

    return {
      success: true,
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status || 500,
      message: error.response?.data?.message || error.message,
      error: error.response?.data || error,
    };
  }
}
