export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Vehicle {
  id: number;
  customerId: number;
  licensePlate: string;
  make: string;
  model: string;
}

export interface Order {
  id: number;
  customerId: number;
  vehicleId: number;
  createdDate: string;
  reference: string;
}

export interface Garage {
  id: number;
  name: string;
}
