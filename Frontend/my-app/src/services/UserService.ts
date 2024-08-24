import axios, { AxiosResponse } from "axios";
import { environment } from "@/env/environment";
import { User } from "@/model/User";

export class UserService {
  private baseUrl: string = environment.apiBaseUrl + "/User";

  getUser(token: string): Promise<User> {
    const url = `${this.baseUrl}/getUser`;

    return axios
      .get<User>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: AxiosResponse<User>) => response.data)
      .catch((error) => {
        console.error("Error fetching User:", error);
        throw error;
      });
  }
}
