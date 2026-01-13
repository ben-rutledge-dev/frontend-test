import { Order } from '../types.js';
import { orderExternalService } from '../external_services_mock/orderExternalService.js';

export const orderService = {
  async getAllOrders(): Promise<Order[]> {
    return orderExternalService.getAllOrders();
  },

  async getOrderById(id: number): Promise<Order | undefined> {
    return orderExternalService.getOrderById(id);
  },

  async getOrdersByCustomerId(customerId: number): Promise<Order[]> {
    const allOrders = await orderExternalService.getAllOrders();
    return allOrders.filter(o => o.customerId === customerId);
  },
};
