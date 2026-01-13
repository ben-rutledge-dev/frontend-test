import { orders } from './database.js';
import { Order } from '../types.js';
import { NetworkDelayEmulator } from './NetworkDelayEmulator.js';

interface PaginatedResult<T> {
  results: T[];
  hasNext: boolean;
  hasPrevious: boolean;
}

interface Filter {
  garageId?: number;
  customerId?: number;
  vehicleId?: number;
}

type OrderCreationRequest = Omit<Order, 'id' | 'createdDate' | 'reference'>;

const getSortedOrders = (filter?: Filter): Order[] => {
  let filteredOrders = [...orders];

  if (filter) {
    filteredOrders = filteredOrders.filter(order => {
      if(filter.garageId && order.garageId !== filter.garageId) {
        return false;
      }
      if(filter.customerId && order.customerId !== filter.customerId) {
        return false;
      }
      if(filter.vehicleId && order.vehicleId !== filter.vehicleId) {
        return false;
      }
      return true;
    });
  }

  return filteredOrders.sort((a, b) => b.reference.localeCompare(a.reference));
};

const orderExternalServiceImpl = {
  getAllOrders(filter?: Filter): Order[] {
    return getSortedOrders(filter);
  },

  getOrderById(id: number): Order | undefined {
    return orders.find(o => o.id === id);
  },

  getPaginatedOrders(pageNumber: number = 1, pageSize: number = 10, filter?: Filter): PaginatedResult<Order> {
    // Cap pageSize at 50
    const cappedPageSize = Math.min(pageSize, 50);
    
    // Get sorted orders
    const sortedOrders = getSortedOrders(filter);
    
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

  createOrder(request: OrderCreationRequest): Order {
    const newId = Math.max(...orders.map(o => o.id)) + 1;
    const createdDate = new Date().toISOString().split('T')[0];
    const reference = `${createdDate.replace(/-/g, '')}-${newId}`;
    const order: Order = {
      ...request,
      id: newId,
      createdDate,
      reference,
    };
    orders.push(order);
    return order;
  },
};

export const orderExternalService = NetworkDelayEmulator(orderExternalServiceImpl);
