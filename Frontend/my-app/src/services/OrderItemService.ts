// src/services/ProductService.ts
import axios, { AxiosResponse } from "axios";
import { environment } from "@/env/environment";
import { OrderItem } from "@/model/OrderItem";

export class OrderItemService {
    private baseUrl: string = environment.apiBaseUrl + "/OrderItem";

    getOrderHistory(
        token: string
    ): Promise<{ orderItems: OrderItem[] }> {
        const url = `${this.baseUrl}/GetOrderHistory`;
        return axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response: AxiosResponse<{ orderItems: OrderItem[] }>) => response.data)
            .catch((error) => {
                console.error("Error fetching order history:", error);
                throw error;
            });
    };
    feedBack(
        token:string,
        id:number,
        voteStar:number,
        feedBack:string,
    ):Promise<{}> {
        const url = `${this.baseUrl}/Feedback`;
        return axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response: AxiosResponse<{ orderItems: OrderItem[] }>) => response.data)
            .catch((error) => {
                console.error("Error fetching order history:", error);
                throw error;
            });
    }
    
}