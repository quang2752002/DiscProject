import axios, { AxiosResponse } from "axios";
import { environment } from "@/env/environment";
import { Cart } from "@/model/Cart";

export class CartService {
  private baseUrl: string = environment.apiBaseUrl + "/Cart";

  getCart(token: string): Promise<{ cart: Cart[] }> {
    const url = `${this.baseUrl}/GetCart`;
    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: AxiosResponse<{ cart: Cart[] }>) => response.data)
      .catch((error) => {
        console.error("Error fetching order history:", error);
        throw error;
      });
  }
  updateQuantity(
    token: string,
    id: number,
    quantity: number
  ): Promise<{ cart: Cart[] }> {
    const url = `${this.baseUrl}/UpdateQuantity`;
    return axios
      .patch(
        url,
        {
          id: id,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: AxiosResponse<{ cart: Cart[] }>) => response.data)
      .catch((error) => {
        console.error("Error updating cart quantity:", error);
        throw error;
      });
  }
  removeItem(token: string, id: number): Promise<{ Message: string }> {
    const url = `${this.baseUrl}/Delete/${id}`;
    return axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: AxiosResponse<{ Message: string }>) => response.data)
      .catch((error) => {
        console.error("Error removing cart item:", error);
        throw error;
      });
  }

  getCheckOut(
    token: string,
    selectedItems: number[],
  ): Promise<{ cart: Cart[] }> {
    const url = `${this.baseUrl}/getCheckOut`;
  
    // Chuyển đổi mảng selectedItems thành định dạng form data
    const formData = new URLSearchParams();
    selectedItems.forEach((item, index) => {
      formData.append(`Id[${index}]`, item.toString());
    });
  
    return axios
      .post(
        url,
        formData.toString(),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response: AxiosResponse<{ cart: Cart[] }>) => response.data)
      .catch((error) => {
        console.error("Error during checkout:", error);
        throw error;
      });
  }
  AddCart(token: string, productId: number, quantity: number): Promise<{  }> {
    const url = `${this.baseUrl}/AddCart`;
    const formData = new FormData();
    formData.append("productId", productId.toString());
    formData.append("quantity", quantity.toString());
  
    return axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Important for sending FormData
        },
      })
      .then((response: AxiosResponse<{ cart: Cart[] }>) => response.data)
      .catch((error) => {
        console.error("Error during checkout:", error);
        throw error;
      });
  }
  
}
