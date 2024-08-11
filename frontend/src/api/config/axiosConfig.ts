import axios, { AxiosInstance } from 'axios'

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PROD_BACKEND_URL
    ? import.meta.env.VITE_PROD_BACKEND_URL
    : 'http://localhost:3000/api/v1',
})

export const privateApi: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_PROD_BACKEND_URL
    ? import.meta.env.VITE_PROD_BACKEND_URL
    : 'http://localhost:3000/api/v1',
})
