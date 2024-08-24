import axios, { AxiosResponse } from "axios";
import { environment } from "@/env/environment";
import { Product } from "@/model/Product";
import { OrderItem } from "@/model/OrderItem";

export class ProductService {
  private baseUrl: string = environment.apiBaseUrl + "/Product";

  // Fetch products with query parameters
  get(
    name: string = "",
    idType: number = 0,
    idCategory: number = 0,
    index: number = 1,
    size: number = 9
  ): Promise<{ Products: Product[]; Total: number }> {
    const url = `${this.baseUrl}/`;
    return axios
      .get(url, {
        params: { name, idType, idCategory, index, size },
      })
      .then((response: AxiosResponse<{ Products: Product[]; Total: number }>) => response.data)
      .catch((error) => {
        console.error("Error fetching filtered product list:", error);
        throw error;
      });
  }

  getProductItem(id: number): Promise<Product> {
    const url = `${this.baseUrl}/get/${id}`;

    return axios
      .get<Product>(url)
      .then((response: AxiosResponse<Product>) => response.data)
      .catch((error) => {
        console.error("Error fetching product item:", error);
        throw error;
      });
  }

  async getReview(id: number, page: number, size: number): Promise<{ review: OrderItem[], total: number }> {
    const url = `${this.baseUrl}/getReview/`;

    try {
      const response = await axios.get<{ review: OrderItem[], total: number }>(url, {
        params: {
          id: id,
          page: page,
          size: size
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  };
  async getProductNew(index:number,size:number): Promise<{Products: Product[]; Total: number}> {
      const url=`${this.baseUrl}/getProductNew`
      return axios
      .get(url, {
        params: { name, index, size },
      })
      .then((response: AxiosResponse<{ Products: Product[]; Total: number }>) => response.data)
      .catch((error) => {
        console.error("Error fetching filtered product list:", error);
        throw error;
      });
  }
  async getProductBestSelling(index:number,size:number): Promise<{Products: Product[]; Total: number}> {
    const url=`${this.baseUrl}/getProductBestSelling`
    return axios
    .get(url, {
      params: { name, index, size },
    })
    .then((response: AxiosResponse<{ Products: Product[]; Total: number }>) => response.data)
    .catch((error) => {
      console.error("Error fetching filtered product list:", error);
      throw error;
    });
}
}
