import axios, { AxiosResponse } from "axios";
import { environment } from "@/env/environment";
import { Cart } from "@/model/Cart";

export class OrderService {
  private baseUrl: string = environment.apiBaseUrl + "/Order";

  CheckOut(
    token: string,
    Id: number[], 
    Name: string, 
    Address: string, 
    Phone: string,
    Note: string
  ): Promise<{ }> {
    const url = `${this.baseUrl}/CheckOut`;
  
    // Create FormData and append values
    const formData = new FormData();
    
    // Append each ID individually
    Id.forEach((id, index) => formData.append(`Id[${index}]`, id.toString()));
    
    formData.append('Name', Name);
    formData.append('Address', Address);
    formData.append('Phone', Phone);
    formData.append('Note', Note);
  
    return axios
      .post(
        url,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then()
      .catch((error) => {
        console.error("Error during checkout:", error);
        throw error;
      });
  }
  
  
}
