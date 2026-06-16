import axios from "axios";

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
}

export interface CustomerWithVehicleCount extends Customer {
  vehicleCount: number;
}

export interface Vehicle {
  id: string;
  customerId: string;
  licensePlate: string;
  make: string;
  model: string;
}

export interface Garage {
  id: string;
  name: string;
}

export interface Order {
  id: string;
  customerId: string;
  vehicleId: string;
  garageId: string;
  createdDate: string;
  reference: string;
}

export interface PaginatedResult<T> {
  results: T[];
  hasNext: boolean;
  hasPrevious: boolean;
}

const baseUrl = 'http://localhost:3001';

export const apiClient = {
  async getCustomers() {
    const response = await axios.get(`${baseUrl}/customers`);
    return response.data as CustomerWithVehicleCount[];
  },

  async getCustomerById(id: string) {
    const response = await axios.get(`${baseUrl}/customers/${id}`);
    return response.data as Customer;
  },

  async getVehiclesByCustomerId(customerId: string) {
    const response = await axios.get(`${baseUrl}/customers/${customerId}/vehicles`);
    return response.data as Vehicle[];
  },

  async getOrders() {
    const response = await axios.get(`${baseUrl}/orders`);
    return response.data as Order[];
  },

  async postOrder(order: Omit<Order, 'id' | 'createdDate' | 'reference'>) {
    const response = await axios.post(`${baseUrl}/orders`, order);
    return response.data as Order;
  },

  async getGarages() {
    const response = await axios.get(`${baseUrl}/garages`);
    return response.data as Garage[];
  },
};