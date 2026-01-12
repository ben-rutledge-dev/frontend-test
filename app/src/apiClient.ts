import axios from "axios";

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
}

const baseUrl = 'http://localhost:3001';

export const apiClient = {
  async getCustomers() {
    const response = await axios.get(`${baseUrl}/customers`);
    return response.data as Customer[];
  }
};