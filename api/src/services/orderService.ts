import { orders as orderData } from '../database.js';
import { Order } from '../types.js';
import { NetworkDelayEmulator } from '../NetworkDelayEmulator.js';

function getOrders() {
  return [...orderData].sort((a, b) => b.createdDate.localeCompare(a.createdDate));
}

interface PaginatedResult<T> {
  results: T[];
  hasNext: boolean;
  hasPrevious: boolean;
}

const orderServiceImpl = {
  getAllOrders(): Order[] {
    return getOrders();
  },

  getOrderById(id: number): Order | undefined {
    return orderData.find(o => o.id === id);
  },

  getOrdersByCustomerId(customerId: number): Order[] {
    return getOrders().filter(o => o.customerId === customerId);
  },

  getPaginatedOrders(pageNumber: number = 1, pageSize: number = 10): PaginatedResult<Order> {
    // Cap pageSize at 50
    const cappedPageSize = Math.min(pageSize, 50);
    
    // Get sorted orders
    const orders = getOrders();
    
    // Calculate pagination
    const totalOrders = orders.length;
    const startIndex = (pageNumber - 1) * cappedPageSize;
    const endIndex = startIndex + cappedPageSize;
    
    // Get paginated results
    const results = orders.slice(startIndex, endIndex);
    
    // Calculate hasNext and hasPrevious
    const hasNext = endIndex < totalOrders;
    const hasPrevious = pageNumber > 1;
    
    return {
      results,
      hasNext,
      hasPrevious,
    };
  },

  createOrder(customerId: number, vehicleId: number): Order {
    // Generate new order ID
    const newId = Math.max(...orderData.map(o => o.id)) + 1;

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

    // Add to orders array
    orderData.push(newOrder);

    return newOrder;
  },
};

export const orderService = NetworkDelayEmulator(orderServiceImpl);
