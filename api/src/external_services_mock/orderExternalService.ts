import { v4 as uuidv4 } from 'uuid';
import { orders } from './database.js';
import { CreateOrderRequest, Order, OrderFilter, PaginatedResult, UpdateOrderRequest } from '../types.js';
import { NetworkDelayEmulator } from './NetworkDelayEmulator.js';

const getSortedOrders = (filter?: OrderFilter): Order[] => {
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

  return filteredOrders.sort((a, b) => b.createdDate.localeCompare(a.createdDate));
};

const orderExternalServiceImpl = {
  getAllOrders(filter?: OrderFilter): Order[] {
    return getSortedOrders(filter);
  },

  getOrderById(id: string): Order | undefined {
    return orders.find(o => o.id === id);
  },

  getPaginatedOrders(pageNumber: number = 1, filter?: OrderFilter): PaginatedResult<Order> {
    const pageSize = 10;
    
    // Get sorted orders
    const sortedOrders = getSortedOrders(filter);
    
    // Calculate pagination
    const totalOrders = sortedOrders.length;
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
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

  createOrder(request: CreateOrderRequest): Order {
    const newId = uuidv4();
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

  updateOrder(request: UpdateOrderRequest): Order {
    const index = orders.findIndex(o => o.id === request.id);
    if (index === -1) {
      throw new Error(`Order with id ${request.id} not found`);
    }
    const updatedOrder: Order = {
      ...orders[index],
      ...request,
    };
    orders[index] = updatedOrder;
    return updatedOrder;
  }
};

export const orderExternalService = NetworkDelayEmulator(orderExternalServiceImpl);
