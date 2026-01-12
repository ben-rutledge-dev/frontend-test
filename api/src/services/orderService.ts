import { Order } from '../types.js';
import { orderExternalService } from '../external_services_mock/orderExternalService.js';

interface PaginatedResult<T> {
  results: T[];
  hasNext: boolean;
  hasPrevious: boolean;
}

export const orderService = {
  getAllOrders(): Order[] {
    return orderExternalService.getAllOrders();
  },

  getOrderById(id: number): Order | undefined {
    return orderExternalService.getOrderById(id);
  },

  getOrdersByCustomerId(customerId: number): Order[] {
    return orderExternalService.getAllOrders().filter(o => o.customerId === customerId);
  },

  getPaginatedOrders(pageNumber: number = 1, pageSize: number = 10): PaginatedResult<Order> {
    return orderExternalService.getPaginatedOrders(pageNumber, pageSize);
  },

  createOrder(customerId: number, vehicleId: number): Order {
    const allOrders = orderExternalService.getAllOrders();
    
    // Generate new order ID
    const newId = Math.max(...allOrders.map(o => o.id)) + 1;

    // Generate reference in format YYYYMMDD-{id}
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const dateStr = today.replace(/-/g, '');
    const reference = `${dateStr}-${newId}`;

    // Create new order
    const newOrder: Order = {
      id: newId,
      customerId,
      vehicleId,
      createdDate: today,
      reference,
    };

    // Add to orders array via external service
    return orderExternalService.createOrder(newOrder);
  },
};
