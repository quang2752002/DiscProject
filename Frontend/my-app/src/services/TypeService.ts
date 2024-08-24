import axios, { AxiosResponse } from "axios";
import { environment } from "@/env/environment";
import { Type } from "@/model/Type";

export class TypeService {
  private baseUrl: string = environment.apiBaseUrl + "/Type";

  getList(): Promise<Type[]> {
    const url = `${this.baseUrl}/getList`;

    return axios
      .get<Type[]>(url)
      .then((response: AxiosResponse<Type[]>) => response.data)
      .catch((error) => {
        console.error("Error fetching types:", error);
        throw error;
      });
  }
}
