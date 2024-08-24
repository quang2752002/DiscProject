import axios, { AxiosInstance } from 'axios'
import Cookies from 'js-cookie'

export class ApiService {
  private axiosInstance: AxiosInstance
  constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL })
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = Cookies.get('token') ?? null
        //console.log(token)
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  async get(endpoint: string, params: any = {}) {
    try {
      const response = await this.axiosInstance.get(endpoint, { params })
      return response.data
    } catch (error: any) {
      throw new Error(`GET request failed: ${error.message}`)
    }
  }

  async post(endpoint: string, data: any) {
    try {
      const response = await this.axiosInstance.post(endpoint, data)
      return response.data
    } catch (error: any) {
      throw new Error(`POST request failed: ${error.message}`)
    }
  }

  async put(endpoint: string, data: any) {
    try {
      const response = await this.axiosInstance.put(endpoint, data)
      return response.data
    } catch (error: any) {
      throw new Error(`PUT request failed: ${error.message}`)
    }
  }

  async patch(endpoint: string, data: any) {
    try {
      const response = await this.axiosInstance.patch(endpoint, data)
      return response.data
    } catch (error: any) {
      throw new Error(`PATCH request failed: ${error.message}`)
    }
  }

  async delete(endpoint: string) {
    try {
      const response = await this.axiosInstance.delete(endpoint)
      return response.data
    } catch (error: any) {
      throw new Error(`DELETE request failed: ${error.message}`)
    }
  }
}
