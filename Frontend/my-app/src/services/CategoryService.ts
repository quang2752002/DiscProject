import axios, { AxiosResponse } from "axios";
import { environment } from "@/env/environment";
import { Category } from "@/model/Category";

export class CategoryService {
  private baseUrl: string = environment.apiBaseUrl + "/Category";

  getCategoryByType(id: number): Promise<Category[]> {
    const url = `${this.baseUrl}/getCategoryByTypeId/${id}`;
    return axios
      .get<Category[]>(url)
      .then((response: AxiosResponse<Category[]>) => response.data)
      .catch((error) => {
        console.error("Error fetching categories:", error);
        throw error;
      });
  }
}
