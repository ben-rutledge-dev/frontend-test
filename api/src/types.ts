export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Vehicle {
  id: string;
  customerId: string;
  licensePlate: string;
  make: string;
  model: string;
}

export interface Order {
  id: string;
  customerId: string;
  vehicleId: string;
  garageId: string;
  createdDate: string;
  reference: string;
}

export interface Garage {
  id: string;
  name: string;
}

export interface PaginatedResult<T> {
  results: T[];
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface OrderFilter {
  garageId?: string;
  customerId?: string;
  vehicleId?: string;
}

export type CreateOrderRequest = Omit<Order, 'id' | 'createdDate' | 'reference'>;
export type UpdateOrderRequest = Omit<Order, 'createdDate' | 'reference'>;

