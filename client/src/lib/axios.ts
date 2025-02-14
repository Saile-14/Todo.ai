import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Authorization");
    console.log(token);
    if (token && config.headers) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => { 
    console.log("here the error occurs")
    return Promise.reject(error);
  }
);

/* api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('Interceptor error callback triggered:', error.response?.status);
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
); */