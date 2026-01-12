import { orders } from './database.js';
import { Order } from '../types.js';
import { NetworkDelayEmulator } from './NetworkDelayEmulator.js';

interface PaginatedResult<T> {
  results: T[];
  hasNext: boolean;
  hasPrevious: boolean;
}

const getSortedOrders = (): Order[] => {
  return [...orders].sort((a, b) => b.createdDate.localeCompare(a.createdDate));
};

const orderExternalServiceImpl = {
  getAllOrders(): Order[] {
    return getSortedOrders();
  },

  getOrderById(id: number): Order | undefined {
    return orders.find(o => o.id === id);
  },

  getPaginatedOrders(pageNumber: number = 1, pageSize: number = 10): PaginatedResult<Order> {
    // Cap pageSize at 50
    const cappedPageSize = Math.min(pageSize, 50);
    
    // Get sorted orders
    const sortedOrders = getSortedOrders();
    
    // Calculate pagination
    const totalOrders = sortedOrders.length;
    const startIndex = (pageNumber - 1) * cappedPageSize;
    const endIndex = startIndex + cappedPageSize;
    
    // Get paginated results
    const results = sortedOrders.slice(startIndex, endIndex);
    
    // Calculate hasNext and hasPrevious
    const hasNext = endIndex < totalOrders;
    const hasPrevious = pageNumber > 1;
    
    return {
      results,
      hasNext,
      hasPrevious,
    };
  },

  createOrder(order: Order): Order {
    orders.push(order);
    return order;
  },
};

export const orderExternalService = NetworkDelayEmulator(orderExternalServiceImpl);
