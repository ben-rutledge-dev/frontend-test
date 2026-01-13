import axios from "axios";

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
}

export interface CustomerWithVehicleCount extends Customer {
  vehicleCount: number;
}

export interface Vehicle {
  id: number;
  customerId: number;
  licensePlate: string;
  make: string;
  model: string;
}

export interface Garage {
  id: number;
  name: string;
}

export interface Order {
  id: number;
  customerId: number;
  vehicleId: number;
  garageId: number;
  createdDate: string;
  reference: string;
}

const baseUrl = 'http://localhost:3001';

export const apiClient = {
  async getCustomers() {
    const response = await axios.get(`${baseUrl}/customers`);
    return response.data as CustomerWithVehicleCount[];
  },

  async getCustomerById(id: number) {
    const response = await axios.get(`${baseUrl}/customers/${id}`);
    return response.data as Customer;
  },

  async getVehiclesByCustomerId(customerId: number) {
    const response = await axios.get(`${baseUrl}/customers/${customerId}/vehicles`);
    return response.data as Vehicle[];
  },

  async getOrders() {
    const response = await axios.get(`${baseUrl}/orders`);
    return response.data as Order[];
  },

  async getGarages() {
    const response = await axios.get(`${baseUrl}/garages`);
    return response.data as Garage[];
  },
};